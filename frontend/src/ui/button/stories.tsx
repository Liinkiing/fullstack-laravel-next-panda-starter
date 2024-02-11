import type { Meta, StoryObj } from '@storybook/react'

import { button } from '~/styled-system/recipes'

import { Button } from '.'

const meta = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
        options: button.variantMap.size,
      },
    },
    variant: {
      control: {
        type: 'inline-radio',
        options: button.variantMap.variant,
      },
    },
    shape: {
      control: {
        type: 'inline-radio',
        options: button.variantMap.shape,
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Hello 🐼',
    variant: 'funky',
    size: 'sm',
    shape: 'square',
  },
}
