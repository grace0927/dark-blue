import type { Meta, StoryObj } from '@storybook/react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  SidebarToggle,
} from './Sidebar'

// Icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1"/>
    <rect width="7" height="5" x="14" y="3" rx="1"/>
    <rect width="7" height="9" x="14" y="12" rx="1"/>
    <rect width="7" height="5" x="3" y="16" rx="1"/>
  </svg>
)

const AnalyticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="20" y2="10"/>
    <line x1="18" x2="18" y1="20" y2="4"/>
    <line x1="6" x2="6" y1="20" y2="16"/>
  </svg>
)

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
  </svg>
)

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="16" y="16" width="6" height="6" rx="1"/>
    <rect x="2" y="16" width="6" height="6" rx="1"/>
    <rect x="9" y="2" width="6" height="6" rx="1"/>
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
    <path d="M12 12V8"/>
  </svg>
)

const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const meta: Meta<typeof Sidebar> = {
  title: 'Composite/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarHeader>
          <span className="font-semibold">Core UI Console</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection title="Main">
            <SidebarItem icon={<DashboardIcon />} label="Dashboard" active />
            <SidebarItem icon={<AnalyticsIcon />} label="Analytics" />
            <SidebarItem icon={<LayersIcon />} label="Resources" />
            <SidebarItem icon={<NetworkIcon />} label="Network" />
          </SidebarSection>
          <SidebarSection title="System">
            <SidebarItem icon={<SecurityIcon />} label="Security" />
            <SidebarItem icon={<SettingsIcon />} label="Configuration" />
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-3 py-2">
            <div className="text-xs text-muted-foreground mb-1">Storage</div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-primary rounded-full" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">85% used</div>
          </div>
          <SidebarToggle />
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-6 bg-surface-base">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="text-muted-foreground mt-2">
          Click the arrow in the sidebar footer to collapse/expand.
        </p>
      </main>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar defaultCollapsed>
        <SidebarHeader>
          <span className="font-semibold">Core UI</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection>
            <SidebarItem icon={<DashboardIcon />} label="Dashboard" active />
            <SidebarItem icon={<AnalyticsIcon />} label="Analytics" />
            <SidebarItem icon={<LayersIcon />} label="Resources" />
            <SidebarItem icon={<NetworkIcon />} label="Network" />
          </SidebarSection>
          <SidebarSection>
            <SidebarItem icon={<SecurityIcon />} label="Security" />
            <SidebarItem icon={<SettingsIcon />} label="Configuration" />
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>
          <SidebarToggle />
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-6 bg-surface-base">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="text-muted-foreground mt-2">
          The sidebar starts collapsed. Click the arrow to expand.
        </p>
      </main>
    </div>
  ),
}

export const WithCallback: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar
        onCollapsedChange={(collapsed) => {
          console.log('Sidebar collapsed:', collapsed)
        }}
      >
        <SidebarHeader>
          <span className="font-semibold">Core UI Console</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection title="Main">
            <SidebarItem icon={<DashboardIcon />} label="Dashboard" active />
            <SidebarItem icon={<AnalyticsIcon />} label="Analytics" />
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>
          <SidebarToggle />
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-6 bg-surface-base">
        <h1 className="text-2xl font-bold">With Callback</h1>
        <p className="text-muted-foreground mt-2">
          Check the console when toggling the sidebar.
        </p>
      </main>
    </div>
  ),
}
