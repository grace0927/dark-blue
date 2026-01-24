import * as React from 'react'
import { cn } from '../../utils/cn'

interface AccordionContextValue {
  value: string[]
  onValueChange: (value: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

function useAccordionContext() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion provider')
  }
  return context
}

interface AccordionItemContextValue {
  value: string
  isOpen: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined)

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error('AccordionTrigger/Content must be used within an AccordionItem')
  }
  return context
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = 'single', value: controlledValue, defaultValue = [], onValueChange, children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        let newValue: string[]
        if (type === 'single') {
          newValue = value.includes(itemValue) ? [] : [itemValue]
        } else {
          newValue = value.includes(itemValue)
            ? value.filter((v) => v !== itemValue)
            : [...value, itemValue]
        }

        if (!isControlled) {
          setUncontrolledValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [type, value, isControlled, onValueChange]
    )

    return (
      <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: openValues } = useAccordionContext()
    const isOpen = openValues.includes(value)

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div ref={ref} className={cn('border-b', className)} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { onValueChange } = useAccordionContext()
  const { value, isOpen } = useAccordionItemContext()

  return (
    <h3 className="flex">
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={() => onValueChange(value)}
        {...props}
      >
        {children}
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
          className="h-4 w-4 shrink-0 transition-transform duration-200"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>
  )
})
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen } = useAccordionItemContext()

  return (
    <div
      ref={ref}
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        'overflow-hidden text-sm transition-all',
        isOpen ? 'animate-accordion-down' : 'animate-accordion-up',
        !isOpen && 'hidden',
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
