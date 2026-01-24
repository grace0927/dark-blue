import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { Label } from './Label'

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <option value="">Select an option</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="cherry">Cherry</option>
    </Select>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="fruit">Favorite Fruit</Label>
      <Select id="fruit">
        <option value="">Select a fruit</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </Select>
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <Select variant="error">
      <option value="">Select an option</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <option value="">Select an option</option>
      <option value="apple">Apple</option>
    </Select>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Select selectSize="sm">
        <option value="">Small</option>
      </Select>
      <Select selectSize="default">
        <option value="">Default</option>
      </Select>
      <Select selectSize="lg">
        <option value="">Large</option>
      </Select>
    </div>
  ),
}
