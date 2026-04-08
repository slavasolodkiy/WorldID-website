# AGENTS.md

## Mission
This repository is a web replication project inspired by the World ID / Worldcoin website direction.

Your role is to evaluate, improve, and extend this codebase as a serious reusable web product foundation, not as a superficial visual clone.

## Repository Overview
Full-stack replica of world.org and toolsforhumanity.com. pnpm monorepo with a React + Vite frontend and Express API backend backed by PostgreSQL.

```text
artifacts/
  api-server/       ← Express 5 backend (routes, services, middleware)
  world-tfh/        ← React + Vite frontend
lib/
  api-spec/         ← OpenAPI spec + Orval codegen config
  api-client-react/ ← Generated React Query hooks (DO NOT EDIT MANUALLY)
  api-zod/          ← Generated Zod schemas (DO NOT EDIT MANUALLY)
  db/               ← Drizzle ORM schema, migrations, seed script
  
## Priority goals
Maximize architectural clarity
Improve reuse and maintainability
Distinguish real implementation from mock/demo behavior
Identify missing flows and weak spots
Keep recommendations concrete and evidence-based

## What good looks like

A strong result should move this repo toward:

a reusable website codebase
clean component structure
production-friendly configuration
explicit content and page architecture
scalable frontend patterns
safe secret handling
realistic forms, validations, states, and integration boundaries
## Critical implementation rules
Never edit generated files in lib/api-client-react/ or lib/api-zod/. These are auto-generated from lib/api-spec/openapi.yaml. Always run codegen after changing the spec:
pnpm --filter @workspace/api-spec run codegen
OpenAPI is the contract. Any new API endpoint must be documented in lib/api-spec/openapi.yaml first, codegen run, then the route implemented.
Route handlers must be thin. Business logic belongs in artifacts/api-server/src/services/. Route handlers validate input, call a service, and return the result.
Use the standard error envelope. All API errors must go through toErrorResponse() from lib/errors.ts. The shape is:
{ error: string, code: string }
No hardcoded data in route handlers. All content should come from the database or documented seed data.
Database changes: update schema first, then run the proper DB commands, and update seed data when needed.
Frontend error states: every data-fetching page should use <ApiState> or an equivalent standardized pattern for loading, error, empty, and retry states.
Import generated hooks from @workspace/api-client-react, not from ad hoc relative paths.
## Audit rules

When auditing this repository:

inspect actual files, not assumptions
reference exact files, folders, and functions/components
separate findings into:
implemented
partially implemented
missing
mocked / hardcoded / placeholder-based
unclear
be skeptical and specific
do not over-credit polished UI if logic is shallow
## Web-specific review focus

Pay special attention to:

overall information architecture
page hierarchy and routing
section-by-section completeness
consistency of messaging and terminology
component reusability
responsive behavior
loading / empty / error / success states
forms and validation
analytics/event instrumentation readiness
SEO/metadata readiness
accessibility basics
asset and content organization
## Reuse expectations

Prefer:

modular reusable UI components
separation of content, presentation, and configuration
centralized constants/config
explicit env usage
documented setup
clean naming
minimal duplication

Avoid:

one-off hacks
hardcoded secrets
hardcoded URLs when env/config is better
tightly coupled page logic
duplicated UI sections without abstraction
fake completeness
## Adding a New API Endpoint
Add the path and schema to lib/api-spec/openapi.yaml
Run pnpm --filter @workspace/api-spec run codegen
Create artifacts/api-server/src/services/<feature>.service.ts
Create or update artifacts/api-server/src/routes/<feature>.ts
Register the router in the route index
Use the generated hook in the frontend
## Adding a New Page
Create the page component
Register the route
Use the standard API state handling pattern for API-driven content
## Testing
API tests: pnpm --filter @workspace/api-server run test
Frontend tests: pnpm --filter @workspace/world-tfh run test
Full typecheck: pnpm run typecheck
## Environment

See .env.example for required environment variables. Secrets must never be committed.

## Secrets and safety

Never expose or preserve:

database credentials
API keys
bearer tokens
secret endpoints
production secrets in source files
plaintext passwords in code or docs

If found:

flag them clearly
move them to environment variables
update .env.example
recommend secret rotation if exposed
## What is mocked / placeholder
Team member avatar images may use placeholder photos
Stats may be seeded/demo data rather than live-updated
Newsletter or similar flows may persist data without full external delivery integrations
## What is real
DB-backed content and API flows should be preferred over hardcoded route payloads
Contract-validated endpoints are preferred where generated schemas/hooks are in use
Persisted data flows should be documented clearly
## Output format

When asked to review or improve this repo, structure the output as:

Executive summary
Actual stack and architecture
Replication depth assessment
Implemented vs partial vs missing
Mocked / hardcoded / risky areas
Reuse blockers
Production-readiness blockers
Prioritized backlog:
critical
important
nice-to-have
Best next prompt for Replit
## Editing rules

Unless explicitly asked:

do not make broad redesigns
do not rewrite the whole project unnecessarily
do not add heavy dependencies without justification

When editing:

prefer small high-value changes
preserve working behavior
explain tradeoffs
keep diffs readable