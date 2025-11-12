import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Environment } from '@react-three/drei';

interface Scene3DProps {
  backgroundColor?: string;
  showGrid?: boolean;
  showEnvironment?: boolean;
}

export const Scene3D: React.FC<Scene3DProps> = ({ 
  backgroundColor = '#1a1a1a',
  showGrid = true,
  showEnvironment = true
}) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden" style={{ backgroundColor }}>
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[3, 3, 3]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {showGrid && <Grid args={[10, 10]} cellColor="#6b7280" sectionColor="#374151" />}
        {showEnvironment && <Environment preset="sunset" />}
        
        {/* 여러 오브젝트들 */}
        <mesh position={[-1, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh position={[1, 0, 0]}>
          <coneGeometry args={[0.5, 1, 8]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        
        <mesh position={[0, 1, 0]} rotation={[0.5, 0.5, 0]}>
          <torusGeometry args={[0.4, 0.2, 16, 100]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        
        <OrbitControls enableDamping dampingFactor={0.05} />
        </Suspense>
      </Canvas>
    </div>
  );
};

