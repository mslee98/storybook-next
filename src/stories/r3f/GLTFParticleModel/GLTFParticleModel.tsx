import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

interface GLTFParticleModelProps {
  modelPath?: string;
  particleSize?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  color?: string;
  particleCount?: number;
  enableWave?: boolean;
  enableMouseInteraction?: boolean;
  useSurfaceSampler?: boolean;
  additiveBlending?: boolean;
  explosionRadius?: number;
  explosionStrength?: number;
}

interface Particle {
  originalPosition: THREE.Vector3;
  offset: number;
  phase: number;
}

// GLTF 모델을 파티클로 변환하는 시스템
const GLTFParticleSystem: React.FC<GLTFParticleModelProps> = ({
  modelPath = '/models/model.gltf',
  particleSize = 0.02,
  waveSpeed = 1,
  waveAmplitude = 0.3,
  waveFrequency = 2,
  color = '#ffffff',
  particleCount = 99000,
  enableWave = true,
  enableMouseInteraction = true,
  useSurfaceSampler = true,
  additiveBlending = true,
  explosionRadius = 1.5,
  explosionStrength = 0.5,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const mouseUniformRef = useRef({ value: new THREE.Vector3(0, 0, 0) });
  const gltf = useGLTF(modelPath);
  const { gl } = useThree();

  // GLTF 모델의 geometry에서 vertex 추출하여 파티클 생성
  const { geometry, particles, material } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const particlesArray: Particle[] = [];
    const positions: number[] = [];
    const tempPosition = new THREE.Vector3();

    if (useSurfaceSampler) {
      // MeshSurfaceSampler를 사용하여 표면에서 균등하게 샘플링
      let foundMesh: THREE.Mesh | null = null;

      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry && !foundMesh) {
          foundMesh = child;
        }
      });

      if (foundMesh) {
        const sampler = new MeshSurfaceSampler(foundMesh).build();
        for (let i = 0; i < particleCount; i++) {
          sampler.sample(tempPosition);
          positions.push(tempPosition.x, tempPosition.y, tempPosition.z);
          particlesArray.push({
            originalPosition: tempPosition.clone(),
            offset: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    } else {
      // 기존 방식: vertex 직접 추출
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry) {
          const meshGeometry = child.geometry;
          
          if (meshGeometry.attributes.position) {
            const positionAttribute = meshGeometry.attributes.position;
            const vertexCount = positionAttribute.count;
            const step = Math.max(1, Math.floor(vertexCount / particleCount));
            
            for (let i = 0; i < vertexCount && particlesArray.length < particleCount; i += step) {
              const x = positionAttribute.getX(i);
              const y = positionAttribute.getY(i);
              const z = positionAttribute.getZ(i);

              const worldPosition = new THREE.Vector3(x, y, z);
              worldPosition.applyMatrix4(child.matrixWorld);

              positions.push(worldPosition.x, worldPosition.y, worldPosition.z);
              particlesArray.push({
                originalPosition: worldPosition.clone(),
                offset: Math.random() * Math.PI * 2,
                phase: Math.random() * Math.PI * 2,
              });
            }
          }
        }
      });
    }

    // 모델의 바운딩 박스 계산하여 중앙 정렬
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;

    // 파티클 위치를 중앙 정렬하고 스케일 조정
    const scaledPositions = new Float32Array(positions.length);
    for (let i = 0; i < particlesArray.length; i++) {
      const particle = particlesArray[i];
      const scaledPos = particle.originalPosition
        .clone()
        .sub(center)
        .multiplyScalar(scale);
      
      particle.originalPosition = scaledPos;
      
      scaledPositions[i * 3] = scaledPos.x;
      scaledPositions[i * 3 + 1] = scaledPos.y;
      scaledPositions[i * 3 + 2] = scaledPos.z;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(scaledPositions, 3));

    // 커스텀 셰이더를 사용한 PointsMaterial 생성
    const particleColor = new THREE.Color(color as THREE.ColorRepresentation);
    const pointsMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: particleSize,
      blending: additiveBlending ? THREE.AdditiveBlending : THREE.NormalBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      sizeAttenuation: true,
    });

    // 셰이더 커스터마이징 (마우스 반응 효과)
    if (enableMouseInteraction) {
      pointsMaterial.onBeforeCompile = function (shader) {
        shader.uniforms.mousePos = mouseUniformRef.current;

        shader.vertexShader = `
          uniform vec3 mousePos;
          varying float vNormal;
          
          ${shader.vertexShader}`.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>   
            vec3 seg = position - mousePos;
            vec3 dir = normalize(seg);
            float dist = length(seg);
            if (dist < ${explosionRadius.toFixed(2)}){
              float force = clamp(1.0 / (dist * dist), 0.0, ${explosionStrength.toFixed(2)});
              transformed += dir * force;
              vNormal = force / ${explosionStrength.toFixed(2)};
            }
          `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
          `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
          `gl_FragColor = vec4( outgoingLight, diffuseColor.a );
            #ifdef USE_VNORMAL
              gl_FragColor.rgb += vNormal * 0.3;
            #endif
          `
        );
      };
    }

    return { geometry: geom, particles: particlesArray, material: pointsMaterial };
  }, [gltf, particleCount, useSurfaceSampler, color, particleSize, additiveBlending, enableMouseInteraction, explosionRadius, explosionStrength]);

  // 마우스 위치 추적
  useEffect(() => {
    if (!enableMouseInteraction) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = (event.clientX / rect.width) * 2 - 1;
      const y = -(event.clientY / rect.height) * 2 + 1;
      
      // 3D 공간에서의 마우스 위치 계산 (카메라 앞쪽 고정 거리)
      mouseRef.current.set(x * 2, y * 2, 0);
      mouseUniformRef.current.value.copy(mouseRef.current);
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl, enableMouseInteraction]);

  // 물결 애니메이션 프레임
  useFrame((state, delta) => {
    if (!pointsRef.current || particles.length === 0) return;

    if (enableWave) {
      timeRef.current += delta * waveSpeed;
    }

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    if (!(positionAttribute instanceof THREE.BufferAttribute)) return;
    const positions = positionAttribute.array as Float32Array;

    particles.forEach((particle, i) => {
      if (enableWave) {
        const { originalPosition, offset, phase } = particle;
        
        // 여러 방향으로 파동 생성
        const waveX = Math.sin(timeRef.current * waveFrequency + offset) * waveAmplitude;
        const waveY = Math.cos(timeRef.current * waveFrequency * 0.7 + phase) * waveAmplitude;
        const waveZ = Math.sin(timeRef.current * waveFrequency * 1.3 + offset + phase) * waveAmplitude;

        // 원래 위치에서 파동만큼 오프셋
        positions[i * 3] = originalPosition.x + waveX;
        positions[i * 3 + 1] = originalPosition.y + waveY;
        positions[i * 3 + 2] = originalPosition.z + waveZ;
      } else {
        // 파동 없이 정적 파티클
        positions[i * 3] = particle.originalPosition.x;
        positions[i * 3 + 1] = particle.originalPosition.y;
        positions[i * 3 + 2] = particle.originalPosition.z;
      }
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (particles.length === 0) {
    return null;
  }

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
};

export const GLTFParticleModel: React.FC<GLTFParticleModelProps> = (props) => {
  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg overflow-hidden">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <GLTFParticleSystem {...props} />
          <OrbitControls enableDamping dampingFactor={0.05} />
        </Suspense>
      </Canvas>
    </div>
  );
};

