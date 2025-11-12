import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface LightingDemoProps {
  ambientIntensity?: number;
  pointIntensity?: number;
  directionalIntensity?: number;
}

export const LightingDemo: React.FC<LightingDemoProps> = ({
  ambientIntensity = 0.5,
  pointIntensity = 1,
  directionalIntensity = 0.5,
}) => {
  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* 조명들 */}
        <ambientLight intensity={ambientIntensity} />
        <pointLight position={[5, 5, 5]} intensity={pointIntensity} color="#ffffff" />
        <directionalLight 
          position={[-5, -5, -5]} 
          intensity={directionalIntensity} 
          color="#ffffff"
        />
        
        {/* 오브젝트들 */}
        <mesh position={[-1.5, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        
        <mesh position={[1.5, 0, 0]}>
          <coneGeometry args={[0.7, 1.2, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        
        <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

