# Workspace

## Overview

Full-stack replica of the World (world.org) and Tools for Humanity (toolsforhumanity.com) websites. pnpm workspace monorepo using TypeScript.

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

## Artifacts

### `world-tfh` (React + Vite, preview: `/`)
Replica of world.org and toolsforhumanity.com. Pages:
- `/` — world.org homepage with hero, stats, World ID section, ecosystem
- `/tools-for-humanity` — TFH company mission, team CTAs
- `/orb` — Orb hardware page with specs, images, privacy messaging, deployment map
- `/world-id` — World ID protocol page
- `/ecosystem` — Ecosystem apps grid with category filtering
- `/team` — Team member cards

### `api-server` (Express 5, preview: `/api`)
Backend API with routes:
- `GET /api/healthz` — Health check
- `GET /api/stats` — Global World network stats
- `GET /api/ecosystem` — List ecosystem apps
- `GET /api/orb` — Orb hardware info
- `GET /api/locations` — Orb deployment locations worldwide
- `GET /api/team` — Team members
- `POST /api/newsletter` — Newsletter email subscription

## Database Schema (PostgreSQL)
- `global_stats` — Verified humans, countries, ecosystem apps, orbs, daily verifications
- `ecosystem_apps` — Apps using World ID (name, category, featured flag)
- `team_members` — Leadership team (name, role, bio, avatar)
- `orb_locations` — Global Orb deployment locations (city, country, lat/lng)
- `newsletter_subscribers` — Email subscriptions

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
