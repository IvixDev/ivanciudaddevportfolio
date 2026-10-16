# Resultados del rediseño frente a la línea base

Medido el 16/10/2026 en `feat/redesign-16-10-26`, build limpio (`rm -rf dist && pnpm build`) servido con `pnpm preview`.
Mismas condiciones que `baseline.md`: Lighthouse 12.2.1, móvil, Chrome headless en local.

## Build

- `pnpm build`: 0 errores, 0 warnings, 0 hints de `astro check`; 12 páginas.
- `node scripts/check-i18n.mjs`: ES y EN con la misma forma.
- Todas las referencias a `/_astro/*` del HTML existen en `dist/`.

## Peso de assets (`dist/_astro`)

| Tipo | Antes (archivos · raw · gzip) | Después (archivos · raw · gzip) |
|---|---|---|
| JS | 9 · 401 599 B · 129 467 B | 1 · 15 362 B · 5 373 B (**−96 %**) |
| CSS | 1 · 54 299 B · 9 360 B | 1 · 51 849 B · 14 258 B (+4,9 kB gzip, por las tres familias de Fontsource con sus subconjuntos) |

El JS restante es el `ClientRouter` de Astro; los scripts de menú, filtro y pestañas van inline.

## Lighthouse (móvil)

| Ruta | Perf antes → después | A11y | Best Practices | SEO antes → después | LCP antes → después | CLS |
|---|---|---|---|---|---|---|
| `/` | 98 → 99 | 100 → 100 | 96 → 96 | 100 → 100 | 2.3 → 2.0 s | 0 |
| `/proyectos` | 97 → 99 | 100 → 100 | 96 → 96 | **92 → 100** | 2.4 → 2.2 s | 0 |
| `/trayectoria-profesional` | 99 → 99 | 100 → 100 | 96 → 96 | 100 → 100 | 2.1 → 2.0 s | 0.016 |
| `/sobre-mi` | **87 → 98** | 100 → 100 | 96 → 96 | 100 → 100 | **3.9 → 2.3 s** | 0 |
| `/en` | — → 99 | 100 | 96 | 100 | 2.2 s | 0 |
| `/en/projects` | — → 99 | 100 | 96 | 100 | 2.2 s | 0.007 |
| `/en/career` | — → 99 | 100 | 96 | 100 | 2.0 s | 0.014 |
| `/en/about-me` | — → 98 | 100 | 96 | 100 | 2.3 s | 0 |

Best Practices 96 en todas: los scripts de Vercel Analytics/Speed Insights dan 404 en local (en producción existen). Igual que en la línea base.

## Comprobaciones manuales (navegador)

- Sin scroll horizontal en las 9 rutas (8 + 404) a 320, 390, 834 y 1440 px.
- Un único `h1`, un único `main` y `lang` correcto en todas.
- Canónica, `hreflang` (es/en/x-default, recíprocos) y `og:locale` + `og:locale:alternate` correctos en las 8 rutas; sin `twitter:site`/`creator`.
- JSON-LD: `Person` + `WebSite` (Inicio), `CollectionPage` + `BreadcrumbList` (Proyectos), `ProfilePage` + `BreadcrumbList` (Trayectoria, Sobre mí).
- Menú móvil: `aria-expanded`, etiqueta abrir/cerrar, `aria-current` en la página activa, Escape cierra y devuelve el foco.
- Pestañas de favoritos: flechas y End mueven foco y selección; un panel visible.
- Filtro de proyectos: `aria-pressed`, filas filtradas y contador `aria-live` en singular/plural.

## Arreglos hechos durante la verificación

- Contraste: token `faint` de `#6F7C96` a `#7D89A3` (4,48 → 5,36:1) para la cinta en móvil.
- `.reveal` ya no anima la opacidad (solo desplazamiento): el texto nunca baja de su contraste real.
- Filtro de proyectos: reserva su hueco con `invisible` en lugar de `hidden` (CLS de Proyectos 0.088 → 0).
- Contador «1 resultados» → «1 resultado» (`projects.eyebrow_one`).
