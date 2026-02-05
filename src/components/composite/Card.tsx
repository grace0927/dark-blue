import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground',
  {
    variants: {
      variant: {
        default: 'shadow-sm border-border',
        outline: 'shadow-none border-border',
        elevated: 'shadow-md border-border shadow-inner-glow',
        glow: 'shadow-sm border-border transition-all duration-200 hover:border-primary hover:shadow-glow',
        gradient: 'shadow-sm border-transparent bg-gradient-to-b from-card to-card relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-b before:from-primary/50 before:to-transparent before:-z-10',
      },
      surface: {
        default: 'bg-card',
        base: 'bg-surface-base',
        raised: 'bg-surface-raised',
        high: 'bg-surface-high',
      },
    },
    defaultVariants: {
      variant: 'default',
      surface: 'default',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, surface, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, surface, className }))} {...props} />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
