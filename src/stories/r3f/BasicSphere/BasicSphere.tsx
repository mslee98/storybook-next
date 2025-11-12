import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface BasicSphereProps {
  color?: string;
  position?: [number, number, number];
  radius?: number;
  wireframe?: boolean;
}

const Sphere: React.FC<BasicSphereProps> = ({ 
  color = '#8b5cf6', 
  position = [0, 0, 0],
  radius = 1,
  wireframe = false
}) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

export const BasicSphere: React.FC<BasicSphereProps> = (props) => {
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
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Sphere {...props} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

