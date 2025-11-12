import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedBoxProps {
  color?: string;
  speed?: number;
  size?: number;
}

const RotatingBox: React.FC<AnimatedBoxProps> = ({ 
  color = '#6366f1', 
  speed = 1,
  size = 1
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const AnimatedBox: React.FC<AnimatedBoxProps> = (props) => {
  return (
    <div className="w-full h-[500px] bg-gray-900 rounded-lg">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingBox {...props} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

