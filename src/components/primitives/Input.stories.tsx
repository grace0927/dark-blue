import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { Label } from './Label'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    inputSize: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'Enter text...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const Small: Story = {
  args: {
    inputSize: 'sm',
    placeholder: 'Small input',
  },
}

export const Large: Story = {
  args: {
    inputSize: 'lg',
    placeholder: 'Large input',
  },
}

export const WithFile: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="default" placeholder="Default" />
      <Input inputSize="lg" placeholder="Large" />
    </div>
  ),
}
