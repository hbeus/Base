# base

## Stack

- **Framework**: TanStack Start (SSR via Nitro) + TanStack Router (folder-based) + TanStack React Query
- **Styling**: StyleX (compile-time atomic CSS)
- **UI primitives**: Base UI (`@base-ui/react`) — headless, unstyled
- **Component library**: `@base/ui` — styled atoms (Base UI + StyleX + motion)
- **Animation**: motion.dev (`motion/react`)
- **State**: Zustand (client UI state), React Query (server state), TanStack Router search params (URL state)
- **Database**: Drizzle ORM + PostgreSQL (pgvector)
- **Icons**: Iconify (`@iconify/react` + `@iconify-json/lucide`)
- **Hooks**: `@uidotdev/usehooks`
- **Parameter tweaking**: DialKit
- **3D** (optional): React Three Fiber + drei (`@base/canvas`)
- **Linting/formatting**: Biome
- **Testing**: Vitest
- **Runtime**: Node 22, pnpm 11

## Architecture

```
base/
├── apps/web/                   ← TanStack Start app
│   └── src/
│       ├── components/         ← molecules (composed atoms, reusable across pages)
│       ├── features/           ← domain-grouped feature components
│       │   └── {domain}/       ← e.g. features/stock/
│       │       ├── Component/
│       │       ├── queries.ts  ← co-located React Query key factory + queryOptions
│       │       └── hooks/
│       ├── hooks/              ← app-wide shared hooks
│       ├── lib/                ← utilities, clients, helpers
│       ├── providers/          ← React context providers
│       ├── routes/             ← folder-based file routing
│       ├── server/             ← server functions (createServerFn)
│       ├── store/              ← Zustand stores
│       ├── styles/             ← global CSS
│       └── types/              ← shared TypeScript types
├── packages/ui/                ← styled component library (atoms)
│   └── src/
│       ├── components/         ← Button/, Dialog/, Input/, Toggle/
│       └── tokens/             ← colors, typography, spacing, radii
├── packages/db/                ← Drizzle ORM + Postgres
├── packages/canvas/            ← optional R3F + drei + DialKit
├── docker-compose.yml          ← production (Dokploy)
├── docker-compose.dev.yml      ← Postgres for local dev
└── Dockerfile                  ← multi-stage, Node 22-alpine
```

## Component conventions

### Hierarchy: atoms → molecules → features

| Layer    | Location               | Rule                                                        | Example                          |
|----------|------------------------|-------------------------------------------------------------|----------------------------------|
| Atoms    | `packages/ui/`         | Primitive building blocks, no business logic, max reusable  | `Button/`, `Input/`, `Dialog/`   |
| Molecules| `components/`          | Composed atoms, reusable across pages, minimal biz logic    | `UserCard/`, `SearchBar/`        |
| Features | `features/{domain}/`   | Page/domain-specific, contains business logic, not reusable | `features/stock/StockChart/`     |

**Rule of thumb**: if you'd copy it into a different project, it's a molecule. If it only makes sense in this app's domain, it's a feature.

### Compound component pattern

All UI components use the compound component pattern:

```tsx
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Content>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### Variant props

Atoms support variant and size props via StyleX's native conditional composition:

```tsx
<Button variant="secondary" size="lg">Click me</Button>
```

Variants are implemented as StyleX style objects keyed by variant name — no CVA, no className strings.

### File structure

Every component that returns JSX uses a **PascalCase directory + `index.tsx`**:

```
Button/
└── index.tsx
```

Sub-components live as siblings when they exceed ~30 lines or are reused.

## Naming conventions

| Category           | Convention                | Example                              |
|--------------------|---------------------------|--------------------------------------|
| JSX components     | PascalCase dir + index.tsx| `Button/index.tsx`, `UserCard/index.tsx` |
| Lib/utility files  | kebab-case                | `auth-client.ts`, `format-date.ts`   |
| Server modules     | kebab-case                | `user-queries.ts`                    |
| Routes             | folder-based              | `routes/showcase/$id.tsx`            |
| Top-level src dirs | kebab-case                | `components/`, `features/`, `hooks/` |
| Stores             | kebab-case                | `app-store.ts`                       |
| TypeScript alias   | `~/*` → `./src/*`        | `import { Button } from '~/components/ui/button'` |

## StyleX conventions

- Use `stylex.create()` for all styles — no inline styles, no external CSS (except global reset)
- Use design tokens from `@base/ui/tokens/*` — never hardcode colors, spacing, or typography values
- Variants use StyleX conditional composition: `stylex.props(styles.base, styles[variant])`
- Theme switching uses `stylex.props(lightTheme)` on `<html>` — applied server-side via cookie in `beforeLoad`

## React Query conventions

- Co-locate query key factories with their feature: `features/{domain}/queries.ts`
- Use the key factory pattern:

```ts
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: Filters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};
```

- Use `queryOptions()` to define reusable query option objects
- Server data fetching uses TanStack Start server functions (`createServerFn`)

## Commands

```bash
# Development
pnpm dev                    # Start dev server (port 3000)
docker compose -f docker-compose.dev.yml up -d  # Start local Postgres

# Building
pnpm build                  # Build for production
pnpm start                  # Start production server

# Database
pnpm db:generate            # Generate Drizzle migrations
pnpm db:migrate             # Run migrations
pnpm db:studio              # Open Drizzle Studio

# Code quality
pnpm lint                   # Check with Biome
pnpm lint:fix               # Auto-fix lint issues
pnpm format                 # Format with Biome
pnpm test                   # Run Vitest
```

## Agent resources

### motion.dev

Use the `/motion` skill or motion MCP tools for up-to-date API docs, import patterns, and examples. Do NOT rely on training data for motion.dev APIs — always consult the skill/MCP for current documentation.

Import from `motion/react`:
```tsx
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
```

### Dokploy MCP

The Dokploy MCP connects to the Dokploy instance on the Hetzner VPS. Use it for:
- Deploying applications
- Checking deployment status and logs
- Managing environment variables
- Viewing container state

### Figma MCP

Use the Figma MCP for design-to-code and code-to-design workflows. Always invoke the `/figma-use` skill before calling `use_figma`.

## Deployment

- **Host**: Hetzner VPS (Ubuntu 24.04), accessible via `ssh hetzner`
- **Orchestration**: Dokploy v0.29.4+ with Traefik reverse proxy
- **Deploy method**: Dokploy watches the `main` branch — push to deploy
- **Container**: Multi-stage Docker build, Node 22-alpine
- **Database**: PostgreSQL (pgvector/pg17) as Docker container on Hetzner
- **Production compose**: `docker-compose.yml` includes both web app and Postgres

## Security

- `minimumReleaseAge: 10080` in `pnpm-workspace.yaml` — packages must be published for at least 7 days before installation
- Never commit `.env` files — use `.env.example` as reference
- All env vars for production are managed via Dokploy
