import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../components/Typography/Typography';

const meta = {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs']
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tag: 'h1',
    children: 'lorem ipsum dolor sit amet'
  }
};
