import { TextInput } from '@components';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof TextInput> = {
  title: 'Text input',
  component: TextInput,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Label",
  }
};

export const Controlled: Story = {
  args: {
    label: "Label",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
    return (
      <>
        <TextInput {...args} value={value} onChange={handleChange} />
        <p>value is: {value}</p>
      </>
    );
  }
};
