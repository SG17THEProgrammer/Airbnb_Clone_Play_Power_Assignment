# Airbnb Listing Page Clone

A desktop-only, pixel-fidelity clone of an Airbnb listing page, built with
Next.js 15 (App Router), TypeScript, and Tailwind CSS — including the full
Photo Tour and Lightbox overlay experiences.

**Reference cloned:** https://airbnb-clone-umber-two.vercel.app

## Features

- **Listing page** — hero photo grid, guest-favourite rating badge, host
  section, highlights, description with functional show more/less, "Where
  you'll sleep," amenities (with categorized modal), calendar with real date
  math, ratings breakdown, reviews with per-card show more/less, map section,
  "Meet your host" with co-hosts, things to know, and a "More stays nearby"
  carousel.
- **Sticky sub-nav** — Photos / Amenities / Reviews / Location tabs that
  appear once you scroll past the hero photos, with scroll-spy (auto-
  highlights the section you're in) and smooth-scroll navigation.
- **Photo Tour overlay** — full-screen gallery grouped by room, with a
  sticky category nav and two-column (sticky label + scrolling photos)
  layout per room.
- **Lightbox overlay** — single-photo viewer with prev/next arrows,
  `←`/`→` keyboard navigation, and a room-name heading.
- **Booking card** — sticky through the Calendar section only, animates out
  of the way when the sub-nav appears, gradient Reserve button.
- **Save button** — toggles a bottom "Saved to wishlist" / "Removed from
  wishlist" toast.
- Built with accessibility as a first-class concern: ARIA dialog roles,
  focus management, keyboard support, and visible focus rings throughout.

## Tech stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **Data:** static, in `src/data/listing.ts` — no backend required

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Type-check and build

```bash
npx tsc --noEmit
npm run build
```

Both should pass with zero errors before considering any change complete.

## Project structure

```
src/
  app/
    page.tsx           # composes the full listing page, owns overlay state
    layout.tsx
    globals.css         # design tokens, keyframes, shared utility classes
  components/           # one component per section/overlay
  data/
    listing.ts           # all listing content: photos by room, amenities, reviews, host, pricing
.claude/
  agents/                # sub-agent configs (see below)
architecture/
  architecture-diagram.{svg,png,pdf}
CLAUDE.md                # project instructions for agentic coding tools
PROMPTS.md               # AI-assisted development prompt log
```

## Deployment

Deploy to Vercel (or any Next.js-compatible host) with no environment
variables required — listing photos load from `images.unsplash.com`, already
whitelisted in `next.config.ts`.

```bash
vercel deploy
```

## Sub-agents

Three Claude sub-agent configs live in `.claude/agents/`:

| Agent | Purpose |
|---|---|
| `ui-fidelity-reviewer.md` | Compares rendered output against reference screenshots — layout, spacing, typography, color. |
| `code-quality-reviewer.md` | Checks component boundaries, type safety, build health, dead code. |
| `interaction-accessibility-reviewer.md` | Checks keyboard nav, focus management, ARIA semantics, and animation/transition parity. |

## Known gaps (intentional placeholders, not oversights)

- **Map** — static visual placeholder, not a real interactive map (no Maps
  API key available). Swap in a real Google Maps/Mapbox embed.
- **No backend** — all data is static; no database or API layer (per
  assignment scope, backend was optional).
- **Desktop only** — no mobile responsive layout, per assignment scope.

## Architecture

See `architecture/architecture-diagram.pdf` for the production-scale
scaling strategy (CDN/edge → API gateway → per-domain microservices → event
bus → Postgres/Redis/Elasticsearch/S3 → observability → CI/CD with
multi-region rollout).

## AI-assisted development

This project was built with Claude in an agentic workflow — see
`PROMPTS.md` for the full prompt sequence and process notes.
