import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './Grid'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary text-primary-foreground p-4 rounded text-center">{children}</div>
)

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: 4,
    className: 'w-80',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </>
    ),
  },
}

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: 4,
    className: 'w-96',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
      </>
    ),
  },
}

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: 4,
    className: 'w-[500px]',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
        <Box>7</Box>
        <Box>8</Box>
      </>
    ),
  },
}

export const DifferentGaps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Grid cols={3} gap={2} className="w-80">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Grid>
      <Grid cols={3} gap={6} className="w-80">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Grid>
      <Grid cols={3} gap={10} className="w-80">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Grid>
    </div>
  ),
}
