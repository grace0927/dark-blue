import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const sidebarVariants = cva(
  'flex flex-col bg-surface-raised border-r border-border transition-all duration-200',
  {
    variants: {
      collapsed: {
        true: 'w-20',
        false: 'w-64',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
)

const sidebarItemVariants = cva(
  'flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg transition-colors border border-transparent',
  {
    variants: {
      active: {
        true: 'bg-primary/10 text-primary border-primary/20',
        false: 'hover:bg-accent hover:text-foreground',
      },
      collapsed: {
        true: 'justify-center px-0',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
      collapsed: false,
    },
  }
)

// Icons
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

// Context for sidebar state
interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar')
  }
  return context
}

// Main Sidebar Component
export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, defaultCollapsed = false, onCollapsedChange, children, ...props }, ref) => {
    const [collapsed, setCollapsedState] = React.useState(defaultCollapsed)

    const setCollapsed = React.useCallback(
      (value: boolean) => {
        setCollapsedState(value)
        onCollapsedChange?.(value)
      },
      [onCollapsedChange]
    )

    return (
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <div
          ref={ref}
          className={cn(sidebarVariants({ collapsed, className }))}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
Sidebar.displayName = 'Sidebar'

// Sidebar Header
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn('flex items-center h-16 px-4 border-b border-border', className)}
      {...props}
    >
      {!collapsed && children}
    </div>
  )
})
SidebarHeader.displayName = 'SidebarHeader'

// Sidebar Content (scrollable area)
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-y-auto p-3', className)}
    {...props}
  />
))
SidebarContent.displayName = 'SidebarContent'

// Sidebar Section
interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    const { collapsed } = useSidebar()

    return (
      <div ref={ref} className={cn('mb-4', className)} {...props}>
        {title && !collapsed && (
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </div>
        )}
        <nav className="space-y-1">{children}</nav>
      </div>
    )
  }
)
SidebarSection.displayName = 'SidebarSection'

// Sidebar Item
export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode
  label: string
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, label, active, ...props }, ref) => {
    const { collapsed } = useSidebar()

    return (
      <button
        ref={ref}
        className={cn(sidebarItemVariants({ active, collapsed, className }))}
        title={collapsed ? label : undefined}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {!collapsed && <span className="truncate">{label}</span>}
      </button>
    )
  }
)
SidebarItem.displayName = 'SidebarItem'

// Sidebar Footer
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-3 border-t border-border', className)}
    {...props}
  />
))
SidebarFooter.displayName = 'SidebarFooter'

// Sidebar Toggle Button
const SidebarToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <button
      ref={ref}
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        'flex items-center justify-center w-full py-2 text-muted-foreground hover:text-foreground transition-colors',
        className
      )}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      {...props}
    >
      {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </button>
  )
})
SidebarToggle.displayName = 'SidebarToggle'

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  SidebarToggle,
  sidebarVariants,
  sidebarItemVariants,
  useSidebar,
}
