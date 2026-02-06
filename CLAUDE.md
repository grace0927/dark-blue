# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev               # Vite dev server (demo app at localhost:5173)
pnpm build             # tsc type-check + Vite app build
pnpm build:lib         # Production library build → dist/ (what gets published)
pnpm lint              # ESLint (flat config, TS/TSX only)
pnpm storybook         # Storybook dev server on port 6006
pnpm build-storybook
pnpm preview           # Serve the last app build
```

No unit-test runner exists. Visual / interaction coverage is handled by Storybook + Chromatic.

## Dual-build architecture

Vite is configured for two distinct modes in `vite.config.ts`:

- **Default mode** (`pnpm dev` / `pnpm build`) — builds `index.html` + `src/main.tsx` as a normal React app. Used only for local development/demo.
- **Library mode** (`--mode library`) — entry point is `src/index.ts`. Output is a single ESM file in `dist/`. `react`, `react-dom`, and `react/jsx-runtime` are marked external (never bundled). `copyPublicDir` is disabled.

`tsconfig.lib.json` is a separate TS config that runs alongside the library Vite build. It emits **only** `.d.ts` declarations into `dist/`, and explicitly excludes `*.stories.tsx` and `main.tsx`. If you add a file that should ship with the package but isn't a component (e.g. a new top-level utility), make sure it isn't accidentally excluded here.

## Design mockups (Stitch)

The canonical design reference is the Stitch project **"Dark Blue Foundations"**:

<https://stitch.withgoogle.com/projects/775013479836044512>

Screens in the project cover: colour foundations, buttons & form elements, card & surface treatments, navigation & layout patterns, and a light/dark mode comparison. All CSS token values in `globals.css` are derived from these mockups. When adding or modifying components, cross-reference the Stitch screens to ensure visual fidelity.

## Token / theming system (cross-file contract)

The theming is a three-layer stack that must stay in sync:

1. **CSS custom properties** — `src/styles/globals.css` defines all colour tokens as bare HSL values (no `hsl()` wrapper) under `:root` (light) and `.dark` (dark). The `.focus-ring` utility class is also defined here.
2. **Tailwind palette** — `tailwind.config.ts` maps every token to a Tailwind colour via `hsl(var(--token-name))`. This is what lets components use classes like `bg-primary`, `text-muted-foreground`, etc. Border-radius and font families are also extended here.
3. **Runtime theme switching** — `src/hooks/useTheme.ts` toggles the `light`/`dark` class on `<html>`. It also exports `themeScript`, a small inline script meant to be injected in `<head>` to prevent flash-of-unstyled-content (FOUC) on SSR / initial load.

When adding a new colour or radius token: add the CSS variable in `globals.css`, then wire it into `tailwind.config.ts`. Don't use raw HSL literals in component classes — always go through the token layer.

## Component authoring pattern

Every component, without exception, follows this structure:

1. **CVA variants block** — defines the base class string and all variant/size options. Always exported alongside the component (e.g. `buttonVariants`) so consumers can extend or reference it.
2. **Props interface** — extends the matching native HTML attributes type (`React.ButtonHTMLAttributes<HTMLButtonElement>`, etc.) intersected with `VariantProps<typeof …Variants>`. Add `asChild?: boolean` only when the component supports polymorphic rendering via Radix `Slot`.
3. **`React.forwardRef` implementation** — destructure `className` and variant props, pass the rest with `...props`. Class string is always computed as `cn(variants({ variant, size, className }))` — `cn` is the only place class merging happens.
4. **`displayName`** — set explicitly after the component declaration.
5. **Named exports** — both the component and its variants object. No default exports anywhere in the library.

Compound components (e.g. `Card` + `CardHeader` + `CardContent`) live in a single file. Each sub-component is its own `forwardRef` with its own `displayName`. All are exported from the same file.

## Barrel-export chain

```
src/components/primitives/index.ts  →  re-exports all primitives
src/components/composite/index.ts   →  re-exports all composites
src/components/layout/index.ts      →  re-exports all layout components
src/index.ts                        →  re-exports the three above + hooks + cn
```

`src/index.ts` also has a side-effect import of `globals.css`, which is how the CSS tokens end up in the built `dist/style.css`. A new component needs to be wired into its directory's `index.ts`; it will automatically appear in the package's public surface.

## Storybook contract

- Stories live next to their component (`Button.tsx` → `Button.stories.tsx`).
- `tsconfig.lib.json` excludes `*.stories.tsx` from the declaration emit, so story files can freely import dev-only things.
- `.storybook/preview.ts` applies the theme class via a global decorator — stories automatically respond to the Storybook theme toolbar switcher. No per-story theme setup is needed.
- Tag every story with `tags: ['autodocs']` to get auto-generated docs pages.

## Release pipeline (Changesets)

Releases are managed by [Changesets](https://github.com/changesets/changesets) via `.github/workflows/version.yml`. The workflow runs on every push to `main` and operates in two modes:

### Automated flow (no manual npm commands needed)

1. **Add a changeset** — run `pnpm changeset` locally (or create a `.changeset/<name>.md` file manually). Pick a semver bump level (`patch` / `minor` / `major`) and describe the change. Commit and push to `main`.
2. **CI creates a "Version Packages" PR** — the changesets action detects the changeset file(s), runs `pnpm changeset:version` to bump `package.json` and generate `CHANGELOG.md`, and opens a PR.
3. **Merge the PR** — once merged, the action runs `pnpm release` which builds the library (`pnpm build:lib`) and publishes via `changeset publish`. It also creates a GitHub Release.

### Manual intervention needed when

- **First-time setup**: the `NPM_TOKEN` secret must be configured in the repo's GitHub Settings → Secrets → Actions. This token needs publish access to the npm package.
- **Merging the Version PR**: the "Version Packages" PR created by the bot requires a manual merge — this is the intentional approval gate before a release goes out.
- **No changeset = no release**: pushes to `main` without a `.changeset/*.md` file will not trigger a version bump or publish. The CI will still run but will log "No unpublished projects to publish" and exit successfully.

### Changeset file format

```md
---
"dark-blue": patch    # or minor / major
---

Short description of the change
```

### Key files

- `.changeset/config.json` — changesets configuration (`access: "public"`, `baseBranch: "main"`)
- `.github/workflows/version.yml` — CI workflow
- `package.json` `"release"` script — runs `pnpm build:lib && changeset publish`
- The `files` field in `package.json` is `["dist"]`, so only the built output ships.
