# base

A monorepo starter template for building full-stack web applications with modern tooling.

## What's inside

- **TanStack Start** — full-stack React framework with SSR (Nitro)
- **StyleX** — compile-time atomic CSS with type-safe tokens
- **Base UI** — headless, accessible React components
- **motion.dev** — production-grade animations
- **Drizzle ORM** — type-safe PostgreSQL access
- **Biome** — fast linting and formatting

## Structure

```
apps/web/           → TanStack Start application
packages/ui/        → Styled component library (Base UI + StyleX + motion)
packages/db/        → Drizzle ORM + PostgreSQL
packages/canvas/    → Optional React Three Fiber setup
```

## Getting started

```bash
# Install dependencies
pnpm install

# Start local database
docker compose -f docker-compose.dev.yml up -d

# Copy environment variables
cp .env.example .env

# Run database migrations
pnpm db:migrate

# Start dev server
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Deployment

Built for self-hosting via Docker on Hetzner with Dokploy. Push to `main` to deploy.

```bash
# Build and run production locally
docker compose up --build
```

## License

MIT
