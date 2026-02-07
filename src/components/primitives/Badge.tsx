import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-amber-500 text-white',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-border text-foreground bg-transparent',
        subtle: 'bg-muted text-muted-foreground',
        'success-subtle': 'bg-success/15 text-success',
        'destructive-subtle': 'bg-destructive/15 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
