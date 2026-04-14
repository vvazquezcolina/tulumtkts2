# TulumTkts — Tourism Platform for Tulum (Legacy)

> Trilingual, full-stack tourism booking app for Tulum — React + Express + TypeScript, consolidating events, tours, villas, transfers and travel guides into a single affiliate-aware storefront.

> **Status: archived / under rewrite.** This is the first public iteration and currently ships with known bugs. A rewrite is in progress in a private repo; the code here is kept for reference, not as a recommended starting point.

![Stack](https://img.shields.io/badge/stack-React%20%2B%20Express%20%2B%20TypeScript-3178c6)
![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN%20%7C%20FR-4c9aff)
![Status](https://img.shields.io/badge/status-legacy-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

---

## What it was

An attempt to consolidate Tulum's fragmented booking ecosystem (events, villas, tours, transfers, flights) into a single trilingual storefront, monetized through the Travelpayouts affiliate network. The goal was a one-stop site where a traveler from Paris, New York or Mexico City could plan a full trip without bouncing between OTAs.

## What worked

- **Trilingual routing** — Spanish, English and French with locale-aware SEO
- **Travelpayouts integration** — activities, flights, hotels and monthly price calendars pulled from a single adapter
- **Affiliate click tracking** — `POST /api/affiliate/track` logged every outbound booking click
- **Pexels blog image pipeline** — dynamic cover images with API-key quota protection
- **Build-time SEO pipeline** — custom scripts embedded sitemap data into the client bundle at build time
- **40+ accessible UI primitives** via shadcn/ui on top of Radix
- **Single-artifact deploy to Vercel** — Vite + esbuild pipeline, both client and server bundled in one build

## What didn't

- **API drift** — the Travelpayouts endpoints changed shape and the adapter wasn't versioned; several routes now return errors on the live site.
- **Monolithic Express server in serverless** — the cold-start characteristics don't match the traffic shape; the rewrite is splitting it into discrete serverless functions.
- **Content maintenance via CSV** — worked for MVP, hit limits at scale.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| UI | Tailwind CSS, shadcn/ui (Radix), Framer Motion |
| Routing | Wouter |
| Data | TanStack Query + Zod |
| Forms | react-hook-form + `@hookform/resolvers` |
| Backend | Express 4 + TypeScript (tsx dev, esbuild prod) |
| External APIs | Travelpayouts, Pexels, Google Analytics 4 |
| Deploy | Vercel (monolithic `vercel.json`) |

## Architecture

```
├── client/              # React frontend (Vite)
│   └── src/
│       ├── pages/       # Route-level views (ES / EN / FR)
│       ├── components/  # shadcn/ui + custom blocks
│       ├── hooks/
│       └── lib/
├── server/              # Express backend (TypeScript)
│   ├── routes.ts        # REST endpoints
│   └── services/        # Travelpayouts + Pexels adapters
├── scripts/             # Build-time sitemap generator
└── vercel.json
```

## Running locally

```bash
git clone https://github.com/vvazquezcolina/tulumtkts2.git
cd tulumtkts2
npm install
cp .env.example .env.local   # Travelpayouts + Pexels keys
npm run dev                  # Vite + Express, http://localhost:5173
```

### Environment variables

```bash
TRAVELPAYOUTS_API_TOKEN=...
TRAVELPAYOUTS_MARKER=...   # optional, defaults to token
PEXELS_API_KEY=...         # for blog images
NODE_ENV=development
```

## License

MIT — see `LICENSE`.

---

**Author:** [Victor Vazquez](https://github.com/vvazquezcolina) — digital strategist and builder, Cancún MX.
