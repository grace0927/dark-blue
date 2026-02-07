import * as React from 'react'
import { cn } from '../../utils/cn'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-md bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent before:animate-shimmer',
          className
        )}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

export { Skeleton }
