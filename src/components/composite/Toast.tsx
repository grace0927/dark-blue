import * as React from 'react'
import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all animate-slide-in-from-right',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
        error: 'border-destructive bg-destructive text-destructive-foreground',
        warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  open?: boolean
  onClose?: () => void
  duration?: number
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, open = true, onClose, duration = 5000, children, ...props }, ref) => {
    React.useEffect(() => {
      if (!open || !onClose || duration === Infinity) return

      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }, [open, onClose, duration])

    if (!open) return null

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {children}
        {onClose && (
          <button
            type="button"
            className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={onClose}
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
        )}
      </div>
    )
  }
)
Toast.displayName = 'Toast'

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
))
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
))
ToastDescription.displayName = 'ToastDescription'

export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className, position = 'bottom-right', children, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
    }, [])

    const positionClasses = {
      'top-right': 'top-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'top-center': 'top-0 left-1/2 -translate-x-1/2',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    }

    if (!mounted) return null

    return createPortal(
      <div
        ref={ref}
        className={cn(
          'fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]',
          positionClasses[position],
          className
        )}
        {...props}
      >
        {children}
      </div>,
      document.body
    )
  }
)
ToastContainer.displayName = 'ToastContainer'

// Toast hook for managing toasts
interface ToastItem {
  id: string
  variant?: ToastProps['variant']
  title?: React.ReactNode
  description?: React.ReactNode
  duration?: number
}

interface ToastState {
  toasts: ToastItem[]
}

type ToastAction =
  | { type: 'ADD_TOAST'; toast: ToastItem }
  | { type: 'REMOVE_TOAST'; id: string }

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.toast] }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) }
    default:
      return state
  }
}

export function useToast() {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] })

  const toast = React.useCallback(
    (props: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9)
      dispatch({ type: 'ADD_TOAST', toast: { ...props, id } })
      return id
    },
    []
  )

  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', id })
  }, [])

  return {
    toasts: state.toasts,
    toast,
    dismiss,
  }
}

export { Toast, ToastTitle, ToastDescription, ToastContainer, toastVariants }
