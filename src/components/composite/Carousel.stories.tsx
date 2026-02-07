import type { Meta, StoryObj } from '@storybook/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
} from './Carousel'

const meta: Meta<typeof Carousel> = {
  title: 'Composite/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const slides = [
  { title: 'Slide 1', bg: 'bg-primary-200' },
  { title: 'Slide 2', bg: 'bg-primary-300' },
  { title: 'Slide 3', bg: 'bg-primary-400' },
  { title: 'Slide 4', bg: 'bg-primary-500' },
]

export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div className={`${slide.bg} flex h-64 items-center justify-center rounded-lg`}>
                <span className="text-2xl font-bold text-white">{slide.title}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicators />
      </Carousel>
    </div>
  ),
}

export const WithLoop: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel loop>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div className={`${slide.bg} flex h-64 items-center justify-center rounded-lg`}>
                <span className="text-2xl font-bold text-white">{slide.title}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicators />
      </Carousel>
    </div>
  ),
}

export const WithoutIndicators: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div className={`${slide.bg} flex h-64 items-center justify-center rounded-lg`}>
                <span className="text-2xl font-bold text-white">{slide.title}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const CardContent: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3].map((i) => (
            <CarouselItem key={i}>
              <div className="p-4">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-card-foreground">Card {i}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This is an example card inside a carousel slide.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicators />
      </Carousel>
    </div>
  ),
}
