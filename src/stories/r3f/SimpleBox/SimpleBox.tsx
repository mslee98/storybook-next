import React, { useEffect, useState, Suspense } from 'react';

const Box = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#4f46e5" />
  </mesh>
);

const Scene: React.FC = () => {
  const [Canvas, setCanvas] = useState<any>(null);
  const [OrbitControls, setOrbitControls] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
    ]).then(([fiber, drei]) => {
      setCanvas(() => fiber.Canvas);
      setOrbitControls(() => drei.OrbitControls);
    });
  }, []);

  if (!Canvas || !OrbitControls) {
    return (
      <div className="w-full h-[500px] bg-gray-900 rounded-lg flex items-center justify-center text-white">
        Loading 3D Scene...
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-gray-900 rounded-lg">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Box />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export const SimpleBox: React.FC = () => {
  return <Scene />;
};

