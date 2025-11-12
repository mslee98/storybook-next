import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface WaveParticleModelProps {
  modelType?: 'torus' | 'sphere' | 'box';
  particleCount?: number;
  particleSize?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  color?: string;
}

interface Particle {
  originalPosition: THREE.Vector3;
  offset: number;
  phase: number;
}

const WaveParticleSystem: React.FC<WaveParticleModelProps> = ({
  modelType = 'torus',
  particleCount = 2000,
  particleSize = 0.02,
  waveSpeed = 1,
  waveAmplitude = 0.3,
  waveFrequency = 2,
  color = '#ffffff',
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

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

      // 각 파티클에 고유한 오프셋과 페이즈 부여
      particlesArray.push({
        originalPosition: new THREE.Vector3(x, y, z),
        offset: Math.random() * Math.PI * 2, // 랜덤 오프셋으로 자연스러운 파동
        phase: Math.random() * Math.PI * 2, // 추가 페이즈 변수
      });
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return { geometry: geom, particles: particlesArray };
  }, [particleCount, modelType]);

  // 물결 애니메이션 프레임
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    timeRef.current += delta * waveSpeed;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    particles.forEach((particle, i) => {
      const { originalPosition, offset, phase } = particle;
      
      // 여러 방향으로 파동 생성 (더 자연스러운 물결 효과)
      const waveX = Math.sin(timeRef.current * waveFrequency + offset) * waveAmplitude;
      const waveY = Math.cos(timeRef.current * waveFrequency * 0.7 + phase) * waveAmplitude;
      const waveZ = Math.sin(timeRef.current * waveFrequency * 1.3 + offset + phase) * waveAmplitude;

      // 원래 위치에서 파동만큼 오프셋
      positions[i * 3] = originalPosition.x + waveX;
      positions[i * 3 + 1] = originalPosition.y + waveY;
      positions[i * 3 + 2] = originalPosition.z + waveZ;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={particleSize} color={color} sizeAttenuation={true} />
    </points>
  );
};

export const WaveParticleModel: React.FC<WaveParticleModelProps> = (props) => {
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
        <WaveParticleSystem {...props} />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
};

