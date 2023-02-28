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
    },
    showCounter: {
      table: {
        category: 'character counter'
      }
    },
    counterLimit: {
      table: {
        category: 'character counter'
      }
    },
    counterHelperText: {
      table: {
        category: 'character counter'
      }
    },
    counterTextUnderLimit: {
      table: {
        category: 'character counter'
      }
    },
    counterTextOverLimit: {
      table: {
        category: 'character counter'
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
 * The Character counter requires at least the following props to be set:
 * - `showCounter`
 * - `counterLimit`
 * - `counterHelperText` (not displayed on screen, but required for screen reader users)
 *
 * Additionally, these props have default values, so they are optional. Use them to customize or translate the text displayed on the counter:
 * - `counterTextUnderLimit`
 * - `counterTextOverLimit`
 */
export const WithCounter: Story = {
  args: {
    ...Default.args,
    helperText: "Entrez votre nom et prénom",
    counterLimit: 20,
    counterHelperText: "Vous pouvez saisir jusqu’à 20 caractères",
    counterTextUnderLimit: "caractères restants",
    counterTextOverLimit: "caractères en trop",
    showCounter: true
  },
  name: 'Character Counter',
};
