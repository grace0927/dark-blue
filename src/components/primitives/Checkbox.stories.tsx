import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { Label } from './Label'

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="sm" size="sm" />
        <Label htmlFor="sm">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="default" size="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="lg" size="lg" />
        <Label htmlFor="lg">Large</Label>
      </div>
    </div>
  ),
}
