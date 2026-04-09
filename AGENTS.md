# AGENTS.md — Guidelines for AI Agents

## Repo Role

This repository is the **marketing and acquisition funnel website** for World and Tools for Humanity.

**Primary responsibilities:**
1. Attract Orb operators and agents (hardware deployment funnel)
2. Convert end users toward the World App on iOS/Android
3. Present the ecosystem of apps using World ID
4. Serve as a potential developer-facing entry point (routing to external docs)

**This is NOT:**
- A wallet backend
- An identity verification backend
- A World ID protocol implementation
- A developer API portal (the core product APIs live in the Apple/Android product repos)

**Source-of-truth rule:** The Apple/Android product repositories own the core identity and wallet backend. This website must not become a parallel identity backend. If you are tempted to add user auth, credential issuance, identity proofs, or verification flows to this repo — stop. Those belong in the product repos.

## Repository Overview

pnpm monorepo. React + Vite frontend, Express 5 content API, PostgreSQL via Drizzle ORM.

```
artifacts/
  api-server/       ← Express 5 content/marketing API (routes, services, middleware)
  world-tfh/        ← React + Vite marketing frontend
lib/
  api-spec/         ← OpenAPI spec + Orval codegen config
  api-client-react/ ← Generated React Query hooks (DO NOT EDIT MANUALLY)
  api-zod/          ← Generated Zod schemas (DO NOT EDIT MANUALLY)
  db/               ← Drizzle ORM schema, migrations, seed script
docs/
  architecture.md       ← System design and request lifecycle
  role-and-boundary.md  ← Detailed role definition and API boundary policy
reports/
  final-audit.md    ← Role audit, developer surface assessment, and decision memo
```

## Content/API Boundary Policy

The website API surface is **limited to marketing and funnel content**:

| Allowed | Not Allowed |
|---|---|
| Global network stats (display-only) | Identity verification endpoints |
| Ecosystem app directory | Wallet or credential issuance |
| Orb hardware specs and locations | Authentication / session management |
| Team member bios | Transaction signing |
| Newsletter email capture | World ID proof generation/validation |
| Health check | Any core protocol logic |

If a proposed endpoint doesn't fit the "marketing content or funnel conversion" test, it belongs in a product repo, not here.

## Funnel Pathways

Every page should have a clear conversion intent:

- **End users** → World App download (App Store / Google Play)
- **Orb operators** → Operator program signup / contact
- **Developers** → `/developers` page → external protocol docs and GitHub
- **Ecosystem builders** → Ecosystem listing form / World ID integration docs

## Critical Implementation Rules

1. **Never edit generated files** in `lib/api-client-react/` or `lib/api-zod/`. Run codegen after changing the spec: `pnpm --filter @workspace/api-spec run codegen`.

2. **OpenAPI is the content API contract.** Any new endpoint must be documented in `lib/api-spec/openapi.yaml` first, pass the boundary policy above, then be implemented.

3. **Route handlers must be thin.** Business logic belongs in `artifacts/api-server/src/services/`. Route handlers validate input, call a service, and return the result.

4. **Use the standard error envelope.** All API errors must go through `toErrorResponse()` from `lib/errors.ts`. Shape: `{ error: string, code: string }`.

5. **No hardcoded data in route handlers.** All content comes from the database or documented seed data.

6. **Frontend error states.** Every data-fetching page uses `<ApiState>` from `@/components/ui/ApiState` for loading / error+retry / empty states.

7. **Import hooks from `@workspace/api-client-react`**, not from relative paths.

## Adding a New Content API Endpoint

1. Verify the endpoint is in scope (marketing content / funnel conversion)
2. Add path + schema to `lib/api-spec/openapi.yaml`
3. Run `pnpm --filter @workspace/api-spec run codegen`
4. Create `artifacts/api-server/src/services/<feature>.service.ts`
5. Create `artifacts/api-server/src/routes/<feature>.ts`
6. Register the router in `artifacts/api-server/src/routes/index.ts`
7. Use the generated hook in the frontend page

## Adding a New Page

1. Create `artifacts/world-tfh/src/pages/MyPage.tsx`
2. Add the route in `artifacts/world-tfh/src/App.tsx`
3. Include a clear funnel CTA (what should the user do next?)
4. Use `<ApiState>` for any API-driven content

## Testing

```bash
pnpm --filter @workspace/api-server run test   # API integration tests
pnpm --filter @workspace/world-tfh run test    # Frontend smoke tests
pnpm run typecheck                             # Full TypeScript check
```

## Environment

See `.env.example` for required environment variables. `DATABASE_URL` is mandatory. Never commit `.env` or any secrets.

## What Is Seeded / Demo Data

- Stats (`global_stats` table) are seed data; not live-connected to on-chain data
- Ecosystem app listings are editorial/seeded; not pulled from a live registry
- Team member avatars are placeholder images
- Newsletter subscribers are persisted to DB but no email delivery is wired

## What Is Real

- All content is DB-backed (no hardcoded data in route handlers)
- API endpoints are Zod-validated via generated schemas
- Newsletter subscriber emails are persisted to PostgreSQL
- Security: helmet, CORS allowlist, rate limiting, 64kb body size limit are all active
