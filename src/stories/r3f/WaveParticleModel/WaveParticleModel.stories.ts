import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WaveParticleModel } from './WaveParticleModel';

const meta = {
  title: 'R3F/WaveParticleModel',
  component: WaveParticleModel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '물결처럼 부드럽게 움직이는 파티클 모델입니다. 마우스 이벤트 없이도 시간에 따라 자연스럽게 파동 효과를 보여줍니다.',
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
    waveSpeed: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: '파동 속도',
    },
    waveAmplitude: {
      control: { type: 'number', min: 0.1, max: 1, step: 0.05 },
      description: '파동 진폭 (크기)',
    },
    waveFrequency: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.1 },
      description: '파동 주파수',
    },
    color: {
      control: 'color',
      description: '파티클 색상',
    },
  },
} satisfies Meta<typeof WaveParticleModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelType: 'torus',
    particleCount: 2000,
    particleSize: 0.02,
    waveSpeed: 1,
    waveAmplitude: 0.3,
    waveFrequency: 2,
    color: '#ffffff',
  },
};

export const SlowWave: Story = {
  args: {
    modelType: 'sphere',
    particleCount: 2500,
    particleSize: 0.025,
    waveSpeed: 0.5,
    waveAmplitude: 0.4,
    waveFrequency: 1.5,
    color: '#60a5fa',
  },
};

export const FastWave: Story = {
  args: {
    modelType: 'torus',
    particleCount: 2000,
    particleSize: 0.02,
    waveSpeed: 2,
    waveAmplitude: 0.25,
    waveFrequency: 3,
    color: '#f472b6',
  },
};

export const LargeAmplitude: Story = {
  args: {
    modelType: 'sphere',
    particleCount: 2500,
    particleSize: 0.02,
    waveSpeed: 1,
    waveAmplitude: 0.6,
    waveFrequency: 2,
    color: '#a78bfa',
  },
};

export const BoxWave: Story = {
  args: {
    modelType: 'box',
    particleCount: 3000,
    particleSize: 0.015,
    waveSpeed: 1.5,
    waveAmplitude: 0.35,
    waveFrequency: 2.5,
    color: '#fb7185',
  },
};

