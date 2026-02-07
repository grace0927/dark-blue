import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const alertVariants = cva(
  'relative flex items-start gap-4 rounded-lg border p-4 shadow-sm',
  {
    variants: {
      variant: {
        info: 'border-info-border bg-info-bg text-info-foreground [&>svg]:text-info',
        success:
          'border-success/20 bg-success/5 text-success-foreground dark:border-success/30 dark:bg-success/10 [&>svg]:text-success',
        warning:
          'border-warning-border bg-warning-bg text-warning-foreground [&>svg]:text-warning',
        destructive:
          'border-destructive/20 bg-destructive/5 text-destructive-foreground dark:border-destructive/30 dark:bg-destructive/10 [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  )
)
Alert.displayName = 'Alert'

const AlertIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('mt-0.5 flex-shrink-0 [&>svg]:h-5 [&>svg]:w-5', className)}
    {...props}
  />
))
AlertIcon.displayName = 'AlertIcon'

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn('font-bold leading-none mb-1', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex-1', className)} {...props} />
))
AlertContent.displayName = 'AlertContent'

const AlertActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-3 flex gap-3', className)}
    {...props}
  />
))
AlertActions.displayName = 'AlertActions'

const AlertClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label="Close alert"
    className={cn(
      'flex-shrink-0 opacity-50 transition-opacity hover:opacity-100',
      className
    )}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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
  </button>
))
AlertClose.displayName = 'AlertClose'

export {
  Alert,
  alertVariants,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertContent,
  AlertActions,
  AlertClose,
}
