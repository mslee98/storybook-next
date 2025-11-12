import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GLTFParticleModel } from './GLTFParticleModel';

const meta = {
  title: 'R3F/GLTFParticleModel',
  component: GLTFParticleModel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'GLTF 모델을 파티클로 변환하여 표시하는 컴포넌트입니다. 모델의 geometry에서 vertex를 추출하여 파티클로 표현하며, 물결 효과를 적용할 수 있습니다.',
      },
    },
  },
  argTypes: {
    modelPath: {
      control: 'text',
      description: 'GLTF 모델 파일 경로',
    },
    particleSize: {
      control: { type: 'number', min: 0.01, max: 0.1, step: 0.01 },
      description: '파티클 크기',
    },
    waveSpeed: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '파동 속도 (0이면 정적)',
    },
    waveAmplitude: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      description: '파동 진폭',
    },
    waveFrequency: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.1 },
      description: '파동 주파수',
    },
    color: {
      control: 'color',
      description: '파티클 색상',
    },
    particleCount: {
      control: { type: 'number', min: 1000, max: 100000, step: 1000 },
      description: '파티클 개수',
    },
    enableWave: {
      control: 'boolean',
      description: '물결 효과 활성화',
    },
    enableMouseInteraction: {
      control: 'boolean',
      description: '마우스 반응 효과 활성화 (셰이더 기반)',
    },
    useSurfaceSampler: {
      control: 'boolean',
      description: 'MeshSurfaceSampler 사용 (표면 균등 샘플링)',
    },
    additiveBlending: {
      control: 'boolean',
      description: 'AdditiveBlending 사용 (더 밝은 파티클 효과)',
    },
    explosionRadius: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.1 },
      description: '마우스 반응 반경',
    },
    explosionStrength: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: '마우스 반응 강도',
    },
  },
} satisfies Meta<typeof GLTFParticleModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelPath: '/models/model.gltf',
    particleSize: 0.02,
    waveSpeed: 1,
    waveAmplitude: 0.3,
    waveFrequency: 2,
    color: '#ffffff',
    particleCount: 99000,
    enableWave: true,
    enableMouseInteraction: true,
    useSurfaceSampler: true,
    additiveBlending: true,
    explosionRadius: 1.5,
    explosionStrength: 0.5,
  },
};

export const Static: Story = {
  args: {
    modelPath: '/models/model.gltf',
    particleSize: 0.02,
    waveSpeed: 0,
    waveAmplitude: 0,
    waveFrequency: 2,
    color: '#ffffff',
    particleCount: 50000,
    enableWave: false,
    enableMouseInteraction: true,
    useSurfaceSampler: true,
    additiveBlending: true,
    explosionRadius: 1.5,
    explosionStrength: 0.5,
  },
};

export const SlowWave: Story = {
  args: {
    modelPath: '/models/model.gltf',
    particleSize: 0.025,
    waveSpeed: 0.5,
    waveAmplitude: 0.4,
    waveFrequency: 1.5,
    color: '#60a5fa',
    particleCount: 50000,
    enableWave: true,
    enableMouseInteraction: true,
    useSurfaceSampler: true,
    additiveBlending: true,
    explosionRadius: 1.5,
    explosionStrength: 0.5,
  },
};

export const FastWave: Story = {
  args: {
    modelPath: '/models/model.gltf',
    particleSize: 0.02,
    waveSpeed: 2,
    waveAmplitude: 0.25,
    waveFrequency: 3,
    color: '#f472b6',
    particleCount: 50000,
    enableWave: true,
    enableMouseInteraction: true,
    useSurfaceSampler: true,
    additiveBlending: true,
    explosionRadius: 1.5,
    explosionStrength: 0.5,
  },
};

export const HighDensity: Story = {
  args: {
    modelPath: '/models/model.gltf',
    particleSize: 0.015,
    waveSpeed: 1,
    waveAmplitude: 0.3,
    waveFrequency: 2,
    color: '#a78bfa',
    particleCount: 100000,
    enableWave: true,
    enableMouseInteraction: true,
    useSurfaceSampler: true,
    additiveBlending: true,
    explosionRadius: 1.5,
    explosionStrength: 0.5,
  },
};

export const LowDensity: Story = {
  args: {
    modelPath: '/models/model.gltf',
    particleSize: 0.03,
    waveSpeed: 1,
    waveAmplitude: 0.3,
    waveFrequency: 2,
    color: '#fb7185',
    particleCount: 10000,
    enableWave: true,
    enableMouseInteraction: true,
    useSurfaceSampler: true,
    additiveBlending: true,
    explosionRadius: 1.5,
    explosionStrength: 0.5,
  },
};

export const ShaderBasedMouse: Story = {
  args: {
    modelPath: '/models/model.gltf',
    particleSize: 0.02,
    waveSpeed: 1,
    waveAmplitude: 0.3,
    waveFrequency: 2,
    color: '#5c0b17',
    particleCount: 99000,
    enableWave: false,
    enableMouseInteraction: true,
    useSurfaceSampler: true,
    additiveBlending: true,
    explosionRadius: 1.5,
    explosionStrength: 0.5,
  },
};

