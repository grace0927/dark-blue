import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { Label } from './Label'

// Icons for demos
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
)

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
      options: ['default', 'error', 'success'],
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

export const Success: Story = {
  args: {
    variant: 'success',
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

export const WithLeadingIcon: Story = {
  args: {
    placeholder: 'Username',
    leadingIcon: <UserIcon />,
  },
}

export const WithTrailingIcon: Story = {
  args: {
    placeholder: 'Email address',
    leadingIcon: <MailIcon />,
    trailingIcon: <CheckIcon />,
    variant: 'success',
  },
}

export const WithValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="space-y-2">
        <Label>Email (Success)</Label>
        <Input
          placeholder="Email address"
          leadingIcon={<MailIcon />}
          trailingIcon={<CheckIcon />}
          variant="success"
          defaultValue="user@example.com"
        />
        <p className="text-xs text-success">Email is available</p>
      </div>
      <div className="space-y-2">
        <Label>API Endpoint (Error)</Label>
        <Input
          placeholder="https://api.example.com"
          trailingIcon={<AlertIcon />}
          variant="error"
          defaultValue="http://api.example.com"
        />
        <p className="text-xs text-destructive">Invalid protocol. Must use HTTPS.</p>
      </div>
    </div>
  ),
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
