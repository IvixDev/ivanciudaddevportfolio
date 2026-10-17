# ivanciudad.com

[![CI](https://github.com/IvixDev/ivanciudaddevportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/IvixDev/ivanciudaddevportfolio/actions/workflows/ci.yml)

Personal portfolio of Iván Ciudad Espinar, software developer. A static, bilingual (Spanish and English) site built with Astro 7 and Tailwind CSS 4, with accessibility, SEO and performance as requirements rather than extras.

- Live site: https://www.ivanciudad.com
- English version: https://www.ivanciudad.com/en

## Highlights

- **Four pages:** Home, Projects, Career and About, plus localized 404 and 500 pages.
- **Lighthouse (mobile):** 100 accessibility and 100 SEO on every route, with performance at 99.
- **About 5 KB of client JavaScript (gzip).** There is no UI framework on the client: just Astro's `ClientRouter` and a few small scripts.
- **Typed i18n:** every string lives in `es.json` / `en.json`, and a missing English key fails the build.
- **Quality gates in CI:** ESLint (with `jsx-a11y`), Vitest and `astro check` run on every pull request.

## Features

### Spanish and English, with localized routes

Spanish is the default locale and lives at the root: `/proyectos`, `/trayectoria-profesional` and `/sobre-mi`. English lives under `/en`: `/en/projects`, `/en/career` and `/en/about-me`.

The language switch maps each page to its counterpart in the other language. It keeps the scroll position and does not replay entrance animations, so switching feels like changing the text, not loading a new page.

### Design system

All design tokens are defined in the `@theme` block of [`src/styles/global.css`](src/styles/global.css): colors, fonts, radii, shadows, durations and animations. Components use the token utilities (`bg-ink`, `text-muted`, `border-line`) and never raw hex values. The full reference, with verified contrast ratios, is in [`docs/redesign/design-system.md`](docs/redesign/design-system.md).

### Accessibility (WCAG 2.2 AA)

- A skip link, semantic landmarks and a single `h1` per page.
- The mobile menu sets `aria-expanded`, closes with Escape and returns focus to the toggle.
- The favorites tabs follow the WAI-ARIA tabs pattern (arrow keys, Home and End).
- The project filter uses `aria-pressed` and an `aria-live` result count.
- Touch targets are at least 44 px, focus is always visible and contrast has been checked.
- Every animation is turned off under `prefers-reduced-motion: reduce`.

### SEO

- Canonical URLs and reciprocal `hreflang` links (`es`, `en`, `x-default`).
- Open Graph tags with `og:locale` and `og:locale:alternate`, set through `astro-seo`.
- JSON-LD on every page: `Person`, `WebSite`, `CollectionPage`, `ProfilePage` and `BreadcrumbList`.
- A sitemap from `@astrojs/sitemap` that knows about both languages, with per-page priorities and image entries.

### Performance

- Static output, with images optimized through `astro:assets` (`<Image>` and `<Picture>`, AVIF/WebP).
- Icons are [Tabler](https://tabler.io/icons) SVGs imported as Astro components and inlined at build time, so no icon library or runtime is shipped.
- The Onest and Bricolage Grotesque fonts are self-hosted and preloaded (latin subset).
- Vercel Analytics and Speed Insights collect real-user metrics.

## Tech stack

Versions are the ranges declared in `package.json`.

| Area | Packages |
|---|---|
| Framework | `astro` ^7.4.0, `@astrojs/check` ^0.9.10 |
| Language | `typescript` ^6.0.3, using Astro's `strict` tsconfig |
| Styling | `tailwindcss` ^4.3.3 with `@tailwindcss/vite` |
| Icons | `@tabler/icons` ^3.49.0 (SVG) |
| SEO | `astro-seo` ^0.8.4, `@astrojs/sitemap` ^3.7.4 |
| Images | `sharp` ^0.35.5 |
| Fonts | `@fontsource-variable/onest`, `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/jetbrains-mono` |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` |
| Quality | `eslint` 9 (`typescript-eslint` strict, `eslint-plugin-astro`, `eslint-plugin-jsx-a11y`), `vitest` 5 |

## Getting started

### Requirements

- **Node.js 24.** `engines` in `package.json` declares it for CI and Vercel, and [`.node-version`](.node-version) sets it locally (for example, `fnm` with `--use-on-cd`). Astro 7 needs at least Node 22.22.
- **pnpm 10.27.0.** It is pinned in `packageManager`, so Corepack can provide it. Do not use npm or yarn.

### Commands

| Command | What it does |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server (`pnpm start` is an alias) |
| `pnpm build` | Type-check with `astro check`, then build into `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` / `pnpm lint:fix` | Run ESLint, or run it and fix what it can |
| `pnpm test` / `pnpm test:watch` | Run Vitest once, or in watch mode |
| `node scripts/check-i18n.mjs` | Check that `es.json` and `en.json` have the same shape |

## Project structure

```text
src/
├── assets/        Source images (portrait, project screenshots), optimized at build time
├── components/    UI split by page (home/, projects/, career/, about/), shared ui/,
│                  plus the site header, footer and language switch
├── content/       Non-text data: projects.ts, marquee.ts, layout.consts.ts (nav and social links)
├── helpers/       SEO props (seo.helper.ts) and JSON-LD builders (schema.helper.ts)
├── i18n/
│   ├── locales/   es.json and en.json, all user-facing copy
│   ├── utils.ts   Typed translation helpers and the ES ↔ EN route mapping
│   └── utils.test.ts
├── icons/         The IC logo (SVG)
├── layouts/       Layout.astro: <head>, SEO, hreflang, fonts, view transitions, header and footer
├── pages/         Spanish routes at the root, English routes in pages/en/
├── styles/        global.css: Tailwind, @theme tokens, base styles, animations, reduced motion
├── types/         Shared TypeScript types
└── views/         One view per page (HomeView, ProjectsView…), shared by both languages
```

The files in `src/pages` are thin wrappers. For example, `pages/proyectos.astro` and `pages/en/projects.astro` both render `views/ProjectsView.astro`, and the view reads its copy from the current locale.

## Editing text and translations

All copy lives in `src/i18n/locales/es.json` and `src/i18n/locales/en.json`.

1. Edit or add the key in **both** files, with the same structure.
2. `es.json` is the source type (`Messages`) and `en.json` is checked with `satisfies Messages`. A missing or misspelled English key fails `astro check`, which runs as part of `pnpm build`.
3. Run `node scripts/check-i18n.mjs` to compare both files in both directions. It prints `i18n OK`, or lists the mismatched key paths and exits with code 1.

In components:
- `getMessages(lang)` returns the typed messages object.
- `useTranslations(lang)` takes dotted keys such as `t("home.title")` and falls back to Spanish.

Each page's localized URL is stored in the `nav.*_url` keys, which the language switch uses to map routes.

## Adding a project

1. Add the screenshot to `src/assets/`.
2. In `src/content/projects.ts`, import the image, add the new id to the `ProjectId` union and add an entry to `projects`. Each entry has:
   - `category`: `app`, `experiment` or `game`
   - `image`
   - `ctaKey`: `view_project`, `play` or `open_app`
   - `external`
   - `featured`
3. Add `projects.items.<id>` to both locale files, with `title`, `description`, `description_short`, `img_alt`, `tags` and `href`. The `href` can differ per language.
4. Run `node scripts/check-i18n.mjs`, `pnpm lint`, `pnpm test` and `pnpm build`.
5. Optional: add the image to `pageImages` in `astro.config.mjs` so it appears in the image sitemap.
6. If the project is a separate Vercel app served under this domain, add its rewrites to `vercel.json` (see [Deployment](#deployment)).

## Quality and CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every pull request and on every push to `master`, using Node 24. It runs `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm test` and `pnpm build`, and code is merged only when all of them pass.

- **ESLint** uses a flat config with `typescript-eslint` strict, `eslint-plugin-astro` and `eslint-plugin-jsx-a11y`. `any` is an error, and accessibility rules are never disabled without a written justification.
- **Vitest** tests live next to the code as `*.test.ts`. They cover the translation helpers, route mapping between languages, nav state and language-switch detection.

## Deployment

The site is deployed on Vercel as a static build (`output: 'static'`), with `site` set to `https://www.ivanciudad.com` and `trailingSlash: 'never'`. No adapter is needed.

`vercel.json` serves `.xml` files as `application/xml; charset=utf-8`. It also proxies some project URLs to their own Vercel deployments, so they open under this domain:

| Paths on ivanciudad.com | Proxied to |
|---|---|
| `/proyectos/public-pages`, `/en/projects/public-pages` | `iciudade-public-pages.vercel.app/proyectos/public-pages` |
| `/proyectos/buscaminas`, `/en/projects/minesweeper`, `/bombsweeper/*` | `ivan-city-bombsweeper.vercel.app/bombsweeper` |
| `/proyectos/tabla-pokemon`, `/en/projects/pokemon-types`, `/pokemon-table-types/*` | `pokemon-types-table.vercel.app/pokemon-table-types` |

Each rewrite also forwards subpaths (`/:path*`).

## Documentation

- [`docs/redesign/`](docs/redesign/): the redesign. It contains the design system, the plan with its accessibility and SEO requirements, before/after measurements and the HTML mockups.
- [`docs/migracion-astro-7/`](docs/migracion-astro-7/): the migration from Astro 5 to 7.4, TypeScript 6 and removing React. It contains the plan, baseline, results and a [visual summary](docs/migracion-astro-7/novedades.html).
- [`docs/upgrades.md`](docs/upgrades.md): dependency review and proposed upgrades.
- [`AGENTS.md`](AGENTS.md): coding conventions, written in Spanish. Main rules: pnpm only, strict TypeScript without `any`, Tailwind as the only styling solution, Tabler icons imported one by one as SVG, accessibility as a requirement, and measure before optimizing.

Most docs are written in Spanish.

## Author

Iván Ciudad Espinar

- Website: https://www.ivanciudad.com
- LinkedIn: https://www.linkedin.com/in/iv%C3%A1n-ciudad-espinar-2195191b2/
- GitHub: https://github.com/IvixDev
