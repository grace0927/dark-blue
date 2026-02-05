# dark-blue

A theme-aware React component library built with Tailwind CSS and Radix UI.

## Install

```sh
pnpm add dark-blue
# or
npm install dark-blue
```

## Usage

Import components from the package root and styles from the `styles` entry point:

```tsx
import { Button, Card, CardContent } from 'dark-blue'
import 'dark-blue/styles'

export default function Demo() {
  return (
    <Card>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### Theming

dark-blue uses class-based dark mode (`class="dark"` on `<html>`). The `useTheme` hook manages the active theme, and `themeScript` is a small inline script you can inject into `<head>` to prevent a flash of unstyled content on SSR / initial load:

```tsx
import { useTheme, themeScript } from 'dark-blue'

// Inject into <head> before anything else renders
<script dangerouslySetInnerHTML={{ __html: themeScript }} />

// In your root component
function App() {
  const { theme, setTheme } = useTheme() // 'light' | 'dark' | 'system'
  // ...
}
```

## Components

### Primitives

- Button
- Input
- Label
- Checkbox
- Radio
- Select
- Textarea

### Composite

- Card
- Tabs
- Accordion
- Dropdown
- Modal
- Toast (includes a `useToast` hook)

### Layout

- Container
- Stack
- Grid

## Development

| Command | What it does |
|---|---|
| `pnpm dev` | Vite dev server (demo app at localhost:5173) |
| `pnpm build` | Type-check + build the demo app |
| `pnpm build:lib` | Production library build → `dist/` |
| `pnpm lint` | ESLint |
| `pnpm storybook` | Storybook dev server on port 6006 |
| `pnpm build-storybook` | Static Storybook build |

Visual and interaction coverage is handled by Storybook + Chromatic. There is no unit-test runner.

## Contributing

1. Make your changes, then run `pnpm changeset` and follow the prompts to describe the change and pick a bump type (`patch` / `minor` / `major`).
2. Commit the generated `.changeset/*.md` file alongside your code.
3. Open a PR. On merge to `main`, a "Version Packages" PR is opened automatically — merging that publishes to npm.
