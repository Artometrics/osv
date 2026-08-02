# AGENTS.md — OSV (Expo + Uniwind)

This file describes **this repo only** (`osv-web`).

## What this project is

OSV is a multi-page **magazine + podcast** product with a high-contrast **dark gothic / crimson zine** visual system: landing home, blog, podcast, authors, legal, membership flows, and an unlisted `/bio` Instagram page. Imagery for heroes and brand blocks is generated on Higgsfield — character shots use the **KSM Soul** (`soul_2`); landscapes and anime/chrome illustrations use `nano_banana_pro`.

## Tech stack

- **Expo** `~57` + **Expo Router** (`app/`)
- **React Native** / **React Native Web** (static export)
- **Uniwind** + Tailwind v4 (`global.css`, `metro.config.js`)
- **Fonts:** Anton, BebasNeue, UnifrakturCook, GreatVibes, Inter (`assets/fonts/` + `public/fonts/`)
- **Content:** `src/content/*` → `scripts/build-content.mjs` → `src/generated/*.json`
- **Brand images:** `public/images/brand/`
- **Brand loops:** `public/videos/brand/` (Higgsfield kling3_0 ambient loops, ping-pong encoded for web)

## Folder map

| Area | Path |
|------|------|
| Routes | `app/` |
| Components | `components/` |
| Lib | `lib/` |
| Tokens | `constants/Colors.ts`, `global.css` |
| Bio config | `data/bio.ts` |
| Content source | `src/content/` |
| Content built | `src/generated/` |
| Brand assets | `public/images/brand/`, `assets/fonts/` |

Path alias: `@/*` → project root.

## Routing

- `/` home (full-bleed OSV hero)
- `/blog`, `/blog/posts/<slug>`
- `/podcast`, `/podcast/interviews/<id>`
- `/authors`, `/authors/<id>`
- `/legal/<id>`
- `/about`, `/pricing`, `/contact`, `/login`, `/signup`
- `/bio` — unlisted link-in-bio (outside `(site)` chrome; do not add to nav)

## Visual system

- Palette: `#E60000` crimson, `#000000`, `#FFFFFF`
- Display: Anton (condensed caps); accents: UnifrakturCook (gothic), GreatVibes (script); body: Inter
- Hard borders (`border-2`), zero radius, grain overlay on web (`osv-grain`)
- Prefer full-bleed heroes and red utility bars over card chrome

## Commands

| Command | Action |
|--------|--------|
| `npm run content` | Rebuild JSON + RSS |
| `npm run dev` | Expo web |
| `npm run build` | Export `dist/` |

## Guardrails

- Prefer minimal diffs and `@/` imports.
- Do not add `/bio` to header/footer/nav.
- Regenerating brand images: use Higgsfield `soul_2` with Soul id for **KSM** (character), or `nano_banana_pro` for illustrative/landscape.
