import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AnimatedBox } from './AnimatedBox';

const meta = {
  title: 'R3F/AnimatedBox',
  component: AnimatedBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'React Three Fiber를 사용한 애니메이션 박스 컴포넌트입니다. 자동으로 회전합니다.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'color',
      description: '박스의 색상',
    },
    speed: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '회전 속도',
    },
    size: {
      control: { type: 'number', min: 0.1, max: 3, step: 0.1 },
      description: '박스의 크기',
    },
  },
} satisfies Meta<typeof AnimatedBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#6366f1',
    speed: 1,
    size: 1,
  },
};

export const FastRotation: Story = {
  args: {
    color: '#ec4899',
    speed: 3,
    size: 1,
  },
};

export const SlowRotation: Story = {
  args: {
    color: '#10b981',
    speed: 0.5,
    size: 1,
  },
};

export const LargeAnimated: Story = {
  args: {
    color: '#f59e0b',
    speed: 1,
    size: 1.5,
  },
};

