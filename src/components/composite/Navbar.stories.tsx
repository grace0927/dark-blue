import type { Meta, StoryObj } from '@storybook/react'
import {
  Navbar,
  NavbarBrand,
  NavbarSearch,
  NavbarActions,
  NavbarIconButton,
  NavbarUser,
  NavbarIcons,
} from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Composite/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['static', 'fixed', 'sticky'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Simple logo component
const Logo = () => (
  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground font-bold">
    N
  </div>
)

export const Default: Story = {
  render: () => (
    <Navbar>
      <NavbarBrand logo={<Logo />}>Nexus</NavbarBrand>
      <NavbarSearch onSearchClick={() => console.log('Search clicked')} />
      <NavbarActions>
        <NavbarIconButton icon={<NavbarIcons.Bell />} badge={3} aria-label="Notifications" />
        <NavbarIconButton icon={<NavbarIcons.Settings />} aria-label="Settings" />
        <NavbarUser name="Alex Rivera" role="Admin" />
      </NavbarActions>
    </Navbar>
  ),
}

export const WithoutSearch: Story = {
  render: () => (
    <Navbar>
      <NavbarBrand logo={<Logo />}>Nexus</NavbarBrand>
      <NavbarActions>
        <NavbarIconButton icon={<NavbarIcons.Bell />} aria-label="Notifications" />
        <NavbarIconButton icon={<NavbarIcons.Settings />} aria-label="Settings" />
        <NavbarUser name="Alex Rivera" role="Admin" />
      </NavbarActions>
    </Navbar>
  ),
}

export const WithBadges: Story = {
  render: () => (
    <Navbar>
      <NavbarBrand logo={<Logo />}>Nexus</NavbarBrand>
      <NavbarSearch placeholder="Search anything..." shortcut="⌘K" />
      <NavbarActions>
        <NavbarIconButton icon={<NavbarIcons.Bell />} badge={99} aria-label="Notifications" />
        <NavbarIconButton icon={<NavbarIcons.Settings />} aria-label="Settings" />
        <NavbarUser name="Alex Rivera" role="Admin" />
      </NavbarActions>
    </Navbar>
  ),
}

export const CustomAvatar: Story = {
  render: () => (
    <Navbar>
      <NavbarBrand logo={<Logo />}>Nexus</NavbarBrand>
      <NavbarSearch />
      <NavbarActions>
        <NavbarIconButton icon={<NavbarIcons.Bell />} aria-label="Notifications" />
        <NavbarUser
          name="Alex Rivera"
          role="Admin"
          avatar={
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              alt="Avatar"
              className="h-8 w-8 rounded-full"
            />
          }
        />
      </NavbarActions>
    </Navbar>
  ),
}

export const Sticky: Story = {
  render: () => (
    <div className="h-[200vh] bg-surface-base">
      <Navbar position="sticky">
        <NavbarBrand logo={<Logo />}>Nexus</NavbarBrand>
        <NavbarSearch />
        <NavbarActions>
          <NavbarIconButton icon={<NavbarIcons.Bell />} badge={5} aria-label="Notifications" />
          <NavbarIconButton icon={<NavbarIcons.Settings />} aria-label="Settings" />
          <NavbarUser name="Alex Rivera" role="Admin" />
        </NavbarActions>
      </Navbar>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Sticky Navbar</h1>
        <p className="text-muted-foreground mb-4">
          Scroll down to see the navbar stick to the top.
        </p>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="py-4 border-b border-border">
            Content block {i + 1}
          </p>
        ))}
      </div>
    </div>
  ),
}

export const FullLayout: Story = {
  render: () => (
    <div className="h-screen flex flex-col">
      <Navbar>
        <NavbarBrand logo={<Logo />}>Nexus</NavbarBrand>
        <NavbarSearch />
        <NavbarActions>
          <NavbarIconButton icon={<NavbarIcons.Bell />} badge={3} aria-label="Notifications" />
          <NavbarIconButton icon={<NavbarIcons.Settings />} aria-label="Settings" />
          <NavbarUser name="Alex Rivera" role="Admin" />
        </NavbarActions>
      </Navbar>
      <div className="flex flex-1">
        <aside className="w-64 bg-surface-raised border-r border-border p-4">
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded-md bg-primary/10 text-primary">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-accent">Analytics</a>
            <a href="#" className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-accent">Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-surface-base">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            This demonstrates a full layout with Navbar and sidebar.
          </p>
        </main>
      </div>
    </div>
  ),
}
