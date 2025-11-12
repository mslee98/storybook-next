import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SimpleBox } from './SimpleBox';

const meta = {
  title: 'R3F/SimpleBox',
  component: SimpleBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'React Three Fiber를 사용한 간단한 박스 컴포넌트입니다. 동적 로딩을 사용합니다.',
      },
    },
  },
} satisfies Meta<typeof SimpleBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

