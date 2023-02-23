import { TextInput } from '@components';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Meta description
 */
const meta = {
  title: 'Text input',
  component: TextInput,
  parameters: {
    componentSubtitle: 'Subtitle'
  },
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
    label: 'Label'
  }
};

/**
 * The Character counter requires at least both `maxLength` and `showCounter` props to work.<br />
 * In addition, other props can adjust the counter behavior to your needs:
 * - `counterText`: optional custom text at the end of the counter
 * - `counterVariant`: display value length (default) or remaining characters.
 */
export const WithCounter: Story = {
  args: {
    ...Default.args,
    maxLength: 20,
    showCounter: true
  },
  // name: 'With Counter',
};
