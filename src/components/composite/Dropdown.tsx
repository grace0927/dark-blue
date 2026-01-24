import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../utils/cn'

interface DropdownContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement>
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined)

function useDropdownContext() {
  const context = React.useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown provider')
  }
  return context
}

export interface DropdownProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Dropdown({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: DropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const setIsOpen = React.useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open)
      }
      onOpenChange?.(open)
    },
    [isControlled, onOpenChange]
  )

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement
        if (!target.closest('[data-dropdown-content]')) {
          setIsOpen(false)
        }
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, setIsOpen])

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  )
}

export interface DropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const { isOpen, setIsOpen, triggerRef } = useDropdownContext()
    const Comp = asChild ? Slot : 'button'

    const handleRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref, triggerRef]
    )

    return (
      <Comp
        ref={handleRef}
        type={asChild ? undefined : 'button'}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={cn('inline-flex items-center justify-center', className)}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      />
    )
  }
)
DropdownTrigger.displayName = 'DropdownTrigger'

export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
}

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, align = 'start', ...props }, ref) => {
    const { isOpen } = useDropdownContext()

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        data-dropdown-content
        role="menu"
        className={cn(
          'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-fade-in',
          align === 'start' && 'left-0',
          align === 'center' && 'left-1/2 -translate-x-1/2',
          align === 'end' && 'right-0',
          className
        )}
        {...props}
      />
    )
  }
)
DropdownContent.displayName = 'DropdownContent'

const DropdownItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { setIsOpen } = useDropdownContext()

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={0}
        className={cn(
          'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(false)
          }
        }}
        {...props}
      />
    )
  }
)
DropdownItem.displayName = 'DropdownItem'

const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
))
DropdownSeparator.displayName = 'DropdownSeparator'

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator }
