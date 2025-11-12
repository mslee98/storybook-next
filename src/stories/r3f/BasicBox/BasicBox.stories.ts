import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BasicBox } from './BasicBox';

const meta = {
  title: 'R3F/BasicBox',
  component: BasicBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'React Three Fiber를 사용한 기본 박스 컴포넌트입니다. 3D 공간에서 회전하고 조작할 수 있습니다.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'color',
      description: '박스의 색상',
    },
    position: {
      control: 'object',
      description: '박스의 위치 [x, y, z]',
    },
    rotation: {
      control: 'object',
      description: '박스의 회전 [x, y, z] (라디안)',
    },
    size: {
      control: { type: 'number', min: 0.1, max: 3, step: 0.1 },
      description: '박스의 크기',
    },
  },
} satisfies Meta<typeof BasicBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#4f46e5',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: 1,
  },
};

export const RedBox: Story = {
  args: {
    color: '#ef4444',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: 1,
  },
};

export const LargeBox: Story = {
  args: {
    color: '#10b981',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: 2,
  },
};

export const RotatedBox: Story = {
  args: {
    color: '#f59e0b',
    position: [0, 0, 0],
    rotation: [0.5, 0.5, 0],
    size: 1,
  },
};

