import * as React from 'react'
import { cn } from '../../utils/cn'

interface CarouselContextValue {
  currentIndex: number
  totalSlides: number
  setTotalSlides: (count: number) => void
  goTo: (index: number) => void
  goToPrevious: () => void
  goToNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
}

const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined)

function useCarouselContext() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('Carousel components must be used within a Carousel provider')
  }
  return context
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number
  loop?: boolean
  onSlideChange?: (index: number) => void
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, defaultIndex = 0, loop = false, onSlideChange, children, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(defaultIndex)
    const [totalSlides, setTotalSlides] = React.useState(0)

    const canGoPrevious = loop || currentIndex > 0
    const canGoNext = loop || currentIndex < totalSlides - 1

    const goTo = React.useCallback(
      (index: number) => {
        let nextIndex = index
        if (loop) {
          if (nextIndex < 0) nextIndex = totalSlides - 1
          if (nextIndex >= totalSlides) nextIndex = 0
        } else {
          nextIndex = Math.max(0, Math.min(nextIndex, totalSlides - 1))
        }
        setCurrentIndex(nextIndex)
        onSlideChange?.(nextIndex)
      },
      [loop, totalSlides, onSlideChange]
    )

    const goToPrevious = React.useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex])
    const goToNext = React.useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goToPrevious()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          goToNext()
        }
      },
      [goToPrevious, goToNext]
    )

    return (
      <CarouselContext.Provider
        value={{
          currentIndex,
          totalSlides,
          setTotalSlides,
          goTo,
          goToPrevious,
          goToNext,
          canGoPrevious,
          canGoNext,
        }}
      >
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn('relative w-full focus-visible:outline-none', className)}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { currentIndex, setTotalSlides } = useCarouselContext()
  const childCount = React.Children.count(children)

  React.useEffect(() => {
    setTotalSlides(childCount)
  }, [childCount, setTotalSlides])

  return (
    <div className="overflow-hidden rounded-lg">
      <div
        ref={ref}
        className={cn('flex transition-transform duration-300 ease-in-out', className)}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-roledescription="slide"
    className={cn('w-full flex-shrink-0', className)}
    {...props}
  />
))
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { goToPrevious, canGoPrevious } = useCarouselContext()

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Previous slide"
      disabled={!canGoPrevious}
      onClick={goToPrevious}
      className={cn(
        'absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm transition-colors hover:bg-background disabled:pointer-events-none disabled:opacity-50',
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
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { goToNext, canGoNext } = useCarouselContext()

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Next slide"
      disabled={!canGoNext}
      onClick={goToNext}
      className={cn(
        'absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm transition-colors hover:bg-background disabled:pointer-events-none disabled:opacity-50',
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
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  )
})
CarouselNext.displayName = 'CarouselNext'

const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { currentIndex, totalSlides, goTo } = useCarouselContext()

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn('flex items-center justify-center gap-2 pt-4', className)}
      {...props}
    >
      {Array.from({ length: totalSlides }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={currentIndex === i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => goTo(i)}
          className={cn(
            'h-2 rounded-full transition-all',
            currentIndex === i
              ? 'w-6 bg-primary'
              : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
          )}
        />
      ))}
    </div>
  )
})
CarouselIndicators.displayName = 'CarouselIndicators'

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
  useCarouselContext,
}
