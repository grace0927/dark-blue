import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

/* ---------------------------------- Root ---------------------------------- */

const mediaPlayerVariants = cva('relative overflow-hidden rounded-xl', {
  variants: {
    variant: {
      video:
        'bg-black border border-border shadow-2xl',
      audio:
        'bg-card border border-border shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'video',
  },
})

export interface MediaPlayerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mediaPlayerVariants> {}

const MediaPlayer = React.forwardRef<HTMLDivElement, MediaPlayerProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(mediaPlayerVariants({ variant, className }))}
      {...props}
    />
  )
)
MediaPlayer.displayName = 'MediaPlayer'

/* -------------------------------- Display --------------------------------- */

const MediaPlayerDisplay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative aspect-video overflow-hidden', className)}
    {...props}
  />
))
MediaPlayerDisplay.displayName = 'MediaPlayerDisplay'

/* -------------------------------- Controls -------------------------------- */

const MediaPlayerControls = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col gap-4 p-4 sm:p-6',
      className
    )}
    {...props}
  />
))
MediaPlayerControls.displayName = 'MediaPlayerControls'

/* ----------------------------- Overlay Controls ----------------------------- */

const MediaPlayerOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-transparent to-black/40 p-6 transition-opacity',
      className
    )}
    {...props}
  />
))
MediaPlayerOverlay.displayName = 'MediaPlayerOverlay'

/* -------------------------------- Scrubber -------------------------------- */

export interface MediaPlayerScrubberProps
  extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number
}

const MediaPlayerScrubber = React.forwardRef<
  HTMLDivElement,
  MediaPlayerScrubberProps
>(({ className, progress = 0, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'group/scrub relative h-1.5 w-full cursor-pointer rounded-full bg-muted',
      className
    )}
    {...props}
  >
    <div
      className="absolute left-0 top-0 h-full rounded-full bg-primary"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    >
      <div className="absolute -right-2 -top-[5px] h-4 w-4 rounded-full border-2 border-primary bg-background shadow-lg opacity-0 transition-opacity group-hover/scrub:opacity-100" />
    </div>
  </div>
))
MediaPlayerScrubber.displayName = 'MediaPlayerScrubber'

/* ------------------------------ Play Button ------------------------------- */

const mediaPlayerPlayButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-transform hover:scale-105',
  {
    variants: {
      variant: {
        video:
          'h-12 w-12 bg-background text-foreground shadow-xl',
        audio:
          'h-10 w-10 bg-primary text-primary-foreground shadow-lg shadow-primary/30',
      },
    },
    defaultVariants: {
      variant: 'video',
    },
  }
)

export interface MediaPlayerPlayButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mediaPlayerPlayButtonVariants> {
  isPlaying?: boolean
}

const MediaPlayerPlayButton = React.forwardRef<
  HTMLButtonElement,
  MediaPlayerPlayButtonProps
>(({ className, variant, isPlaying = false, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label={isPlaying ? 'Pause' : 'Play'}
    className={cn(mediaPlayerPlayButtonVariants({ variant, className }))}
    {...props}
  >
    {isPlaying ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    )}
  </button>
))
MediaPlayerPlayButton.displayName = 'MediaPlayerPlayButton'

/* ----------------------------- Control Button ----------------------------- */

const MediaPlayerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'text-muted-foreground transition-colors hover:text-primary',
      className
    )}
    {...props}
  />
))
MediaPlayerButton.displayName = 'MediaPlayerButton'

/* ---------------------------------- Time ---------------------------------- */

const MediaPlayerTime = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'text-xs font-medium tabular-nums text-muted-foreground',
      className
    )}
    {...props}
  />
))
MediaPlayerTime.displayName = 'MediaPlayerTime'

/* --------------------------------- Volume --------------------------------- */

export interface MediaPlayerVolumeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  level?: number
}

const MediaPlayerVolume = React.forwardRef<
  HTMLDivElement,
  MediaPlayerVolumeProps
>(({ className, level = 67, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-3', className)}
    {...props}
  >
    {children ?? (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    )}
    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${Math.min(100, Math.max(0, level))}%` }}
      />
    </div>
  </div>
))
MediaPlayerVolume.displayName = 'MediaPlayerVolume'

/* --------------------------------- Info ----------------------------------- */

const MediaPlayerInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col', className)} {...props} />
))
MediaPlayerInfo.displayName = 'MediaPlayerInfo'

const MediaPlayerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-bold text-lg', className)}
    {...props}
  />
))
MediaPlayerTitle.displayName = 'MediaPlayerTitle'

const MediaPlayerSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs text-muted-foreground', className)}
    {...props}
  />
))
MediaPlayerSubtitle.displayName = 'MediaPlayerSubtitle'

export {
  MediaPlayer,
  mediaPlayerVariants,
  MediaPlayerDisplay,
  MediaPlayerControls,
  MediaPlayerOverlay,
  MediaPlayerScrubber,
  MediaPlayerPlayButton,
  mediaPlayerPlayButtonVariants,
  MediaPlayerButton,
  MediaPlayerTime,
  MediaPlayerVolume,
  MediaPlayerInfo,
  MediaPlayerTitle,
  MediaPlayerSubtitle,
}
