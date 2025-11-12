import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Scene3D } from './Scene3D';

const meta = {
  title: 'R3F/Scene3D',
  component: Scene3D,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'React Three Fiber를 사용한 복합 3D 씬입니다. 여러 오브젝트와 조명, 환경을 포함합니다.',
      },
    },
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
      description: '배경 색상',
    },
    showGrid: {
      control: 'boolean',
      description: '그리드 표시 여부',
    },
    showEnvironment: {
      control: 'boolean',
      description: '환경 조명 표시 여부',
    },
  },
} satisfies Meta<typeof Scene3D>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    backgroundColor: '#1a1a1a',
    showGrid: true,
    showEnvironment: true,
  },
};

export const LightBackground: Story = {
  args: {
    backgroundColor: '#f3f4f6',
    showGrid: true,
    showEnvironment: false,
  },
};

export const NoGrid: Story = {
  args: {
    backgroundColor: '#1a1a1a',
    showGrid: false,
    showEnvironment: true,
  },
};

export const Minimal: Story = {
  args: {
    backgroundColor: '#000000',
    showGrid: false,
    showEnvironment: false,
  },
};

