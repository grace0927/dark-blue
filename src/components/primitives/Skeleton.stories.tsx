import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'h-4 w-48',
  },
}

export const Circle: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  ),
}

export const ContentSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4 p-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
}
