# Línea base antes de la migración a Astro 7

Medido el 17-10-2026 sobre `chore/astro7-prep` (`master` en `e3f981e` + los cambios de la Fase 0: `.node-version` y eliminación de `@astrojs/vercel` y `vercel`).
Node 24.22.0, pnpm 10.27.0, Astro 5.18.2, Windows 11 en local. Lighthouse 12.2.1, perfil móvil por defecto, Chrome headless (`--headless=new`) contra `pnpm preview` (puerto 4321).

## Build

`pnpm build` (incluye `astro check`): OK, 12 páginas, `astro check` con 0 errores, 0 warnings, 0 hints. Se borró `dist/` antes de cada ejecución; la caché de imágenes de Astro (`node_modules/.astro`) estaba caliente, así que la optimización de imágenes se reutiliza.

| Ejecución | `pnpm build` |
|---|---|
| 1 | 8 985 ms |
| 2 | 8 974 ms |
| 3 | 8 893 ms |
| **Mediana** | **8 974 ms** |

`pnpm exec astro build` solo (sin `astro check`, una ejecución): 3 057 ms (Astro informa `12 page(s) built in 1.26s`). Es decir, `astro check` aporta unos 6 s.

## Peso de `dist`

`dist/` total: 14 487 871 B (133 archivos; 13 HTML). `dist/_astro`: 13 196 026 B.

| Tipo (`dist/_astro`) | Archivos | Sin comprimir | gzip -9 |
|---|---|---|---|
| JS | 1 | 15 362 B | 5 359 B |
| CSS | 1 | 52 378 B | 13 035 B |
| Imágenes PNG | 12 | 9 504 824 B | - |
| Imágenes WebP | 65 | 2 891 096 B | - |
| Imágenes AVIF | 12 | 434 870 B | - |
| Fuentes WOFF2 | 15 | 297 496 B | - |

- El único JS es `ClientRouter.astro_astro_type_script_index_0_lang.*.js`; no se emite ningún `client.*.js` de React (el `reactServerOnly()` de `astro.config.mjs` sigue funcionando).
- El único CSS es `about-me.*.css`.
- Fuera de `_astro` quedan 1 291 845 B (CV en PDF, imágenes de `public`, `robots.txt`, sitemaps, favicon).

## Lighthouse (móvil)

| Ruta | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 96 | 100 | 2.27 s | 0.000 | 44 ms |
| `/proyectos` | 99 | 100 | 96 | 100 | 2.18 s | 0.000 | 7 ms |
| `/trayectoria-profesional` | 99 | 100 | 96 | 100 | 1.96 s | 0.016 | 33 ms |
| `/sobre-mi` | 99 | 100 | 96 | 100 | 2.18 s | 0.000 | 12 ms |
| `/en` | 99 | 100 | 96 | 100 | 1.96 s | 0.000 | 44 ms |
| `/en/projects` | 99 | 100 | 96 | 100 | 2.18 s | 0.007 | 2 ms |
| `/en/career` | 99 | 100 | 96 | 100 | 1.96 s | 0.016 | 16 ms |
| `/en/about-me` | 99 | 100 | 96 | 100 | 2.26 s | 0.000 | 25 ms |

Notas:
- Una sola pasada por ruta; ninguna cifra anómala (Performance < 90), así que no hubo repeticiones.
- El objetivo de la migración es igualar o mejorar estas cifras, el tiempo de build y el peso de `_astro`.
- El HTML de `dist` de esta línea base se conserva fuera del repo para comparar el resultado tras migrar.
