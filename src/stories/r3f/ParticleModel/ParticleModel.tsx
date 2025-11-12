import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleModelProps {
  modelType?: 'torus' | 'sphere' | 'box';
  particleCount?: number;
  particleSize?: number;
  explosionStrength?: number;
  restoreSpeed?: number;
  color?: string;
}

interface Particle {
  originalPosition: THREE.Vector3;
  currentPosition: THREE.Vector3;
  velocity: THREE.Vector3;
}

const ParticleSystem: React.FC<ParticleModelProps> = ({
  modelType = 'torus',
  particleCount = 2000,
  particleSize = 0.02,
  explosionStrength = 2,
  restoreSpeed = 0.05,
  color = '#ffffff',
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const { camera, gl } = useThree();
  const [isExploding, setIsExploding] = useState(false);

  // 파티클 위치 생성
  const { geometry, particles } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particlesArray: Particle[] = [];

    // 모델 타입에 따라 파티클 위치 생성
    for (let i = 0; i < particleCount; i++) {
      let x = 0;
      let y = 0;
      let z = 0;

      if (modelType === 'torus') {
        // Torus (도넛 모양) 생성
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = v * Math.PI * 2;
        const majorRadius = 1.5;
        const minorRadius = 0.5;
        x = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
        y = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);
        z = minorRadius * Math.sin(phi);
      } else if (modelType === 'sphere') {
        // Sphere 생성
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);
        const radius = 1.5;
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
      } else if (modelType === 'box') {
        // Box 생성
        x = (Math.random() - 0.5) * 3;
        y = (Math.random() - 0.5) * 3;
        z = (Math.random() - 0.5) * 3;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particlesArray.push({
        originalPosition: new THREE.Vector3(x, y, z),
        currentPosition: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(0, 0, 0),
      });
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return { geometry: geom, particles: particlesArray };
  }, [particleCount, modelType]);

  // 마우스 위치 추적
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseEnter = () => {
      setIsExploding(true);
    };

    const handleMouseLeave = () => {
      setIsExploding(false);
      // 마우스가 나가면 마우스 위치를 중앙으로 리셋
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('mouseenter', handleMouseEnter);
    gl.domElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('mouseenter', handleMouseEnter);
      gl.domElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gl]);

  // 애니메이션 프레임
  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry?.attributes?.position as THREE.BufferAttribute;
    if (!positions) return;
    const positionsArray = positions.array as Float32Array;
    let targetPoint: THREE.Vector3 | null = null;

    if (isExploding) {
      raycaster.current.setFromCamera(mouseRef.current, camera);
      const mouseWorldPosition = raycaster.current.ray.origin.clone();
      const direction = raycaster.current.ray.direction.clone();
      const distance = 5;
      targetPoint = mouseWorldPosition.add(direction.multiplyScalar(distance));
    }

    particles.forEach((particle, i) => {
      if (isExploding && targetPoint) {
        const distanceToMouse = particle.currentPosition.distanceTo(targetPoint);
        const explosionRadius = 3;

        if (distanceToMouse < explosionRadius) {
          // 폭발 효과: 마우스에 가까울수록 더 멀리 밀어냄
          const force = Math.max(0, (explosionRadius - distanceToMouse) / explosionRadius);
          const pushDirection = particle.currentPosition
            .clone()
            .sub(targetPoint)
            .normalize()
            .multiplyScalar(force * explosionStrength * 0.15);

          particle.velocity.add(pushDirection);
          particle.currentPosition.add(particle.velocity);
          particle.velocity.multiplyScalar(0.88); // 마찰
        } else {
          // 폭발 범위 밖이지만 여전히 복원 중
          const restoreDirection = particle.originalPosition
            .clone()
            .sub(particle.currentPosition)
            .multiplyScalar(restoreSpeed * 0.5);

          particle.currentPosition.add(restoreDirection);
          particle.velocity.multiplyScalar(0.95);
        }
      } else {
        // 복원 효과: 원래 위치로 돌아감
        const restoreDirection = particle.originalPosition
          .clone()
          .sub(particle.currentPosition)
          .multiplyScalar(restoreSpeed);

        particle.currentPosition.add(restoreDirection);
        particle.velocity.multiplyScalar(0.95);
      }

      // 위치 업데이트
      positionsArray[i * 3] = particle.currentPosition.x;
      positionsArray[i * 3 + 1] = particle.currentPosition.y;
      positionsArray[i * 3 + 2] = particle.currentPosition.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={particleSize} color={color} sizeAttenuation={true} />
    </points>
  );
};

export const ParticleModel: React.FC<ParticleModelProps> = (props) => {
  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg overflow-hidden">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <ParticleSystem {...props} />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
};

