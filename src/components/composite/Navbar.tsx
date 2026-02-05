import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const navbarVariants = cva(
  'flex items-center justify-between h-16 px-4 bg-surface-raised border-b border-border z-50',
  {
    variants: {
      position: {
        static: '',
        fixed: 'fixed top-0 left-0 right-0',
        sticky: 'sticky top-0',
      },
    },
    defaultVariants: {
      position: 'static',
    },
  }
)

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
)

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
)

// Main Navbar Component
export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, position, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(navbarVariants({ position, className }))}
      {...props}
    >
      {children}
    </nav>
  )
)
Navbar.displayName = 'Navbar'

// Navbar Brand (Logo area)
export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode
}

const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ className, logo, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-3', className)}
      {...props}
    >
      {logo}
      {children && <span className="font-semibold text-lg">{children}</span>}
    </div>
  )
)
NavbarBrand.displayName = 'NavbarBrand'

// Navbar Search
export interface NavbarSearchProps extends React.HTMLAttributes<HTMLButtonElement> {
  shortcut?: string
  placeholder?: string
  onSearchClick?: () => void
}

const NavbarSearch = React.forwardRef<HTMLButtonElement, NavbarSearchProps>(
  ({ className, shortcut = '⌘K', placeholder = 'Search...', onSearchClick, ...props }, ref) => (
    <button
      ref={ref}
      onClick={onSearchClick}
      className={cn(
        'flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors min-w-[200px]',
        className
      )}
      {...props}
    >
      <SearchIcon />
      <span className="flex-1 text-left">{placeholder}</span>
      <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 text-xs text-muted-foreground">
        {shortcut}
      </kbd>
    </button>
  )
)
NavbarSearch.displayName = 'NavbarSearch'

// Navbar Actions (right side container)
const NavbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2', className)}
    {...props}
  />
))
NavbarActions.displayName = 'NavbarActions'

// Navbar Icon Button
export interface NavbarIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  badge?: number
}

const NavbarIconButton = React.forwardRef<HTMLButtonElement, NavbarIconButtonProps>(
  ({ className, icon, badge, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'relative flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors',
        className
      )}
      {...props}
    >
      {icon || children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )
)
NavbarIconButton.displayName = 'NavbarIconButton'

// Navbar User (profile section)
export interface NavbarUserProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  role?: string
  avatar?: React.ReactNode
}

const NavbarUser = React.forwardRef<HTMLButtonElement, NavbarUserProps>(
  ({ className, name, role, avatar, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-accent transition-colors',
        className
      )}
      {...props}
    >
      {avatar || (
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="hidden sm:block text-left">
        <div className="text-sm font-medium">{name}</div>
        {role && <div className="text-xs text-muted-foreground">{role}</div>}
      </div>
      <ChevronDownIcon />
    </button>
  )
)
NavbarUser.displayName = 'NavbarUser'

// Pre-built icon exports for convenience
const NavbarIcons = {
  Search: SearchIcon,
  Bell: BellIcon,
  Settings: SettingsIcon,
}

export {
  Navbar,
  NavbarBrand,
  NavbarSearch,
  NavbarActions,
  NavbarIconButton,
  NavbarUser,
  NavbarIcons,
  navbarVariants,
}
