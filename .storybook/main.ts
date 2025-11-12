import type { StorybookConfig } from "@storybook/nextjs-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "viteFinal": async (config) => {
    config.plugins = config.plugins || [];
    
    // 모든 SVG 파일을 React 컴포넌트로 처리
    config.plugins.push(svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
      include: "**/*.svg",
    }));

    // Three.js 및 React Three Fiber 최적화
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include || []),
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        'react-reconciler',
        'scheduler',
      ],
      esbuildOptions: {
        ...config.optimizeDeps?.esbuildOptions,
        target: 'es2020',
      },
    };

    // Three.js 관련 모듈 처리
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
      },
      dedupe: [
        ...(config.resolve?.dedupe || []),
        'react',
        'react-dom',
        'three',
      ],
    };

    // SSR 비활성화 (React Three Fiber는 클라이언트 전용)
    config.ssr = {
      ...config.ssr,
      noExternal: ['@react-three/fiber', '@react-three/drei'],
    };

    return config;
  }
};
export default config;