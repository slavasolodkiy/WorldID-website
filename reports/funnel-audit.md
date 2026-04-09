# Funnel Architecture Audit — Implementation Report

**Date:** April 2026  
**Scope:** Marketing/funnel role enforcement, CTA coherence, form UX, analytics events  

---

## Changes Made

### 1. Role Confusion Removed

| Location | Before | After |
|---|---|---|
| Footer tagline | "Building the world's largest human identity and financial network" | "The marketing website for World and Tools for Humanity. Get the World App to verify your unique personhood." |
| TFH Software section | "We develop the core software infrastructure powering the World Network" | "We build the World App — the first wallet supporting World ID — and the ecosystem tools..." |
| Footer Privacy/Terms | Non-functional `<span>` elements | Real links to world.org/privacy and world.org/terms |

### 2. Three-Funnel Navigation Architecture

All three funnel paths are now consistently routed across all entry points:

| Funnel | Primary entry point | Secondary surfaces |
|---|---|---|
| End users → World App | Home hero (primary CTAs), WorldID hero | Navbar "Get App", Footer, WorldID Step 1, Ecosystem page |
| Operators → Operator program | Orb page `#become-operator` section | Navbar "Operators", TFH hero + hardware section, Home funnel cards, Footer |
| Developers → external docs | `/developers` page | Navbar "Developers", WorldID bottom CTA, TFH software section, Footer |

### 3. New / Updated CTAs by Page

**Home (`/`)**
- Hero primary CTA: "Download World App" → App Store (was: "Explore World ID" → internal page)
- Hero secondary CTA: "Get on Google Play" → Google Play (was: "View Ecosystem" → internal page)
- Added three-funnel routing section (end users / operators & agents / developers)

**WorldID (`/world-id`)**
- Hero: Added App Store + Google Play download links
- Step 1: Added App Store and Google Play pill buttons
- Step 2: Added "Find an Orb" internal link → `/orb`
- Step 3: Added "See supported apps" internal link → `/ecosystem`
- Bottom: Added "Developer Resources →" CTA

**Orb (`/orb`)**
- Added full `#become-operator` CTA section with:
  - "Apply to Become an Operator" (external: world.org/become-an-orb-operator)
  - "Find an Orb Near You" (external: world.org/find-orb)
  - Operator contact email

**ToolsForHumanity (`/tools-for-humanity`)**
- Added "Become an Operator" as third hero CTA
- Hardware section: Added "Operator program" link alongside "Hardware specs"
- Software section: Reframed to not imply core backend ownership; added "Developer resources" link

**Navbar (World variant)**
- Added "Developers" nav link
- Added "Get App" primary CTA button (App Store)

**Navbar (TFH variant)**
- Added "Operators" nav link → `/orb#become-operator`

**Footer**
- Added "World Network" column: Home, World ID, Ecosystem, App Store, Google Play
- Added "Tools for Humanity" column: Company, Orb, Operator Program, Team
- Added "Developers" column: Developer Resources, Protocol Docs ↗, GitHub ↗
- Fixed tagline

**DeveloperPage (`/developers`)**
- Replaced "Back to Home" with newsletter subscription form (developer updates)
- Added analytics tracking to all resource card links

**EcosystemPage (`/ecosystem`)**
- Added analytics tracking on category filter changes
- Added analytics tracking on app card clicks

### 4. Form/UX State Improvements

**Footer newsletter form** — Before: basic required HTML validation, single "..." loading state, no success state. After:
- Client-side email regex validation with inline error message (`aria-invalid`, `role="alert"`)
- Loading state: "Saving…" 
- Success state: form replaced with "Thanks for subscribing!" confirmation
- Analytics events on attempt, success, and error

**DeveloperPage newsletter form** — New form with same validation pattern, "Notify me" CTA.

### 5. Analytics Events Added

All events are routed through `artifacts/world-tfh/src/lib/analytics.ts` — a typed catalog that pushes to `window.dataLayer` (GTM pattern) in production and logs to console in development.

| Event | Trigger locations |
|---|---|
| `cta_app_store_click` | Home hero, Home funnels, WorldID hero, WorldID step 1, Navbar, Footer |
| `cta_google_play_click` | Home hero, WorldID hero, WorldID step 1, Footer |
| `cta_become_operator_click` | Home funnels, TFH hero, TFH hardware, Orb CTA, Navbar, Footer |
| `cta_developer_docs_click` | Home funnels, WorldID bottom, TFH software, Developers page, Footer |
| `cta_github_click` | Developers page, Footer |
| `orb_location_viewed` | Orb page location grid |
| `ecosystem_app_click` | Ecosystem page — all app cards |
| `ecosystem_filter_changed` | Ecosystem page — category filter buttons |
| `newsletter_subscribe_attempt` | Footer, Developers page |
| `newsletter_subscribe_success` | Footer, Developers page |
| `newsletter_subscribe_error` | Footer, Developers page |
| `nav_link_click` | All navbar links |

### 6. Content Consistency Fixes

| Issue | Fix |
|---|---|
| "Explore World ID" hero CTA led to internal marketing page, not the app | Replaced with direct App Store download link |
| WorldID page "Download App" step had no download links | Added App Store / Google Play pill buttons |
| Orb page had no operator acquisition path | Added full `#become-operator` section |
| Footer had no Developers or Operators surface | Added two new footer columns |
| `/developers` page was unreachable from navigation | Added to Navbar (World variant) |
| Operator path was entirely absent from navigation | Added "Operators" to TFH Navbar |
| Footer Privacy/Terms were non-functional placeholder `<span>` tags | Replaced with proper external links |

---

## What Was Not Changed

- URL structure (SEO preserved: no routes renamed or removed)
- Visual design and brand aesthetic
- Component library
- API endpoints (content-only scope already correct)
- Database schema
- CI pipeline

---

## Remaining Backlog (Not in this pass)

- [ ] Verify world.org/become-an-orb-operator and world.org/find-orb are real URLs — update if needed
- [ ] Wire `window.dataLayer` to a real GTM container ID via env var
- [ ] Add `/sitemap.xml` with all marketing page URLs
- [ ] Add `<meta>` OG tags per page for social sharing
- [ ] Lighthouse CI in CI pipeline
- [ ] Mobile navbar (hamburger menu) — currently hidden on small screens
- [ ] Add operator contact form (currently email link only)
