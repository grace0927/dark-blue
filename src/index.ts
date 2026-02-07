"use client";

// Styles (side-effect import for CSS bundling)
import './styles/globals.css'

// Primitives
export * from './components/primitives'

// Layout
export * from './components/layout'

// Composite
export * from './components/composite'

// Hooks
export { useTheme, themeScript } from './hooks/useTheme'

// Utils
export { cn } from './utils/cn'
