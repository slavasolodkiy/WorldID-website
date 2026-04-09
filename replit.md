# Workspace

## Overview

**Marketing and acquisition funnel website** for World and Tools for Humanity. Its job is to attract Orb operators, convert end users toward the World App (iOS/Android), and surface the ecosystem and team. The backend API serves only marketing content and funnel conversion surfaces — it is not the World ID identity/wallet backend (those live in the Apple/Android product repositories).

pnpm workspace monorepo using TypeScript. Production-hardened with security middleware, service layers, DB-backed content, standardized error envelopes, and a CI pipeline.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, Tailwind CSS, Framer Motion
- **Routing**: Wouter
- **Security**: helmet, CORS allowlist, express-rate-limit (120 req/min), 64kb body limit
- **Testing**: Vitest + Supertest (API), Vitest + Testing Library (frontend)
- **CI**: GitHub Actions (typecheck, codegen drift, DB push+seed, tests)

## Artifacts

### `world-tfh` (React + Vite, preview: `/`)
Replica of world.org and toolsforhumanity.com. Pages:
- `/` — world.org homepage with hero, stats, World ID section, ecosystem
- `/tools-for-humanity` — TFH company mission, team CTAs
- `/orb` — Orb hardware page with specs, images, privacy messaging, deployment map
- `/world-id` — World ID protocol page
- `/ecosystem` — Ecosystem apps grid with category filtering
- `/team` — Team member cards

All data-fetching pages use `<ApiState>` (`src/components/ui/ApiState.tsx`) for loading skeleton / error+retry / empty states.

Pages include a `/developers` handoff page that orients developers and links them to external protocol docs and product repos.

**Funnel Architecture (all three routes implemented):**
- End users → App Store / Google Play CTAs on homepage hero, WorldID hero+steps, Navbar "Get App", Footer
- Operators & Agents → `/orb#become-operator` section with Apply + Find Orb links, Navbar "Operators" (TFH), Home funnel card, TFH hero
- Developers → `/developers` page, Navbar "Developers" (World), WorldID bottom, TFH software section, Footer

**Analytics (`src/lib/analytics.ts`):**  
Typed `FunnelEvent` catalog + `track()` utility. Pushes to `window.dataLayer` (GTM) in production; console-logs in development. Events: `cta_app_store_click`, `cta_google_play_click`, `cta_become_operator_click`, `cta_developer_docs_click`, `cta_github_click`, `orb_location_viewed`, `ecosystem_app_click`, `ecosystem_filter_changed`, `newsletter_subscribe_*`, `nav_link_click`.

See `reports/funnel-audit.md` for complete change manifest.

### `api-server` (Express 5, preview: `/api`)
Backend API with routes:
- `GET /api/healthz` — Health check
- `GET /api/stats` — Global World network stats
- `GET /api/ecosystem` — List ecosystem apps
- `GET /api/orb` — Orb hardware info (DB-backed via `orb_hardware` table)
- `GET /api/locations` — Orb deployment locations worldwide
- `GET /api/team` — Team members
- `POST /api/newsletter` — Newsletter email subscription

Route handlers are thin; all business logic lives in `src/services/`.
All errors use `AppError` → `toErrorResponse()` from `src/lib/errors.ts`.

## Database Schema (PostgreSQL)
- `global_stats` — Verified humans, countries, ecosystem apps, orbs, daily verifications
- `orb_hardware` — Orb device specs (jsonb) and features (jsonb) — DB-backed, no longer hardcoded
- `ecosystem_apps` — Apps using World ID (name, category, featured flag)
- `team_members` — Leadership team (name, role, bio, avatar)
- `orb_locations` — Global Orb deployment locations (city, country, lat/lng)
- `newsletter_subscribers` — Email subscriptions

## Key Commands

- `pnpm dev` — Start API + frontend concurrently (local dev)
- `pnpm test` — Run all test suites
- `pnpm run typecheck` — Full typecheck across all packages
- `pnpm run build` — Typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — Regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — Push DB schema changes (dev only)
- `pnpm --filter @workspace/db run generate` — Generate versioned migration files
- `pnpm --filter @workspace/db run migrate` — Run pending migrations
- `pnpm --filter @workspace/db run seed` — Deterministically seed all tables (idempotent)
- `pnpm --filter @workspace/api-server run test` — API integration tests
- `pnpm --filter @workspace/world-tfh run test` — Frontend smoke tests

## Docs
- `README.md` — Quick start, commands, API reference, contributing guide
- `AGENTS.md` — Rules for AI agents — includes source-of-truth rule and content/API boundary policy
- `docs/architecture.md` — System design, request lifecycle, error handling, security, DB management
- `docs/role-and-boundary.md` — Detailed repo role definition, API boundary policy, funnel architecture
- `reports/final-audit.md` — Role audit, API boundary audit, developer surface decision memo, backlog
- `.env.example` — All required + optional environment variables with descriptions

## CI
`.github/workflows/ci.yml` runs on every push/PR to `main`:
1. Typecheck (libs then all artifacts)
2. Codegen drift check (blocks merge if generated files are out of sync)
3. DB push + seed (using test PostgreSQL service)
4. API integration tests (10 assertions across 7 endpoints)
5. Frontend smoke tests (5 assertions for `ApiState` component states)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
