# World / Tools for Humanity — Marketing Website

This is the **marketing and acquisition funnel website** for World and Tools for Humanity. Its job is to attract Orb providers, convert end users into the World App (iOS/Android), and present the ecosystem and brand.

**This is not the core wallet or identity backend.** The Apple and Android product repositories are the source of truth for identity verification, wallet logic, and the World ID protocol implementation. This website backend serves only marketing content, funnel analytics surfaces, and acquisition flows (newsletter, ecosystem directory, Orb location map).

> **Handoffs:** Users are directed to [World App on the App Store](https://apps.apple.com/app/world-app/id1560859277) and [Google Play](https://play.google.com/store/apps/details?id=com.worldcoin) for the actual product experience.

## What's Inside

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 7, Tailwind CSS v4, Framer Motion |
| Backend | Express 5, Pino logging |
| Database | PostgreSQL 16 + Drizzle ORM |
| API contract | OpenAPI 3.1 → Orval codegen (React Query hooks + Zod schemas) |
| Security | Helmet, CORS allowlist, rate limiting |
| Testing | Vitest + Supertest (API) · Vitest + Testing Library (frontend) |
| CI | GitHub Actions (typecheck, codegen drift, tests) |
| Monorepo | pnpm workspaces |

## Quick Start

### Prerequisites

- Node.js 24+
- pnpm 10+
- PostgreSQL 16 (or use the Replit built-in database)

### Setup

```bash
# 1. Clone and install
git clone <repo>
pnpm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# 3. Set up the database
pnpm --filter @workspace/db run push   # apply schema
pnpm --filter @workspace/db run seed   # load seed data

# 4. Start everything
pnpm dev
```

The frontend is served at `http://localhost:5173` and the API at `http://localhost:8080/api`.

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start all services concurrently (frontend + API) |
| `pnpm run typecheck` | Full TypeScript check across all packages |
| `pnpm run build` | Production build |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API hooks from OpenAPI spec |
| `pnpm --filter @workspace/db run push` | Apply schema changes to the database |
| `pnpm --filter @workspace/db run generate` | Generate versioned migration files |
| `pnpm --filter @workspace/db run migrate` | Run pending migrations |
| `pnpm --filter @workspace/db run seed` | Deterministically seed all tables |
| `pnpm --filter @workspace/api-server run test` | API integration tests |
| `pnpm --filter @workspace/world-tfh run test` | Frontend smoke tests |

## Pages

| Route | Description |
|---|---|
| `/` | world.org homepage — hero, stats, World ID overview, ecosystem |
| `/world-id` | World ID protocol — how it works, verification flow |
| `/ecosystem` | Filterable grid of apps using World ID |
| `/tools-for-humanity` | TFH company page — mission, about |
| `/orb` | Orb hardware — specs, privacy approach, global deployment map |
| `/team` | Leadership team |
| `/developers` | Developer handoff — links to protocol docs, GitHub, and product apps |

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Path | Description |
|---|---|---|
| GET | `/healthz` | Health check |
| GET | `/stats` | Global network statistics |
| GET | `/ecosystem` | List ecosystem apps |
| GET | `/orb` | Orb hardware info (DB-backed) |
| GET | `/locations` | Orb deployment locations worldwide |
| GET | `/team` | Team members |
| POST | `/newsletter` | Subscribe to newsletter |

## Architecture

See [docs/architecture.md](docs/architecture.md) for a detailed overview of the system design, data flow, and service boundaries.

## Environment Variables

See [.env.example](.env.example) for the full list of required and optional environment variables.

## Database

The database schema is managed by Drizzle ORM. Tables:

- `global_stats` — Live network metrics
- `orb_hardware` — Orb device specs (DB-backed, previously hardcoded)
- `orb_locations` — Global deployment locations
- `ecosystem_apps` — Apps integrating World ID
- `team_members` — Leadership team
- `newsletter_subscribers` — Email signups

## Content Updates

All content is database-driven. To update content, either:
1. Edit the seed script at `lib/db/src/seed.ts` and re-run `pnpm --filter @workspace/db run seed`
2. Connect to the database directly and update rows

## Contributing

1. Branch from `main`
2. Make changes — backend routes go in `artifacts/api-server/src/routes/`, services in `src/services/`
3. If you change the OpenAPI spec (`lib/api-spec/openapi.yaml`), run codegen before committing
4. Run `pnpm run typecheck` and tests before opening a PR
5. CI will block merges with codegen drift or failing tests
