import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Toast, ToastTitle, ToastDescription, ToastContainer, useToast } from './Toast'
import { Button } from '../primitives/Button'

const meta: Meta<typeof Toast> = {
  title: 'Composite/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toast open={true}>
      <div className="grid gap-1">
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>This is a toast notification.</ToastDescription>
      </div>
    </Toast>
  ),
}

export const Success: Story = {
  render: () => (
    <Toast variant="success" open={true}>
      <div className="grid gap-1">
        <ToastTitle>Success</ToastTitle>
        <ToastDescription>Your changes have been saved.</ToastDescription>
      </div>
    </Toast>
  ),
}

export const Error: Story = {
  render: () => (
    <Toast variant="error" open={true}>
      <div className="grid gap-1">
        <ToastTitle>Error</ToastTitle>
        <ToastDescription>Something went wrong.</ToastDescription>
      </div>
    </Toast>
  ),
}

export const Warning: Story = {
  render: () => (
    <Toast variant="warning" open={true}>
      <div className="grid gap-1">
        <ToastTitle>Warning</ToastTitle>
        <ToastDescription>Please review your input.</ToastDescription>
      </div>
    </Toast>
  ),
}

function ToastDemo() {
  const { toasts, toast, dismiss } = useToast()

  return (
    <div className="flex gap-2">
      <Button onClick={() => toast({ title: 'Default', description: 'A default toast' })}>
        Default
      </Button>
      <Button onClick={() => toast({ variant: 'success', title: 'Success!', description: 'Operation completed' })}>
        Success
      </Button>
      <Button onClick={() => toast({ variant: 'error', title: 'Error', description: 'Something went wrong' })}>
        Error
      </Button>
      <Button onClick={() => toast({ variant: 'warning', title: 'Warning', description: 'Please be careful' })}>
        Warning
      </Button>
      <ToastContainer>
        {toasts.map((t) => (
          <Toast key={t.id} variant={t.variant} onClose={() => dismiss(t.id)}>
            <div className="grid gap-1">
              {t.title && <ToastTitle>{t.title}</ToastTitle>}
              {t.description && <ToastDescription>{t.description}</ToastDescription>}
            </div>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <ToastDemo />,
}

function PositionDemo() {
  const [position, setPosition] = useState<'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'>('bottom-right')
  const [showToast, setShowToast] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant={position === 'top-left' ? 'default' : 'outline'} onClick={() => setPosition('top-left')}>
          Top Left
        </Button>
        <Button variant={position === 'top-right' ? 'default' : 'outline'} onClick={() => setPosition('top-right')}>
          Top Right
        </Button>
        <Button variant={position === 'bottom-left' ? 'default' : 'outline'} onClick={() => setPosition('bottom-left')}>
          Bottom Left
        </Button>
        <Button variant={position === 'bottom-right' ? 'default' : 'outline'} onClick={() => setPosition('bottom-right')}>
          Bottom Right
        </Button>
      </div>
      <Button onClick={() => setShowToast(true)}>Show Toast</Button>
      <ToastContainer position={position}>
        {showToast && (
          <Toast onClose={() => setShowToast(false)}>
            <div className="grid gap-1">
              <ToastTitle>Position: {position}</ToastTitle>
              <ToastDescription>This toast appears in the {position} corner.</ToastDescription>
            </div>
          </Toast>
        )}
      </ToastContainer>
    </div>
  )
}

export const Positions: Story = {
  render: () => <PositionDemo />,
}
