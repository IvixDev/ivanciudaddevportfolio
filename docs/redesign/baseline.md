# Línea base antes del rediseño

Medido el 16/10/2026 sobre `feat/redesign-16-10-26` recién creada (master + quitar enlaces a X), con `pnpm build` y `pnpm preview`.
Lighthouse 12.2.1, perfil móvil por defecto, Chrome headless en local.

## Build

- `pnpm build` (incluye `astro check`): OK, 12 páginas, ~17 s.

## Peso de assets (`dist/_astro`)

| Tipo | Archivos | Sin comprimir | gzip |
|---|---|---|---|
| JS | 9 | 401 599 B | 129 467 B |
| CSS | 1 | 54 299 B | 9 360 B |

Fuentes servidas desde `public/fonts`: `Onest.woff2`, `SourceCodePro.woff2`.

## Lighthouse (móvil, ES)

| Ruta | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 98 | 100 | 96 | 100 | 2.3 s | 0.001 | 10 ms |
| `/proyectos` | 97 | 100 | 96 | **92** | 2.4 s | 0 | 10 ms |
| `/trayectoria-profesional` | 99 | 100 | 96 | 100 | 2.1 s | 0.002 | 20 ms |
| `/sobre-mi` | **87** | 100 | 96 | 100 | **3.9 s** | 0 | 0 ms |

Notas:
- SEO 92 en `/proyectos`: la canónica sale como el texto literal `projects.url` (clave inexistente en los JSON antiguos).
- Performance 87 en `/sobre-mi` por LCP de 3.9 s (foto de Japón grande cargada como imagen principal).
- El objetivo del rediseño es igualar o mejorar todas las cifras.
