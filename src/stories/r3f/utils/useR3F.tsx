import { useEffect, useState } from 'react';

interface R3FModules {
  Canvas: any;
  OrbitControls: any;
  PerspectiveCamera?: any;
  Grid?: any;
  Environment?: any;
}

export const useR3F = (modules: string[] = ['Canvas', 'OrbitControls']): [R3FModules | null, boolean] => {
  const [r3fModules, setR3FModules] = useState<R3FModules | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
    ]).then(([fiber, drei]) => {
      const loaded: R3FModules = {
        Canvas: fiber.Canvas,
        OrbitControls: drei.OrbitControls,
      };

      if (modules.includes('PerspectiveCamera')) {
        loaded.PerspectiveCamera = drei.PerspectiveCamera;
      }
      if (modules.includes('Grid')) {
        loaded.Grid = drei.Grid;
      }
      if (modules.includes('Environment')) {
        loaded.Environment = drei.Environment;
      }

      setR3FModules(loaded);
      setIsLoading(false);
    }).catch((error) => {
      console.error('Failed to load R3F modules:', error);
      setIsLoading(false);
    });
  }, [modules.join(',')]);

  return [r3fModules, isLoading];
};

