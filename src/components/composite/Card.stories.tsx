import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Button } from '../primitives/Button'
import { Input } from '../primitives/Input'
import { Label } from '../primitives/Label'

const meta: Meta<typeof Card> = {
  title: 'Composite/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'elevated', 'glow', 'gradient'],
    },
    surface: {
      control: 'select',
      options: ['default', 'base', 'raised', 'high'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Outline: Story = {
  render: () => (
    <Card variant="outline" className="w-[350px]">
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>This card has no shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  ),
}

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-[350px]">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has a larger shadow with inner glow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  ),
}

export const Glow: Story = {
  render: () => (
    <Card variant="glow" className="w-[350px]">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover to see the glow effect.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card glows with the primary color on hover.</p>
      </CardContent>
      <CardFooter>
        <Button>Learn More</Button>
      </CardFooter>
    </Card>
  ),
}

export const Gradient: Story = {
  render: () => (
    <Card variant="gradient" className="w-[350px]">
      <CardHeader>
        <CardTitle>Premium Card</CardTitle>
        <CardDescription>This card has a gradient border.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Used for premium or highlighted features.</p>
      </CardContent>
      <CardFooter>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  ),
}

export const SurfaceLevels: Story = {
  render: () => (
    <div className="flex gap-4 p-8 bg-surface-base rounded-lg">
      <Card surface="base" className="w-[200px]">
        <CardHeader>
          <CardTitle className="text-lg">Base</CardTitle>
          <CardDescription>Lowest layer</CardDescription>
        </CardHeader>
      </Card>
      <Card surface="raised" className="w-[200px]">
        <CardHeader>
          <CardTitle className="text-lg">Raised</CardTitle>
          <CardDescription>Standard cards</CardDescription>
        </CardHeader>
      </Card>
      <Card surface="high" className="w-[200px]">
        <CardHeader>
          <CardTitle className="text-lg">High</CardTitle>
          <CardDescription>Modals, popovers</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="default" className="w-[250px]">
        <CardHeader>
          <CardTitle className="text-lg">Default</CardTitle>
          <CardDescription>Standard card style</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="outline" className="w-[250px]">
        <CardHeader>
          <CardTitle className="text-lg">Outline</CardTitle>
          <CardDescription>No shadow variant</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="elevated" className="w-[250px]">
        <CardHeader>
          <CardTitle className="text-lg">Elevated</CardTitle>
          <CardDescription>With inner glow</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="glow" className="w-[250px]">
        <CardHeader>
          <CardTitle className="text-lg">Glow</CardTitle>
          <CardDescription>Hover for effect</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="gradient" className="w-[250px] col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Gradient</CardTitle>
          <CardDescription>Premium gradient border</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Input id="framework" placeholder="Next.js" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}
