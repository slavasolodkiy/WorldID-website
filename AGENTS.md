# AGENTS.md

## Mission
This repository is a web replication project inspired by the World ID / Worldcoin website direction.

Your role is to evaluate, improve, and extend this codebase as a serious reusable web product foundation, not as a superficial visual clone.

## Priority goals
- Maximize architectural clarity
- Improve reuse and maintainability
- Distinguish real implementation from mock/demo behavior
- Identify missing flows and weak spots
- Keep recommendations concrete and evidence-based

## What good looks like
A strong result should move this repo toward:
- a reusable website codebase
- clean component structure
- production-friendly configuration
- explicit content and page architecture
- scalable frontend patterns
- safe secret handling
- realistic forms, validations, states, and integration boundaries

## Audit rules
When auditing this repository:
- inspect actual files, not assumptions
- reference exact files, folders, and functions/components
- separate findings into:
  - implemented
  - partially implemented
  - missing
  - mocked / hardcoded / placeholder-based
  - unclear
- be skeptical and specific
- do not over-credit polished UI if logic is shallow

## Web-specific review focus
Pay special attention to:
- overall information architecture
- page hierarchy and routing
- section-by-section completeness
- consistency of messaging and terminology
- component reusability
- responsive behavior
- loading / empty / error / success states
- forms and validation
- analytics/event instrumentation readiness
- SEO/metadata readiness
- accessibility basics
- asset and content organization

## Reuse expectations
Prefer:
- modular reusable UI components
- separation of content, presentation, and configuration
- centralized constants/config
- explicit env usage
- documented setup
- clean naming
- minimal duplication

Avoid:
- one-off hacks
- hardcoded secrets
- hardcoded URLs when env/config is better
- tightly coupled page logic
- duplicated UI sections without abstraction
- fake completeness

## Secrets and safety
Never expose or preserve:
- database credentials
- API keys
- bearer tokens
- secret endpoints
- production secrets in source files
- plaintext passwords in code or docs

If found:
- flag them clearly
- recommend moving them to environment variables
- recommend `.env.example`
- recommend secret rotation if exposed

## Output format
When asked to review or improve this repo, structure the output as:
1. Executive summary
2. Actual stack and architecture
3. Replication depth assessment
4. Implemented vs partial vs missing
5. Mocked / hardcoded / risky areas
6. Reuse blockers
7. Production-readiness blockers
8. Prioritized backlog:
   - critical
   - important
   - nice-to-have
9. Best next prompt for Replit

## Editing rules
Unless explicitly asked:
- do not make broad redesigns
- do not rewrite the whole project unnecessarily
- do not add heavy dependencies without justification

When editing:
- prefer small high-value changes
- preserve working behavior
- explain tradeoffs
- keep diffs readable