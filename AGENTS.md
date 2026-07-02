# AGENTS.md — Hemingway (Lexington Themes)

**Publisher:** [Lexington Themes](https://lexingtonthemes.com/). This file describes **this repo only** (`@lexington/hemingway`).

## What this theme is

Hemingway is a multi-page **magazine + podcast** marketing site: a landing home with blog and podcast previews, full **blog** and **podcast** sections (including tag indexes), **authors** profiles, **legal** pages, **membership/pricing** and auth-style **login/signup/contact** flows, plus **system** pages that document colors, typography, buttons, and links. Primary use case: content-led SaaS/media brands that publish articles and interview-style podcast episodes.

## Tech stack

From `package.json` and `astro.config.mjs`:

- **Astro** `^6.0.0`
- **MDX** — `@astrojs/mdx` `^5.0.0` (integration in `astro.config.mjs`)
- **RSS** — `@astrojs/rss` `^4.0.14` (`src/pages/rss.xml.js`)
- **Sitemap** — `@astrojs/sitemap` `^3.7.0` (integration)
- **Tailwind CSS** `^4.1.18` with **Vite plugin** `@tailwindcss/vite` `^4.1.18`
- **Plugins (in `src/styles/global.css`):** `@tailwindcss/typography`, `@tailwindcss/forms`, `tailwind-scrollbar-hide`
- **SEO component:** `@lexingtonthemes/seo` `^0.1.0` (see `src/components/fundations/head/Seo.astro`)
- **Other:** `reading-time` `^1.5.0` (blog post reading time in `src/pages/blog/posts/[...slug].astro`)
- **Content:** `astro:content` loaders + `z` from `astro/zod` in `src/content.config.ts`

Markdown: drafts enabled; Shiki theme `css-variables` (see `astro.config.mjs`). **Site URL placeholder:** `site: "https://yourdomain.com"` in `astro.config.mjs` (must match production domain for canonical URLs, RSS, sitemap).

## Folder map

| Area | Path | Notes |
|------|------|--------|
| Routes | `src/pages/` | Astro file-based routing; see Routing below |
| Layouts | `src/layouts/` | `BaseLayout`, `BlogLayout`, `PodcastLayout`, `AuthorsLayout`, `LegalLayout` |
| Components | `src/components/` | `global/` (nav, footer, search), `fundations/` (head, UI primitives, icons), `landing/`, `blog/`, `podcast/`, `authors/`, `ctas/`, `assets/` |
| Content | `src/content/` | Markdown/MDX per collection |
| Styles | `src/styles/global.css` | Tailwind v4 `@import`, `@plugin`, `@theme` tokens (`--font-*`, `--color-accent-*`, `--color-base-*`), Shiki CSS variables |
| Images (referenced by content) | `src/images/` | e.g. `thumbnails/`, `authors/`, `about/` |
| Public assets | `public/` | **This repo:** `public/audios/` (e.g. `placeholder.mp3`) — podcast `audioSrc` paths like `/audios/placeholder.mp3` resolve here |

Path alias: `@/*` → `src/*` (`tsconfig.json`).

## Content collections (`src/content.config.ts`)

All collections use the `glob` loader from `astro/loaders`. **`image.url` fields use Astro’s `image()` helper** — use valid image paths (existing entries reference files under `src/images/`).

### `posts`

- **Folder:** `src/content/posts/`
- **Files:** `**/*.{md,mdx}` with `retainBody: true` (body used for reading time)
- **Required frontmatter:** `title`, `pubDate`, `description`, `author`, `image: { url, alt }`, `tags` (string array)
- **Optional:** `isRecent`, `isPopular`, `isLocked` (booleans)
- **Template:** copy structure from `src/content/posts/1.md`

### `authors`

- **Folder:** `src/content/authors/`
- **Files:** `**/*.md`
- **Required:** `name`, `image: { url, alt }`
- **Optional:** `role`, `bio`, `socials: { twitter?, website?, linkedin?, email? }`
- **Template:** `src/content/authors/juliet-ramos.md`

### `podcast`

- **Folder:** `src/content/podcast/`
- **Files:** `**/*.{md,mdx}`
- **Required:** `title`, `pubDate`, `description`, `author`, `image: { url, alt }`, `guestAvatar: { url, alt }`, `tags` (string array)
- **Optional:** `episodeNumber`, `duration`, `audioSrc`, `isRecent`, `isPopular`, `isLocked`
- **Template:** `src/content/podcast/1.md` (includes `audioSrc: "/audios/placeholder.mp3"` → `public/audios/`)

### `legal`

- **Folder:** `src/content/legal/`
- **Files:** `**/*.md`
- **Required:** `page` (string, display name), `pubDate`
- **Template:** `src/content/legal/privacy.md`

## Routing conventions

- **Home:** `src/pages/index.astro` → `/`
- **Blog listing:** `src/pages/blog/index.astro` → `/blog`
- **Blog post:** `src/pages/blog/posts/[...slug].astro` → `/blog/posts/<entry id>/` (slug is `entry.id` from collection, e.g. `1` for `1.md`; RSS uses `/blog/posts/${post.id}/`)
- **Blog tags:** `src/pages/blog/tags/index.astro` → `/blog/tags`; `src/pages/blog/tags/[tag].astro` → `/blog/tags/<tag>`
- **Podcast listing:** `src/pages/podcast/index.astro` → `/podcast`
- **Podcast episode:** `src/pages/podcast/interviews/[...slug].astro` → `/podcast/interviews/<entry id>`
- **Podcast tags:** `src/pages/podcast/tags/index.astro` → `/podcast/tags`; `[tag].astro` → `/podcast/tags/<tag>`
- **Authors listing / detail:** `src/pages/authors/index.astro` → `/authors`; `src/pages/authors/[...slug].astro` → `/authors/<entry id>` (`trailingSlash: false` on static paths)
- **Legal:** `src/pages/legal/[...slug].astro` → `/legal/<entry id>` (`trailingSlash: false` on static paths)
- **RSS:** `src/pages/rss.xml.js` → `/rss.xml` (posts collection only)
- **Marketing / system:** e.g. `about.astro`, `pricing.astro`, `contact.astro`, `login.astro`, `signup.astro`, `404.astro`, `src/pages/system/*` → `/about`, `/pricing`, `/contact`, `/login`, `/signup`, `/404`, `/system/...`

Nested layouts: `BlogLayout`, `PodcastLayout`, `AuthorsLayout`, and `LegalLayout` wrap `BaseLayout` and pass frontmatter into section-specific chrome.

## Customization guide

- **Site URL / domain:** set `site` in `astro.config.mjs`. Align placeholders in `src/components/fundations/head/Seo.astro` (canonical, Open Graph, Twitter) with the real domain when you go live.
- **Colors & typography:** `src/styles/global.css` — `@theme` block (`--font-sans`, `--font-serif`, `--color-accent-*`, `--color-base-*`); `:root` and base layer extend tokens (including Shiki `--astro-code-*` variables).
- **Chrome:** `src/components/global/navigation/Navigation.astro` (`primaryNavLinks`, mega menu), `src/components/global/Footer.astro` (`footerLinks`, copy).
- **Shell / head:** `src/layouts/BaseLayout.astro` imports global CSS and mounts `BaseHead` (`src/components/fundations/head/BaseHead.astro` → `Seo`, `Meta`, `Fonts`, `Favicons`, `FuseJS`). Use `hideNav` / `hideFooter` where pages already do (login, signup, contact, 404).
- **`fundations` folder:** the theme uses the spelling **`fundations`** (not “foundations”) under `src/components/fundations/` — **do not rename**; imports depend on it.

## Commands

From `README.md` (run at repo root):

| Command | Action |
|--------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro ...` | Astro CLI |
| `npm run astro --help` | CLI help |

**Requirements (README):** Node.js 18 or 20; npm.

## Guardrails for AI / contributors

- Do **not** rename `src/components/fundations/`.
- Do **not** widen or change Zod schemas in `src/content.config.ts` without updating every page/component that reads `entry.data.*` and without checking RSS/images.
- Prefer **minimal diffs** and follow existing import style (`@/…`).
- **Coordinated edits:** changing collections or `site`/`integrations` in `astro.config.mjs` may require updates to routes, RSS, or sitemap behavior — verify builds.

## Lexington docs & support (from README)

- **Theme specs:** https://lexingtonthemes.com/templates/hemingway  
- **Documentation:** https://lexingtonthemes.com/documentation  
- **Changelog:** https://lexingtonthemes.com/changelog/hemingway  
- **Support:** https://lexingtonthemes.com/legal/support/  
- **Bundle:** https://lexingtonthemes.com  
