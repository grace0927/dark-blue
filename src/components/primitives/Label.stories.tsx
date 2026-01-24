import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Label text',
  },
}

export const Error: Story = {
  args: {
    error: true,
    children: 'Error label',
  },
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}
