import * as React from 'react'
import { createPortal } from 'react-dom'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../utils/cn'

interface ModalContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const ModalContext = React.createContext<ModalContextValue | undefined>(undefined)

function useModalContext() {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error('Modal components must be used within a Modal provider')
  }
  return context
}

export interface ModalProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Modal({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)

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

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export interface ModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const { setIsOpen } = useModalContext()
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : 'button'}
        className={className}
        onClick={() => setIsOpen(true)}
        {...props}
      />
    )
  }
)
ModalTrigger.displayName = 'ModalTrigger'

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null
  return createPortal(children, document.body)
}

const ModalOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen, setIsOpen } = useModalContext()

    if (!isOpen) return null

    return (
      <ModalPortal>
        <div
          ref={ref}
          className={cn(
            'fixed inset-0 z-50 bg-black/80 animate-fade-in',
            className
          )}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          {...props}
        />
      </ModalPortal>
    )
  }
)
ModalOverlay.displayName = 'ModalOverlay'

const ModalContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen } = useModalContext()
    const contentRef = React.useRef<HTMLDivElement>(null)

    // Focus trap
    React.useEffect(() => {
      if (!isOpen) return

      const content = contentRef.current
      if (!content) return

      const focusableElements = content.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
          return
        }

        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      firstElement?.focus()

      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, setIsOpen])

    // Prevent body scroll when modal is open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [isOpen])

    if (!isOpen) return null

    const handleRef = (node: HTMLDivElement | null) => {
      (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <ModalPortal>
        <div
          ref={handleRef}
          role="dialog"
          aria-modal="true"
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 animate-fade-in sm:rounded-lg',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ModalPortal>
    )
  }
)
ModalContent.displayName = 'ModalContent'

const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
ModalHeader.displayName = 'ModalHeader'

const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
ModalFooter.displayName = 'ModalFooter'

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
ModalDescription.displayName = 'ModalDescription'

const ModalClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { setIsOpen } = useModalContext()

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
        className
      )}
      onClick={() => setIsOpen(false)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
      <span className="sr-only">Close</span>
    </button>
  )
})
ModalClose.displayName = 'ModalClose'

export {
  Modal,
  ModalTrigger,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
}
