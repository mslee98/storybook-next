import React, { Suspense } from 'react';
import { useR3F } from '../utils/useR3F';

interface BasicBoxProps {
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
}

const Box: React.FC<BasicBoxProps> = ({ 
  color = '#4f46e5', 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 1
}) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const BasicBox: React.FC<BasicBoxProps> = (props) => {
  const [r3f, isLoading] = useR3F(['Canvas', 'OrbitControls', 'PerspectiveCamera']);

  if (isLoading || !r3f) {
    return (
      <div className="w-full h-[500px] bg-gray-900 rounded-lg flex items-center justify-center text-white">
        Loading 3D Scene...
      </div>
    );
  }

  const { Canvas, OrbitControls, PerspectiveCamera } = r3f;

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
          <Box {...props} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

