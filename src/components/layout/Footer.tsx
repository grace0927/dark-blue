import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const footerVariants = cva(
  'w-full border-t border-border bg-background text-foreground',
  {
    variants: {
      variant: {
        default: 'py-12',
        minimal: 'py-6',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, variant, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(footerVariants({ variant, className }))}
      {...props}
    />
  )
)
Footer.displayName = 'Footer'

const FooterBrand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-2', className)}
    {...props}
  />
))
FooterBrand.displayName = 'FooterBrand'

const FooterLinks = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4',
      className
    )}
    {...props}
  />
))
FooterLinks.displayName = 'FooterLinks'

const FooterLinkGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string }
>(({ className, title, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
    {title && (
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
    )}
    <ul className="flex flex-col gap-2">{children}</ul>
  </div>
))
FooterLinkGroup.displayName = 'FooterLinkGroup'

const FooterLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <li>
    <a
      ref={ref}
      className={cn(
        'text-sm text-muted-foreground transition-colors hover:text-foreground',
        className
      )}
      {...props}
    />
  </li>
))
FooterLink.displayName = 'FooterLink'

const FooterCopyright = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-muted-foreground',
      className
    )}
    {...props}
  />
))
FooterCopyright.displayName = 'FooterCopyright'

export {
  Footer,
  footerVariants,
  FooterBrand,
  FooterLinks,
  FooterLinkGroup,
  FooterLink,
  FooterCopyright,
}
