# AGENTS.md — Guidelines for AI Agents

This file guides AI agents (Replit Agent, Cursor, Copilot Workspace, etc.) working on this repository.

## Repository Overview

Full-stack replica of world.org and toolsforhumanity.com. pnpm monorepo with a React+Vite frontend and Express API backend backed by PostgreSQL.

```
artifacts/
  api-server/     ← Express 5 backend (routes, services, middleware)
  world-tfh/      ← React + Vite frontend
lib/
  api-spec/       ← OpenAPI spec + Orval codegen config
  api-client-react/ ← Generated React Query hooks (DO NOT EDIT MANUALLY)
  api-zod/        ← Generated Zod schemas (DO NOT EDIT MANUALLY)
  db/             ← Drizzle ORM schema, migrations, seed script
```

## Critical Rules

1. **Never edit generated files** in `lib/api-client-react/` or `lib/api-zod/`. These are auto-generated from `lib/api-spec/openapi.yaml`. Always run codegen after changing the spec: `pnpm --filter @workspace/api-spec run codegen`.

2. **OpenAPI is the contract**. Any new API endpoint must be documented in `lib/api-spec/openapi.yaml` first, codegen run, then the route implemented.

3. **Route handlers must be thin**. Business logic belongs in `artifacts/api-server/src/services/`. Route handlers validate input, call a service, and return the result.

4. **Use the standard error envelope**. All API errors must go through `toErrorResponse()` from `lib/errors.ts`. The shape is `{ error: string, code: string }` with the HTTP status set on the response.

5. **No hardcoded data in route handlers**. All content must come from the database. Use the seed script to manage seed data.

6. **Database changes**: Update `lib/db/src/schema/` → run `pnpm --filter @workspace/db run push` (dev) or `generate` + `migrate` (production-style). Update the seed script if seed data needs to change.

7. **Frontend error states**: Every data-fetching page must use `<ApiState>` from `@/components/ui/ApiState` to handle loading, error, empty, and retry states.

8. **Import hooks from `@workspace/api-client-react`**, never from relative paths.

## Adding a New API Endpoint

1. Add the path and schema to `lib/api-spec/openapi.yaml`
2. Run `pnpm --filter @workspace/api-spec run codegen`
3. Create `artifacts/api-server/src/services/<feature>.service.ts` with the business logic
4. Create or update `artifacts/api-server/src/routes/<feature>.ts` — thin handler only
5. Register the router in `artifacts/api-server/src/routes/index.ts`
6. Use the generated hook in the frontend page

## Adding a New Page

1. Create `artifacts/world-tfh/src/pages/MyPage.tsx`
2. Add the route in `artifacts/world-tfh/src/App.tsx`
3. Use `<ApiState>` for any API-driven content

## Testing

- API tests: `pnpm --filter @workspace/api-server run test`
- Frontend smoke tests: `pnpm --filter @workspace/world-tfh run test`
- Full typecheck: `pnpm run typecheck`

## Environment

See `.env.example` for required environment variables. `DATABASE_URL` is mandatory for the API server to start.

## What Is Mocked / Placeholder

- Team member avatar images use seeded placeholder photos (no real photos of actual people)
- Stats are representative seed data, not live-updated
- Newsletter subscriptions store to DB but do not send actual emails

## What Is Real

- All content is DB-backed (no hardcoded data in routes)
- API endpoints are contract-validated via generated Zod schemas
- Newsletter subscribers are persisted to PostgreSQL
