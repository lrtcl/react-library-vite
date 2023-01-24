import { Helloworld } from '@components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Helloworld> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/Hello World',
  component: Helloworld,
};

export default meta;
type Story = StoryObj<typeof Helloworld>;

export const Hello: Story = {
  args: {
    text: "Hello World!"
  }
};

export const Strong: Story = {
  args: {
    ...Hello.args,
    variant: "strong"
  }
}
