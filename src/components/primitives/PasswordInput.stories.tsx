import type { Meta, StoryObj } from '@storybook/react'
import { PasswordInput } from './PasswordInput'
import { Label } from './Label'

const meta: Meta<typeof PasswordInput> = {
  title: 'Primitives/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    inputSize: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    showLeadingIcon: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {
  args: {
    placeholder: 'Enter your password',
  },
}

export const WithoutLeadingIcon: Story = {
  args: {
    placeholder: 'Enter your password',
    showLeadingIcon: false,
  },
}

export const ErrorState: Story = {
  args: {
    placeholder: 'Enter your password',
    variant: 'error',
  },
}

export const SuccessState: Story = {
  args: {
    placeholder: 'Enter your password',
    variant: 'success',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your password',
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <Label className="mb-2">Small</Label>
        <PasswordInput inputSize="sm" placeholder="Small input" />
      </div>
      <div>
        <Label className="mb-2">Default</Label>
        <PasswordInput inputSize="default" placeholder="Default input" />
      </div>
      <div>
        <Label className="mb-2">Large</Label>
        <PasswordInput inputSize="lg" placeholder="Large input" />
      </div>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <PasswordInput id="password" placeholder="Enter your password" />
      <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
    </div>
  ),
}
