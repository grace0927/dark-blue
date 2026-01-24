import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary text-primary-foreground p-4 rounded">{children}</div>
)

export const Vertical: Story = {
  args: {
    direction: 'column',
    gap: 4,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
}

export const Horizontal: Story = {
  args: {
    direction: 'row',
    gap: 4,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
}

export const Centered: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'center',
    gap: 4,
    className: 'h-40 w-full border',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
      </>
    ),
  },
}

export const SpaceBetween: Story = {
  args: {
    direction: 'row',
    justify: 'between',
    gap: 4,
    className: 'w-full',
    children: (
      <>
        <Box>Left</Box>
        <Box>Right</Box>
      </>
    ),
  },
}

export const DifferentGaps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Stack gap={1}>
        <Box>Gap 1</Box>
        <Box>Gap 1</Box>
      </Stack>
      <Stack gap={4}>
        <Box>Gap 4</Box>
        <Box>Gap 4</Box>
      </Stack>
      <Stack gap={8}>
        <Box>Gap 8</Box>
        <Box>Gap 8</Box>
      </Stack>
    </div>
  ),
}

export const Wrapping: Story = {
  args: {
    direction: 'row',
    wrap: true,
    gap: 4,
    className: 'w-64',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
      </>
    ),
  },
}
