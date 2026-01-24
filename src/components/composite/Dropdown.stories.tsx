import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from './Dropdown'
import { Button } from '../primitives/Button'

const meta: Meta<typeof Dropdown> = {
  title: 'Composite/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Log out</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="outline">Align End</Button>
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const AlignCenter: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="outline">Align Center</Button>
      </DropdownTrigger>
      <DropdownContent align="center">
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button>My Account</Button>
      </DropdownTrigger>
      <DropdownContent className="w-56">
        <DropdownItem>
          <span className="mr-2">👤</span>
          Profile
        </DropdownItem>
        <DropdownItem>
          <span className="mr-2">⚙️</span>
          Settings
        </DropdownItem>
        <DropdownItem>
          <span className="mr-2">🔔</span>
          Notifications
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <span className="mr-2">🚪</span>
          Log out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}
