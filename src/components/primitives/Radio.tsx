import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const radioVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:border-primary checked:bg-primary',
  {
    variants: {
      size: {
        default: 'h-4 w-4',
        sm: 'h-3 w-3',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof radioVariants> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <input
        type="radio"
        className={cn(radioVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Radio.displayName = 'Radio'

export { Radio, radioVariants }
