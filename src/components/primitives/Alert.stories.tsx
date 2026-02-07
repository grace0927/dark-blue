import type { Meta, StoryObj } from '@storybook/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertContent,
  AlertActions,
  AlertClose,
} from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'destructive'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
)

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
)

export const Info: Story = {
  render: () => (
    <div className="w-[500px]">
      <Alert variant="info">
        <AlertIcon><InfoIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Update Available</AlertTitle>
          <AlertDescription>
            A new software update is available for your system. Please restart to apply.
          </AlertDescription>
          <AlertActions>
            <button className="text-xs font-bold hover:underline">Restart Now</button>
            <button className="text-xs font-bold hover:underline">Later</button>
          </AlertActions>
        </AlertContent>
        <AlertClose />
      </Alert>
    </div>
  ),
}

export const Success: Story = {
  render: () => (
    <div className="w-[500px]">
      <Alert variant="success">
        <AlertIcon><CheckIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Changes Saved</AlertTitle>
          <AlertDescription>
            Your profile settings have been successfully updated and synced.
          </AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>
    </div>
  ),
}

export const Warning: Story = {
  render: () => (
    <div className="w-[500px]">
      <Alert variant="warning">
        <AlertIcon><WarningIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Expiring Soon</AlertTitle>
          <AlertDescription>
            Your professional subscription is expiring in 3 days. Update payment method.
          </AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>
    </div>
  ),
}

export const Destructive: Story = {
  render: () => (
    <div className="w-[500px]">
      <Alert variant="destructive">
        <AlertIcon><ErrorIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            There was a problem processing your request. Please check your internet connection.
          </AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <Alert variant="info">
        <AlertIcon><InfoIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Update Available</AlertTitle>
          <AlertDescription>A new software update is available for your system.</AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>
      <Alert variant="success">
        <AlertIcon><CheckIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Changes Saved</AlertTitle>
          <AlertDescription>Your profile settings have been successfully updated.</AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>
      <Alert variant="warning">
        <AlertIcon><WarningIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Expiring Soon</AlertTitle>
          <AlertDescription>Your subscription is expiring in 3 days.</AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>
      <Alert variant="destructive">
        <AlertIcon><ErrorIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>There was a problem processing your request.</AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>
    </div>
  ),
}

export const WithoutClose: Story = {
  render: () => (
    <div className="w-[500px]">
      <Alert variant="info">
        <AlertIcon><InfoIcon /></AlertIcon>
        <AlertContent>
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This alert does not have a close button.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
}
