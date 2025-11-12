import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ParticleModel } from './ParticleModel';

const meta = {
  title: 'R3F/ParticleModel',
  component: ParticleModel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '마우스 커서에 반응하는 파티클 모델입니다. 마우스를 가져가면 폭발하고, 멀어지면 원래 모양으로 복원됩니다.',
      },
    },
  },
  argTypes: {
    modelType: {
      control: 'select',
      options: ['torus', 'sphere', 'box'],
      description: '파티클 모델의 형태',
    },
    particleCount: {
      control: { type: 'number', min: 500, max: 5000, step: 100 },
      description: '파티클 개수',
    },
    particleSize: {
      control: { type: 'number', min: 0.01, max: 0.1, step: 0.01 },
      description: '파티클 크기',
    },
    explosionStrength: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.1 },
      description: '폭발 강도',
    },
    restoreSpeed: {
      control: { type: 'number', min: 0.01, max: 0.2, step: 0.01 },
      description: '복원 속도',
    },
    color: {
      control: 'color',
      description: '파티클 색상',
    },
  },
} satisfies Meta<typeof ParticleModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelType: 'torus',
    particleCount: 2000,
    particleSize: 0.02,
    explosionStrength: 2,
    restoreSpeed: 0.05,
    color: '#ffffff',
  },
};

export const SphereModel: Story = {
  args: {
    modelType: 'sphere',
    particleCount: 2500,
    particleSize: 0.025,
    explosionStrength: 2.5,
    restoreSpeed: 0.06,
    color: '#60a5fa',
  },
};

export const BoxModel: Story = {
  args: {
    modelType: 'box',
    particleCount: 3000,
    particleSize: 0.015,
    explosionStrength: 3,
    restoreSpeed: 0.04,
    color: '#f472b6',
  },
};

export const HighDensity: Story = {
  args: {
    modelType: 'torus',
    particleCount: 4000,
    particleSize: 0.015,
    explosionStrength: 2,
    restoreSpeed: 0.05,
    color: '#a78bfa',
  },
};

export const StrongExplosion: Story = {
  args: {
    modelType: 'sphere',
    particleCount: 2000,
    particleSize: 0.02,
    explosionStrength: 4,
    restoreSpeed: 0.08,
    color: '#fb7185',
  },
};

