import type { Meta, StoryObj } from '@storybook/react'
import {
  MediaPlayer,
  MediaPlayerDisplay,
  MediaPlayerControls,
  MediaPlayerOverlay,
  MediaPlayerScrubber,
  MediaPlayerPlayButton,
  MediaPlayerButton,
  MediaPlayerTime,
  MediaPlayerVolume,
  MediaPlayerInfo,
  MediaPlayerTitle,
  MediaPlayerSubtitle,
} from './MediaPlayer'

const meta: Meta<typeof MediaPlayer> = {
  title: 'Composite/MediaPlayer',
  component: MediaPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['video', 'audio'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const SkipBackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 19V5l-7 7 7 7Z" />
    <path d="M20 19V5l-7 7 7 7Z" />
  </svg>
)

const SkipForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 19V5l7 7-7 7Z" />
    <path d="M4 19V5l7 7-7 7Z" />
  </svg>
)

const CaptionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
    <path d="M7 15h4M15 15h2M7 11h2M13 11h4" />
  </svg>
)

const FullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
)

const MovieIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="m10 8 6 4-6 4V8Z" />
  </svg>
)

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

export const VideoPlayer: Story = {
  render: () => (
    <div className="w-[700px]">
      <MediaPlayer variant="video">
        <MediaPlayerDisplay>
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-purple-900/20">
            <div className="text-center text-white">
              <MovieIcon />
              <p className="mt-2 text-sm font-medium opacity-40">Video Content</p>
            </div>
          </div>
          <MediaPlayerOverlay>
            <div className="flex items-start justify-between">
              <MediaPlayerInfo>
                <MediaPlayerTitle className="text-white">System Overview - Chapter 04</MediaPlayerTitle>
                <MediaPlayerSubtitle className="text-slate-400">Product Presentation</MediaPlayerSubtitle>
              </MediaPlayerInfo>
              <MediaPlayerButton className="text-white hover:text-primary">
                <SettingsIcon />
              </MediaPlayerButton>
            </div>
            <div className="flex flex-col gap-4">
              <MediaPlayerScrubber progress={65} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <MediaPlayerButton className="text-white hover:text-primary">
                      <SkipBackIcon />
                    </MediaPlayerButton>
                    <MediaPlayerPlayButton variant="video" />
                    <MediaPlayerButton className="text-white hover:text-primary">
                      <SkipForwardIcon />
                    </MediaPlayerButton>
                  </div>
                  <MediaPlayerVolume level={67}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  </MediaPlayerVolume>
                  <MediaPlayerTime className="text-white">02:45 / 04:20</MediaPlayerTime>
                </div>
                <div className="flex items-center gap-4">
                  <MediaPlayerButton className="text-white hover:text-primary">
                    <CaptionsIcon />
                  </MediaPlayerButton>
                  <MediaPlayerButton className="text-white hover:text-primary">
                    <FullscreenIcon />
                  </MediaPlayerButton>
                </div>
              </div>
            </div>
          </MediaPlayerOverlay>
        </MediaPlayerDisplay>
      </MediaPlayer>
    </div>
  ),
}

export const AudioPlayer: Story = {
  render: () => (
    <div className="w-[600px]">
      <MediaPlayer variant="audio">
        <MediaPlayerDisplay className="flex items-center justify-center bg-muted">
          <div className="flex items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <MusicIcon />
            </div>
            <div>
              <h4 className="font-bold text-card-foreground">Audio Preview</h4>
              <p className="text-sm text-muted-foreground">Dark Blue Soundboard</p>
            </div>
          </div>
        </MediaPlayerDisplay>
        <MediaPlayerControls className="border-t border-border bg-card">
          <MediaPlayerScrubber progress={40} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <MediaPlayerButton>
                <SkipBackIcon />
              </MediaPlayerButton>
              <MediaPlayerPlayButton variant="audio" isPlaying />
              <MediaPlayerButton>
                <SkipForwardIcon />
              </MediaPlayerButton>
              <div className="mx-2 h-6 w-px bg-border" />
              <MediaPlayerTime>01:32 / 03:55</MediaPlayerTime>
            </div>
            <div className="flex items-center gap-6">
              <MediaPlayerVolume level={80} />
              <MediaPlayerButton>
                <ListIcon />
              </MediaPlayerButton>
            </div>
          </div>
        </MediaPlayerControls>
      </MediaPlayer>
    </div>
  ),
}

export const MinimalAudio: Story = {
  render: () => (
    <div className="w-[400px]">
      <MediaPlayer variant="audio">
        <MediaPlayerControls>
          <MediaPlayerScrubber progress={25} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MediaPlayerPlayButton variant="audio" />
              <MediaPlayerTime>00:45 / 03:00</MediaPlayerTime>
            </div>
            <MediaPlayerVolume level={50} />
          </div>
        </MediaPlayerControls>
      </MediaPlayer>
    </div>
  ),
}
