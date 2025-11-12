import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LightingDemo } from './LightingDemo';

const meta = {
  title: 'R3F/LightingDemo',
  component: LightingDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'React Three Fiber를 사용한 조명 데모입니다. 다양한 조명 설정을 확인할 수 있습니다.',
      },
    },
  },
  argTypes: {
    ambientIntensity: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: '환경 조명 강도',
    },
    pointIntensity: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '점 조명 강도',
    },
    directionalIntensity: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '방향 조명 강도',
    },
  },
} satisfies Meta<typeof LightingDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ambientIntensity: 0.5,
    pointIntensity: 1,
    directionalIntensity: 0.5,
  },
};

export const Bright: Story = {
  args: {
    ambientIntensity: 1,
    pointIntensity: 2,
    directionalIntensity: 1,
  },
};

export const Dark: Story = {
  args: {
    ambientIntensity: 0.2,
    pointIntensity: 0.5,
    directionalIntensity: 0.3,
  },
};

export const Dramatic: Story = {
  args: {
    ambientIntensity: 0.3,
    pointIntensity: 3,
    directionalIntensity: 0.2,
  },
};

