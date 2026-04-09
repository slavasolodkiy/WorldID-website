# Website Role & API Boundary Policy

## Repo Role

This repository is the **marketing and acquisition funnel website** for World and Tools for Humanity.

It is not the core wallet, identity, or World ID protocol backend. Those live in the Apple and Android product repositories.

### What This Repo Is Responsible For

| Responsibility | Implementation |
|---|---|
| Brand and product narrative | React pages: Home, Orb, World ID, TFH |
| End-user acquisition | App Store / Google Play CTAs on every page |
| Orb operator acquisition | Orb page — specs, locations, operator program CTA |
| Ecosystem discovery | Ecosystem directory with category filtering |
| Developer handoff | `/developers` entry page → external docs and GitHub |
| Email capture | Newsletter subscription (persisted to DB) |
| Network transparency | Display-only global stats |

### What This Repo Must Never Implement

| Prohibited | Reason |
|---|---|
| World ID verification endpoints | Core protocol — owned by product repos |
| Credential issuance or proofs | Core protocol — owned by product repos |
| User authentication or sessions | No user accounts on marketing site |
| Wallet or transaction logic | Core product — not a marketing concern |
| On-chain data reads | Should come from product layer, not marketing backend |
| SDK distribution or signing | Developer toolchain — belongs in dedicated portal |

## API Boundary

The website API (`artifacts/api-server`) is a **content and funnel API**. Every endpoint must pass this test:

> "Is this endpoint serving marketing display content or capturing a funnel conversion event?"

**In scope:** stats (display), ecosystem directory (display), orb hardware/locations (display), team bios (display), newsletter signup (conversion).

**Out of scope:** anything that touches identity, credentials, wallets, proofs, or transactions.

## Source of Truth

| Domain | Source of Truth |
|---|---|
| Core identity & wallet backend | Apple product repo (slavasolodkiy/WorldID-Apple) |
| World ID protocol | External: developer.worldcoin.org |
| Website content and funnel | This repo (slavasolodkiy/WorldID-website) |
| Developer docs portal | TBD — see `reports/final-audit.md` for decision |

## Funnel Architecture

```
User lands on world-tfh website
    │
    ├─→ End user?
    │       └─→ World App CTA → App Store / Google Play
    │
    ├─→ Orb operator?
    │       └─→ /orb page → operator program contact/signup
    │
    ├─→ Developer?
    │       └─→ /developers page → external protocol docs + GitHub
    │
    └─→ Ecosystem builder?
            └─→ /ecosystem page → World ID integration docs (external)
```

## Content Update Process

All content is DB-backed. To update:

1. Edit `lib/db/src/seed.ts`
2. Run `pnpm --filter @workspace/db run seed`

Or update the database directly. No route handler changes required for content updates.
