# AGENT.md — dark-blue

## Project

`dark-blue` is a React component library / design system. It ships reusable, theme-aware UI components as an npm package. Components are documented and demoed in Storybook.

## Key commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server (demo app) |
| `npm run build` | Type-check + build the demo app |
| `npm run build:lib` | Build the publishable library (`dist/`) |
| `npm run lint` | Run ESLint |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build a static Storybook site |
| `npm run preview` | Preview a production build locally |

> There is no test suite currently. Storybook + Chromatic handle visual/interaction coverage.

## Repository layout

```
src/
├── components/
│   ├── primitives/   # Atomic components (Button, Input, Label, …)
│   ├── composite/    # Compound components (Card, Accordion, Modal, …)
│   └── layout/       # Layout helpers (Container, Stack, Grid)
├── hooks/            # useTheme
├── styles/           # globals.css — CSS custom-property theme tokens
├── utils/            # cn() class-merge helper
├── index.ts          # Public barrel export (everything the library ships)
└── main.tsx          # Dev-only demo app entry
```

Each component directory contains the component file and its `.stories.tsx` file side by side.

## Architecture & conventions

- **Variants** — All variant-based styling uses [Class Variance Authority (CVA)](https://cva.style/docs). Define variants first, then wire them into the component props.
- **Refs** — Every component is wrapped in `React.forwardRef` and sets `displayName`.
- **Prop interfaces** — Extend the matching native HTML element attributes (`React.*HTMLAttributes<…>`) and intersect with `VariantProps<typeof …Variants>`.
- **Class merging** — Use the `cn()` util (`src/utils/cn.ts`) everywhere. It wraps `clsx` + `tailwind-merge`.
- **Composition** — Components that need an `asChild` escape-hatch use `@radix-ui/react-slot`.
- **Barrel exports** — Each subdirectory (`primitives/`, `composite/`, `layout/`) has an `index.ts`. `src/index.ts` re-exports everything.
- **Modules** — The project uses ES modules (`"type": "module"`).

### Theming

- Dark mode is class-based (`class="dark"` on `<html>`).
- All colours are defined as HSL CSS custom properties in `src/styles/globals.css` (light + dark blocks).
- The `useTheme` hook manages theme state (`light` | `dark` | `system`).
- Storybook's preview decorator toggles the class on `document.documentElement` so stories respect the theme switcher.

### Tailwind

- Config lives in `tailwind.config.ts`. It maps the CSS-variable colour tokens into the Tailwind palette so you can use classes like `bg-primary`, `text-muted-foreground`, etc.
- Custom animations (fade, slide, accordion) are defined there as well.

## Adding a new component

1. Pick the right directory: `primitives/` for atomic, `composite/` for compound, `layout/` for layout utilities.
2. Create `ComponentName.tsx` following the pattern: CVA variants → typed props interface → `forwardRef` implementation → set `displayName` → named export.
3. Create `ComponentName.stories.tsx` in the same directory. Tag it with `autodocs` and add argType controls for variants/sizes.
4. Export from the directory's `index.ts`, which is already re-exported by `src/index.ts`.

## Build & publish

- `npm run build:lib` produces `dist/` (ESM bundle + `.d.ts` declarations). Story files and `main.tsx` are excluded from the library build via `tsconfig.lib.json`.
- Publishing is automated: merging a GitHub release triggers `.github/workflows/publish.yml`, which runs `build:lib` and publishes to npm using the `NPM_TOKEN` secret.
- Consumers import components from `'dark-blue'` and styles from `'dark-blue/styles'`.

## Linting

- ESLint 9 flat config (`eslint.config.js`). Targets `**/*.{ts,tsx}`, ignores `dist/`.
- Plugins: `typescript-eslint` (recommended), `react-hooks` (recommended), `react-refresh`.
- Run with `npm run lint`. Fix before committing.

## Things to watch out for

- `dist/` is git-ignored and only produced by `build:lib`. Don't commit it.
- The library build externalises `react`, `react-dom`, and `react/jsx-runtime` — don't bundle them.
- `tsconfig.lib.json` excludes `*.stories.*` and `main.tsx` from type emission. If you add a new non-component entry point, update that config.
- Storybook preview (`preview.ts`) imports `globals.css`. If you add new global tokens, they'll automatically be available in stories.
