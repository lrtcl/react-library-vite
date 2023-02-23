import { TextInput } from '@components';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Text input',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    label: {
      table: {
        category: 'text'
      }
    },
    requiredText: {
      table: {
        category: 'text'
      }
    },
    helperText: {
      table: {
        category: 'text'
      }
    },
    errorMessage: {
      table: {
        category: 'text'
      }
    },
    counterText: {
      table: {
        category: 'text'
      }
    },
    showCounter: {
      table: {
        category: 'text'
      }
    },
    counterVariant: {
      table: {
        category: 'text'
      }
    },
    hideLabel: {
      table: {
        category: 'text'
      }
    },
    required: {
      table: {
        category: 'validation'
      }
    },
    maxLength: {
      table: {
        category: 'validation'
      }
    },
    invalid: {
      table: {
        category: 'validation'
      }
    },
    onChange: {
      control: 'null',
      table: {
        category: 'events'
      }
    }
  }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label"
  }
};

export const WithCounter: Story = {
  args: {
    ...Default.args,
    maxLength: 20,
    showCounter: true
  }
};
