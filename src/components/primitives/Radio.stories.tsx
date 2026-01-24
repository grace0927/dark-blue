import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'
import { Label } from './Label'

const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'radio',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Radio id="option1" name="option" value="option1" />
      <Label htmlFor="option1">Option 1</Label>
    </div>
  ),
}

export const RadioGroup: Story = {
  render: () => (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Radio id="default" name="plan" value="default" defaultChecked />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Radio id="comfortable" name="plan" value="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Radio id="compact" name="plan" value="compact" />
        <Label htmlFor="compact">Compact</Label>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    name: 'radio',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Radio id="sm" name="size" size="sm" />
        <Label htmlFor="sm">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Radio id="md" name="size" size="default" />
        <Label htmlFor="md">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Radio id="lg" name="size" size="lg" />
        <Label htmlFor="lg">Large</Label>
      </div>
    </div>
  ),
}
