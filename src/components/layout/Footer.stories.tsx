import type { Meta, StoryObj } from '@storybook/react'
import {
  Footer,
  FooterBrand,
  FooterLinks,
  FooterLinkGroup,
  FooterLink,
  FooterCopyright,
} from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Footer>
      <div className="mx-auto max-w-screen-lg px-4">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <FooterBrand>
            <span className="text-lg font-bold">Dark Blue</span>
            <p className="max-w-xs text-sm text-muted-foreground">
              A modern component library built with React, Tailwind CSS, and TypeScript.
            </p>
          </FooterBrand>
          <FooterLinks>
            <FooterLinkGroup title="Product">
              <FooterLink href="#">Features</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">Changelog</FooterLink>
            </FooterLinkGroup>
            <FooterLinkGroup title="Resources">
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Components</FooterLink>
              <FooterLink href="#">Templates</FooterLink>
            </FooterLinkGroup>
            <FooterLinkGroup title="Company">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </FooterLinkGroup>
          </FooterLinks>
        </div>
        <div className="mt-8 border-t border-border pt-8">
          <FooterCopyright>&copy; 2025 Dark Blue. All rights reserved.</FooterCopyright>
        </div>
      </div>
    </Footer>
  ),
}

export const Minimal: Story = {
  render: () => (
    <Footer variant="minimal">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between px-4">
        <FooterCopyright>&copy; 2025 Dark Blue</FooterCopyright>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
        </div>
      </div>
    </Footer>
  ),
}

export const WithBrandOnly: Story = {
  render: () => (
    <Footer>
      <div className="mx-auto max-w-screen-lg px-4 text-center">
        <FooterBrand className="items-center">
          <span className="text-lg font-bold">Dark Blue</span>
          <p className="text-sm text-muted-foreground">
            Building beautiful interfaces.
          </p>
        </FooterBrand>
        <div className="mt-6">
          <FooterCopyright>&copy; 2025 Dark Blue. All rights reserved.</FooterCopyright>
        </div>
      </div>
    </Footer>
  ),
}
