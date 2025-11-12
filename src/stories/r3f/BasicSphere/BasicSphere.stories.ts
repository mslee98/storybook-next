import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BasicSphere } from './BasicSphere';

const meta = {
  title: 'R3F/BasicSphere',
  component: BasicSphere,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'React Three Fiber를 사용한 기본 구체 컴포넌트입니다. 3D 공간에서 회전하고 조작할 수 있습니다.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'color',
      description: '구체의 색상',
    },
    position: {
      control: 'object',
      description: '구체의 위치 [x, y, z]',
    },
    radius: {
      control: { type: 'number', min: 0.1, max: 3, step: 0.1 },
      description: '구체의 반지름',
    },
    wireframe: {
      control: 'boolean',
      description: '와이어프레임 모드',
    },
  },
} satisfies Meta<typeof BasicSphere>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#8b5cf6',
    position: [0, 0, 0],
    radius: 1,
    wireframe: false,
  },
};

export const LargeSphere: Story = {
  args: {
    color: '#ec4899',
    position: [0, 0, 0],
    radius: 1.5,
    wireframe: false,
  },
};

export const Wireframe: Story = {
  args: {
    color: '#06b6d4',
    position: [0, 0, 0],
    radius: 1,
    wireframe: true,
  },
};

export const Metallic: Story = {
  args: {
    color: '#fbbf24',
    position: [0, 0, 0],
    radius: 1,
    wireframe: false,
  },
};

