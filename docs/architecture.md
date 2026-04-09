# Architecture

## Repo Role

This is a **marketing and acquisition funnel website**. The backend API serves only marketing content and funnel conversion surfaces. It is not the World ID protocol backend, wallet, or identity layer — those live in the Apple/Android product repositories.

See `docs/role-and-boundary.md` for the full role definition and API boundary policy.

## Overview

This is a pnpm monorepo containing a React+Vite frontend, an Express 5 API backend, shared libraries, and a PostgreSQL database managed by Drizzle ORM.

```
┌────────────────────────────────────────────────────────────┐
│                     Browser / User                         │
└────────────────────┬───────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌────────────────────────────────────────────────────────────┐
│           artifacts/world-tfh (React + Vite)               │
│   Pages: Home, WorldID, Orb, Ecosystem, Team, TFH          │
│   Hooks: @workspace/api-client-react (Orval generated)     │
│   State: TanStack Query (caching, loading, error, retry)   │
└────────────────────┬───────────────────────────────────────┘
                     │ HTTP JSON
                     ▼
┌────────────────────────────────────────────────────────────┐
│           artifacts/api-server (Express 5)                  │
│                                                            │
│   Middleware stack (in order):                             │
│     helmet → CORS → rate-limit → body-parser → pino-http   │
│     → router → global error handler                       │
│                                                            │
│   Routes (thin handlers)                                   │
│     /api/healthz  /api/stats  /api/ecosystem               │
│     /api/orb  /api/locations  /api/team  /api/newsletter   │
│                                                            │
│   Services (business logic)                                │
│     stats.service  ecosystem.service  orb.service          │
│     team.service  newsletter.service                       │
│                                                            │
│   Error envelope: { error: string, code: string }          │
└────────────────────┬───────────────────────────────────────┘
                     │ Drizzle ORM
                     ▼
┌────────────────────────────────────────────────────────────┐
│               PostgreSQL 16                                 │
│                                                            │
│   Tables:                                                  │
│     global_stats          — live network metrics           │
│     orb_hardware          — device specs + features        │
│     orb_locations         — global deployment map          │
│     ecosystem_apps        — World ID integrations          │
│     team_members          — leadership profiles            │
│     newsletter_subscribers — email signups                 │
└────────────────────────────────────────────────────────────┘
```

## Shared Libraries

```
lib/
  api-spec/           OpenAPI 3.1 source of truth (openapi.yaml)
  api-client-react/   Generated React Query hooks (Orval → never edit)
  api-zod/            Generated Zod validators (Orval → never edit)
  db/                 Drizzle schema, migrations, seed
```

The API contract is the **single source of truth**:

1. Edit `lib/api-spec/openapi.yaml`
2. Run codegen → updates `lib/api-client-react/` and `lib/api-zod/`
3. CI blocks merges if generated files drift from the spec

## Request Lifecycle

```
Browser
  → useXxx() hook (React Query)
  → Orval-generated fetcher
  → fetch(BASE_URL + "/api/...")
  → Express router
  → [helmet] [CORS] [rate-limit] [json parser]
  → Route handler
  → Service function
  → Drizzle ORM query
  → PostgreSQL
  ← Result row(s)
  ← Service returns typed object
  ← Route calls res.json(data)
  ← React Query caches + delivers
  → ApiState<T> component renders children(data)
```

## Error Handling

All errors flow through `src/lib/errors.ts`:

```typescript
// Thrown by services
throw new AppError("NOT_FOUND", "Resource not found", 404);

// Caught by global handler in app.ts
res.status(err.status).json(toErrorResponse(err));
// → { error: "Resource not found", code: "NOT_FOUND" }
```

Frontend `ApiState<T>` handles the three states:
- `isLoading=true` → skeleton placeholders
- `isError=true` → error message + "Try again" button (calls `refetch`)
- `data` present → render children with typed data

## Security Layers

| Layer | Implementation |
|---|---|
| HTTPS | Managed by Replit runtime |
| Security headers | `helmet()` |
| CORS | Allowlist via `ALLOWED_ORIGINS` env var |
| Rate limiting | `express-rate-limit` — 120 req/min per IP |
| Request size | 64 KB body limit |
| Input validation | Zod schemas via `@workspace/api-zod` |
| Error leakage | Global handler strips stack traces in production |

## Database Management

Schema changes follow this flow:

**Development (fast iteration)**
```bash
pnpm --filter @workspace/db run push  # applies schema changes directly
pnpm --filter @workspace/db run seed  # resets seed data (idempotent)
```

**Production (versioned migrations)**
```bash
pnpm --filter @workspace/db run generate  # creates migration file in lib/db/migrations/
pnpm --filter @workspace/db run migrate   # applies pending migration files
```

The seed script (`lib/db/src/seed.ts`) is fully deterministic — it deletes existing rows and re-inserts in a fixed order, making it safe to run any number of times.
