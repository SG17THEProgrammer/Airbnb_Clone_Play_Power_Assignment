# Airbnb Listing Page Clone

Next.js 15 (App Router) + TypeScript + Tailwind CSS clone of an Airbnb
listing page, including the Photo Tour and Lightbox overlays. Desktop only,
per assignment scope. No backend — all data is in `src/data/listing.ts`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy

Push to a new Vercel project (or `vercel deploy` from this folder). No env
vars required — the sample listing photos load from images.unsplash.com,
already whitelisted in `next.config.ts`.

## Structure

- `src/app/page.tsx` — composes the listing page, owns Photo Tour / Lightbox
  open state.
- `src/components/PhotoGrid.tsx` — hero 5-tile photo grid + "Show all photos".
- `src/components/PhotoTour.tsx` — full-screen gallery overlay.
- `src/components/Lightbox.tsx` — single-photo viewer, keyboard ←/→, focus trap.
- `src/components/ListingHeader.tsx`, `HostSection.tsx`, `Amenities.tsx`,
  `Reviews.tsx`, `BookingCard.tsx` — listing page sections.
- `src/data/listing.ts` — sample content.
- `architecture/architecture-diagram.svg` — production-scale architecture diagram.
- `PROMPTS.md` — AI prompt log used during development.
- `.claude/agents/` — sub-agent configs used for fidelity + code-quality review.

## Known gap — please read

The reference site (https://airbnb-clone-umber-two.vercel.app) blocks
automated crawling (robots.txt), so this build follows Airbnb's real,
well-documented listing-page conventions rather than a pixel-scrape of that
exact reference. **Before submitting, open the reference site next to this
clone and adjust:**

- Exact spacing/padding values (hero grid gap, section padding, card
  border-radius).
- Exact copy (title, description, amenity names) if the reference uses
  different sample data.
- Any animation timing differences (hover scale amount, overlay fade
  duration).
- Confirm the booking card's sticky offset matches the reference's scroll
  behavior.

The `ui-fidelity-reviewer` sub-agent config is set up specifically for this
comparison pass — run it with side-by-side screenshots once you have them.
