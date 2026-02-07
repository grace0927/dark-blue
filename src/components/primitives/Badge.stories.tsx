import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive', 'outline', 'subtle', 'success-subtle', 'destructive-subtle'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Error',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    children: 'Subtle',
  },
}

export const SuccessSubtle: Story = {
  args: {
    variant: 'success-subtle',
    children: 'Success',
  },
}

export const DestructiveSubtle: Story = {
  args: {
    variant: 'destructive-subtle',
    children: 'Error',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="success-subtle">Success</Badge>
      <Badge variant="destructive-subtle">Error</Badge>
    </div>
  ),
}
