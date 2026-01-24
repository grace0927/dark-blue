import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="bg-muted p-4 rounded">
        Container with default (lg) size
      </div>
    ),
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <div className="bg-muted p-4 rounded">
        Small container (max-w-screen-sm)
      </div>
    ),
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: (
      <div className="bg-muted p-4 rounded">
        Medium container (max-w-screen-md)
      </div>
    ),
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: (
      <div className="bg-muted p-4 rounded">
        Large container (max-w-screen-lg)
      </div>
    ),
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: (
      <div className="bg-muted p-4 rounded">
        Extra large container (max-w-screen-xl)
      </div>
    ),
  },
}

export const Full: Story = {
  args: {
    size: 'full',
    children: (
      <div className="bg-muted p-4 rounded">
        Full width container
      </div>
    ),
  },
}
