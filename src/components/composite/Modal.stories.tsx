import type { Meta, StoryObj } from '@storybook/react'
import {
  Modal,
  ModalTrigger,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from './Modal'
import { Button } from '../primitives/Button'
import { Input } from '../primitives/Input'
import { Label } from '../primitives/Label'

const meta: Meta<typeof Modal> = {
  title: 'Composite/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </ModalTrigger>
      <ModalOverlay />
      <ModalContent>
        <ModalClose />
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a modal description. It provides context for the modal.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p>Modal content goes here.</p>
        </div>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Edit Profile</Button>
      </ModalTrigger>
      <ModalOverlay />
      <ModalContent className="sm:max-w-[425px]">
        <ModalClose />
        <ModalHeader>
          <ModalTitle>Edit profile</ModalTitle>
          <ModalDescription>
            Make changes to your profile here. Click save when you're done.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <ModalFooter>
          <Button type="submit">Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </ModalTrigger>
      <ModalOverlay />
      <ModalContent>
        <ModalClose />
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}
