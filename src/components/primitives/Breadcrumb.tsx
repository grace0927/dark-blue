import * as React from 'react'
import { cn } from '../../utils/cn'

export type BreadcrumbProps = React.ComponentPropsWithoutRef<'nav'>

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
)
Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground',
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

export type BreadcrumbLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'transition-colors hover:text-foreground',
        className
      )}
      {...props}
    />
  )
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-medium text-foreground', className)}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

export interface BreadcrumbSeparatorProps
  extends React.ComponentPropsWithoutRef<'li'> {
  variant?: 'slash' | 'chevron'
}

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, variant = 'slash', children, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn('text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5', className)}
    {...props}
  >
    {children ?? (variant === 'chevron' ? (
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
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    ) : (
      <span>/</span>
    ))}
  </li>
))
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
