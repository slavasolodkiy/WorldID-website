# Website Role & Developer Surface Decision Memo

**Date:** April 2026  
**Repo:** slavasolodkiy/WorldID-website  
**Branch:** main / baseline commit: dfd6852  

---

## 1. Role Clarification Audit

### Finding: Role Was Ambiguous in Docs

The previous README called this a "full-stack replica" and "production-leaning reference application." AGENTS.md called it "a web replication project." Neither explicitly stated the marketing/funnel purpose or the boundary against core product logic.

**Corrected:** README, AGENTS.md, docs/role-and-boundary.md, openapi.yaml, and docs/architecture.md now all lead with the marketing/funnel framing and include explicit "not a wallet/identity backend" statements.

### Repo Role (Confirmed)

**This repo's job:**
1. Attract Orb operators and agents (hardware deployment funnel)
2. Convert end users into the World App (iOS/Android download CTAs)
3. Surface the ecosystem of apps using World ID
4. Serve as an entry/handoff point for developers → external protocol docs

**Not this repo's job:** Identity verification, credential issuance, wallet logic, World ID proof generation, user authentication, on-chain reads, SDK distribution.

---

## 2. API Boundary Audit

### Current Endpoints (7 total)

| Endpoint | Scope Assessment | Status |
|---|---|---|
| `GET /api/healthz` | Infrastructure | ✅ In scope |
| `GET /api/stats` | Display-only network stats | ✅ In scope |
| `GET /api/ecosystem` | Curated editorial directory | ✅ In scope |
| `GET /api/orb` | Hardware marketing content | ✅ In scope |
| `GET /api/locations` | Orb deployment map (marketing) | ✅ In scope |
| `GET /api/team` | Editorial team bios | ✅ In scope |
| `POST /api/newsletter` | Email acquisition | ✅ In scope |

**Assessment: No drift detected.** All endpoints are cleanly within the marketing/content scope. There are no identity, wallet, auth, or transaction endpoints.

### Database Schema (6 tables)

| Table | Scope Assessment | Status |
|---|---|---|
| `global_stats` | Display-only counters | ✅ In scope |
| `orb_hardware` | Marketing content (jsonb specs) | ✅ In scope |
| `orb_locations` | Location map data | ✅ In scope |
| `ecosystem_apps` | Editorial directory | ✅ In scope |
| `team_members` | Editorial bios | ✅ In scope |
| `newsletter_subscribers` | Email capture | ✅ In scope |

**Assessment: No drift detected.** No credential, identity, wallet, or auth tables exist.

---

## 3. Developer-Facing Surface Inventory

### What Exists Today

| Resource | Status |
|---|---|
| `/api/healthz` endpoint | Exists (internal infra) |
| OpenAPI spec (`lib/api-spec/openapi.yaml`) | Exists (content API only) |
| `/developers` landing page | **Added in this audit** |
| SDK documentation | Missing |
| World ID integration guide | Missing |
| API authentication docs | Missing (content API is unauthenticated) |
| Sandbox / staging environment | Missing |
| Developer onboarding flow | Missing |
| Support model / community links | Missing |
| Code examples | Missing |
| Changelog | Missing |

### What Is Missing

The website has no developer-oriented resources. All World ID integration documentation lives externally at developer.worldcoin.org. Developers who land on this website have no clear path to the technical resources they need.

---

## 4. Developer Surface Decision

### Options Evaluated

**Option A — Keep developer docs in this repo**  
Pros: Single repo to maintain. Cons: Contradicts the marketing/funnel role. Would require adding content management for technical docs, versioning, and SDK reference. Risks turning the website into a parallel developer portal alongside the Apple product repo.

**Option B — Split into a dedicated developer portal**  
Pros: Clean separation of marketing and developer surfaces. Cons: Requires setting up a new repo, CI, hosting, and content management. Significant resourcing. Makes sense at scale, not for the current team size.

**Option C — Hybrid: website has an entry page, links to external docs**  
Pros: Low effort, low risk. Gives developers a clear entry point from the marketing site. Actual technical docs live at developer.worldcoin.org and GitHub. No new infrastructure needed. Preserves this repo's marketing role. Consistent with how world.org handles it today.

### Decision: Option C — Hybrid

**Rationale:** The website is a marketing site. Technical documentation belongs at a developer portal. At current scale, that portal is developer.worldcoin.org. This repo's job is to give developers a clear handoff point — a `/developers` page that orients them and links them outward.

If a dedicated developer portal is needed in the future, it should be a separate repo. The `/developers` entry page from this website links to it.

### Implementation (Delivered)

A `/developers` page has been added at `artifacts/world-tfh/src/pages/DeveloperPage.tsx`. It includes:
- Clear positioning statement (what this site is, what it's not)
- Link to World App product (end-user funnel)
- Link to World ID protocol docs (developer.worldcoin.org)
- Link to the Apple product repo (WorldID-Apple on GitHub)
- Link to the ecosystem for builders
- Newsletter CTA

---

## 5. MVP Developer Surface Scope (What Is and Is Not Supported Now)

### Supported (via this website)

- Discovery of the World ecosystem (ecosystem directory)
- Link to World ID protocol documentation (external)
- Link to product GitHub repos
- Newsletter updates

### Not Supported (out of scope for this repo)

- SDK download or distribution
- API authentication or API keys
- Sandbox environment
- World ID integration tutorials
- Test credentials
- Support ticketing

These belong in the product repos and/or a future dedicated developer portal.

---

## 6. Readiness Assessment

| Check | Status |
|---|---|
| TypeScript — compiles | ✅ Healthy |
| API integration tests (10) | ✅ All pass |
| Frontend smoke tests (5) | ✅ All pass |
| CI pipeline (GitHub Actions) | ✅ Configured (.github/workflows/ci.yml) |
| Codegen drift check in CI | ✅ Active |
| Security headers (helmet) | ✅ Active |
| CORS allowlist | ✅ Active |
| Rate limiting | ✅ 120 req/min |
| Error envelope | ✅ Standardized |
| Seed script (idempotent) | ✅ Confirmed |
| `.env.example` | ✅ Present |

**No blocking readiness issues.** The codebase is in a healthy state.

---

## 7. Backlog

### Critical (do now)

- [x] Reframe all docs to marketing/funnel role *(done in this audit)*
- [x] Add `/developers` handoff page *(done in this audit)*
- [x] Update OpenAPI spec description to "Marketing & Content API" *(done in this audit)*
- [x] Create `docs/role-and-boundary.md` *(done in this audit)*

### Important (next sprint)

- [ ] Connect `global_stats` to a real data source (on-chain or via product API proxy) — currently seeded demo values
- [ ] Add analytics event instrumentation (page views, CTA clicks, funnel conversion tracking)
- [ ] Add proper meta tags / OG tags on each page for SEO
- [ ] Wire newsletter signup to an email delivery service (Mailchimp, Resend, etc.)
- [ ] Add Orb operator program signup form (currently just a CTA)

### Nice to Have

- [ ] Add `/sitemap.xml` and `/robots.txt`
- [ ] Lighthouse CI in the CI pipeline
- [ ] Add a content management layer (Sanity, Contentful) if editorial velocity requires it
- [ ] Add feature flags for unreleased sections

---

## 8. Next Recommended Actions

1. **Merge this audit** — all doc and code changes are committed to `main`.
2. **Review `/developers` page content** — update the external links to match the actual Apple repo URL and any public developer portal.
3. **Decide on stats data source** — are the displayed stats pulled from a product API, on-chain, or remain as manually-updated seed data? Document the decision.
4. **Wire newsletter delivery** — email capture is persisted to DB but no emails are sent. Integrate Resend or similar.
5. **Set up analytics** — no funnel conversion tracking exists. Add at minimum: page views, App Store CTA clicks, newsletter signup completions.
