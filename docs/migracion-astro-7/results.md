# Resultados de la migración a Astro 7.4

Medido el 17-10-2026 sobre `chore/astro-7` (Fase 1 del [plan](./PLAN.md)), partiendo de `master` en `d2f567f`. Mismas condiciones que la [línea base](./baseline.md): Node 24.22.0, pnpm 10.27.0, Windows 11, Lighthouse 12.2.1 móvil con Chrome headless contra `pnpm preview` (puerto 4321), caché de imágenes de Astro caliente.

## Versiones

| Paquete | Antes | Después |
|---|---|---|
| astro | 5.18.2 | **7.4.0** (paso intermedio verificado: 6.4.8) |
| @astrojs/react | 4.4.2 | **7.1.0** (intermedio: 5.0.7) |
| sharp | 0.34.5 | **0.35.5** |
| vite (transitivo) | 6.x | 8.3.4 |
| react / react-dom | 19.2.x | 19.2.x (sin cambios) |

## Comprobaciones

- `pnpm install --frozen-lockfile`: sin avisos de peers (se repitió con `--force` para reinstalar todo). Solo el aviso habitual de pnpm 10 sobre scripts de `esbuild` ignorados.
- `pnpm lint`: sin errores. `pnpm test`: 29 de 29.
- `pnpm build`: `astro check` con 0 errores, 0 avisos, 0 hints; 12 páginas. El compilador en Rust no encontró HTML inválido.
- `dist/_astro` solo contiene `ClientRouter.astro_astro_type_script_index_0_lang.*.js` y `Layout.*.css`: **no se emite ningún `client.*.js` de React** (`reactServerOnly()` sigue funcionando con `@astrojs/react` 7.1).

## Build

`pnpm build` (incluye `astro check`), `dist/` borrado antes de cada ejecución:

| Ejecución | Antes (Astro 5.18) | Después (Astro 7.4) |
|---|---|---|
| 1 | 8 985 ms | 8 251 ms |
| 2 | 8 974 ms | 8 363 ms |
| 3 | 8 893 ms | 8 265 ms |
| **Mediana** | **8 974 ms** | **8 265 ms** (-7,9 %) |

`pnpm exec astro build` solo (una ejecución): 3 057 ms antes, 2 280 ms después. Astro informó `12 page(s) built in 1.26s` antes y `862ms` en la ejecución con `--timings`. El grueso de `pnpm build` sigue siendo `astro check` (unos 6 s), que no cambia con Astro 7.

`astro build --timings` (7.4): total 1,21 s para 12 páginas.

| Fase | Tiempo | % |
|---|---|---|
| resolve config | 289 ms | 23,9 % |
| setup (rutas, config de Vite, content sync) | 84 ms | 6,9 % |
| prerender bundle | 316 ms | 26,2 % |
| client bundle | 38 ms | 3,2 % |
| rearrange assets | 149 ms | 12,4 % |
| generate pages | 230 ms | 19,0 % |

Plugins de Vite: 203 ms en total; el más caro es `@tailwindcss/vite:generate:build` (88 ms, sobre `global.css`). Compilador de Astro: 13 ms para 68 componentes. Renderizado de páginas: 143 ms; la más lenta es `/404` (66 ms), la mediana 5 ms. Imágenes: 86 transformaciones, 31 ms, todas desde caché.

## Peso de `dist`

`dist/` total: 14 054 940 B (130 archivos; 13 HTML) frente a 14 487 871 B (133 archivos). `dist/_astro`: 12 764 695 B frente a 13 196 026 B. Fuera de `_astro`: 1 290 245 B frente a 1 291 845 B.

| Tipo (`dist/_astro`) | Archivos | Sin comprimir | gzip -9 | Antes (archivos / sin comprimir / gzip) |
|---|---|---|---|---|
| JS | 1 | 16 365 B | 5 562 B | 1 / 15 362 B / 5 359 B |
| CSS | 1 | 52 282 B | 13 209 B | 1 / 52 378 B / 13 035 B |
| Imágenes PNG | 12 | 9 504 824 B | - | 12 / 9 504 824 B |
| Imágenes WebP | 62 | 2 458 858 B | - | 65 / 2 891 096 B |
| Imágenes AVIF | 12 | 434 870 B | - | 12 / 434 870 B |
| Fuentes WOFF2 | 15 | 297 496 B | - | 15 / 297 496 B |

- JS de cliente: +203 B gzip (5 359 → 5 562 B), el mismo script del `ClientRouter` empaquetado con Vite 8.
- CSS: -96 B sin comprimir, +174 B gzip. El archivo pasa a llamarse `Layout.*.css` (antes `about-me.*.css`), con otro nombre de chunk; es el mismo CSS global de Tailwind (el HTML lo enlaza en la misma posición del `<head>`).
- WebP: el HTML referencia 62 WebP distintos antes y después, así que la línea base tenía 3 archivos WebP sin referenciar en el HTML; no se ha analizado de dónde venían ni cuánto de los 432 238 B de diferencia se debe a ellos o a sharp 0.35.

## Lighthouse (móvil, una pasada por ruta)

Todas las rutas con Performance 99, Accessibility 100, Best Practices 96, SEO 100 (igual que antes). Ninguna ruta bajó de 95, así que no hubo repeticiones.

| Ruta | Perf | A11y | BP | SEO | LCP (antes) | LCP (ahora) | CLS (antes) | CLS (ahora) | TBT (antes) | TBT (ahora) |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 96 | 100 | 2.27 s | 2.19 s | 0.000 | 0.000 | 44 ms | 39 ms |
| `/proyectos` | 99 | 100 | 96 | 100 | 2.18 s | 2.18 s | 0.000 | 0.000 | 7 ms | 8 ms |
| `/trayectoria-profesional` | 99 | 100 | 96 | 100 | 1.96 s | 1.96 s | 0.016 | 0.018 | 33 ms | 16 ms |
| `/sobre-mi` | 99 | 100 | 96 | 100 | 2.18 s | 2.26 s | 0.000 | 0.000 | 12 ms | 13 ms |
| `/en` | 99 | 100 | 96 | 100 | 1.96 s | 2.26 s | 0.000 | 0.000 | 44 ms | 39 ms |
| `/en/projects` | 99 | 100 | 96 | 100 | 2.18 s | 2.18 s | 0.007 | 0.008 | 2 ms | 6 ms |
| `/en/career` | 99 | 100 | 96 | 100 | 1.96 s | 1.95 s | 0.016 | 0.018 | 16 ms | 14 ms |
| `/en/about-me` | 99 | 100 | 96 | 100 | 2.26 s | 2.25 s | 0.000 | 0.000 | 25 ms | 23 ms |

Las diferencias de LCP, CLS y TBT están dentro del ruido de una sola pasada (la mayor es `/en`, de 1.96 a 2.26 s, sin cambio de puntuación). No se atribuye ninguna a la migración.

## Diferencias en el HTML de `dist`

Se comparó cada HTML contra la copia de la línea base (Astro 5.18.2), normalizando solo los hashes de archivos:

- `<head>`: canonical, 3 `hreflang`, 13 `og:`, 5 `twitter:`, JSON-LD y los 2 preloads de fuentes están intactos y en el mismo orden. Solo cambian el `<meta name="generator">` (`Astro v5.18.2` → `v7.4.0`), el nombre del CSS (`about-me.*.css` → `Layout.*.css`) y `&#38;` → `&amp;` en `og:title`/`twitter:title` (equivalentes).
- Imágenes: mismos `srcset`, `width`, `height`, `sizes` y `loading` en todas. Astro 6+ deja de emitir `fetchpriority="auto"` (es el valor por defecto del navegador).
- Scripts en línea: mismo código con distinta minificación (Vite 8 frente a Vite 6); los HTML pesan entre 91 y 175 B menos.
- `dist/sitemap-0.xml` y `sitemap-index.xml`: idénticos salvo `<lastmod>`.
- Orden de `<script>`/`<style>` en `Layout.astro`: sin cambios en el `<head>` generado.

### Espacios en blanco (`compressHTML`)

Astro 7 usa por defecto `compressHTML: 'jsx'`, que elimina los espacios entre un texto y un elemento en línea contiguo. Se renderizó el HTML de la línea base y el nuevo (con el mismo CSS, sin scripts) en Chrome a 320, 768, 834 y 1440 px, en 9 rutas (las 8 más `/404`), comparando `innerText`, anchos de `scrollWidth` y la caja de cada elemento (tolerancia de 1 px):

| Configuración | Combinaciones ruta × ancho idénticas |
|---|---|
| `compressHTML: 'jsx'` (por defecto de Astro 7) | 0 de 36: diferencias en todas |
| `compressHTML: true` | **36 de 36** |

Con `'jsx'` se perdía el espacio en `© 2026 Iván Ciudad Espinar` + `<span>·</span>` del pie (el separador se desplazaba 4 px), en el prompt `~ $ ` + cursor parpadeante de la portada (8 px; el texto pasaba de `~ $ ` a `~ $`) y cambiaban los anchos de los enlaces «Ver proyecto» (8 px más estrechos, 17 elementos desplazados en `/proyectos` y `/en/projects`). Por eso `astro.config.mjs` fija `compressHTML: true`.

## Cambios en el código y por qué

| Archivo | Cambio | Motivo |
|---|---|---|
| `package.json`, `pnpm-lock.yaml` | `astro` ^7.4.0, `@astrojs/react` ^7.1.0, `sharp` ^0.35.5 | Objetivo de la migración |
| `astro.config.mjs` | `compressHTML: true` con comentario | Conservar los espacios entre texto y elementos en línea (ver arriba) |

Sin cambios en componentes, estilos, tests ni `reactServerOnly()`.

Notas del paso intermedio (Astro 6.4.8), ya sin efecto en Astro 7:
- `@astrojs/react` 6.x exige Vite 8 y Astro 6 usa Vite 7; la línea compatible con Astro 6 es la 5.x (5.0.7).
- Con Astro 6, pnpm resolvía el peer de `@tailwindcss/vite` y de `vitest` a Vite 8 y el build fallaba (`Missing field tsconfigPaths`); hizo falta una `devDependency` `vite@^7.3.7` solo en ese commit. Se retiró al pasar a Astro 7, donde todo usa Vite 8.

## No hecho / pendiente

- Revisión visual manual a 320, 768, 834 y 1440 px en ES y EN y comprobación del cambio de idioma (puntos 7 y 8 de la verificación del plan): solo se hizo la comparación automática de layout descrita arriba, sin JavaScript.
- `AGENTS.md` no cambia: no ha surgido ninguna regla nueva.
- Fase 2 (TypeScript 6) y Fase 3, según el plan.

## Fase 2 · TypeScript 6.0

Rama `chore/typescript-6`, apilada sobre `chore/astro-7`.

| Paquete | Antes | Después |
|---|---|---|
| typescript | 5.9.3 | 6.0.3 |

### Compatibilidad de peers

`@astrojs/check` 0.9.10 y `typescript-eslint` 8.71.2 aceptan TypeScript 6.0.3 sin avisos. Único aviso de `pnpm install`: `astro-seo` 0.8.4 arrastra un `@astrojs/check` 0.5.10 propio cuyo peer es `typescript@^5.0.0` (`unmet peer typescript@^5.0.0: found 6.0.3`). Es una dependencia transitiva que no usamos para comprobar tipos; no afecta a `astro check` (usa el 0.9.10 directo).

### Resultados

| Comprobación | Resultado |
|---|---|
| `astro check` | 0 errores, 0 avisos, 0 hints (69 archivos) |
| `pnpm exec tsc --noEmit -p .` | sin salida (exit 0) |
| `pnpm lint` | limpio |
| `pnpm test` | 29 de 29 |
| `pnpm install --frozen-lockfile` | OK |

Sin cambios necesarios en `tsconfig.json`: ni `types: []` (los globales de Node en `astro.config.mjs`, `vitest.config.ts`, `scripts/check-i18n.mjs` y `eslint.config.js` no dan error), ni `noUncheckedSideEffectImports` (imports de CSS y Fontsource), ni obsoletos (`baseUrl`, `moduleResolution: node10`) aparecieron.

### Único cambio en el código

`astro check` dio 1 error con los tipos DOM de TS 6: en `src/components/SiteHeader.astro`, `panel.hidden` es `string | boolean` y `setOpen` espera `boolean`. Se pasa `panel.hidden === true`, que mantiene el comportamiento (el panel solo usa `true`/`false`).

### `dist` frente a la Fase 1

Los 13 HTML son idénticos salvo el script inline del menú móvil, que ahora contiene `t.hidden===!0` en lugar de `t.hidden` (mismo comportamiento). Sitemaps idénticos salvo `lastmod`.

### Tiempo de build

`pnpm build` (con `astro check`), `dist` borrado antes de cada ejecución:

| Ejecución | Fase 1 (Astro 7.4) | Fase 2 (TS 6.0) |
|---|---|---|
| 1 | | 8 247 ms |
| 2 | | 8 257 ms |
| 3 | | 8 237 ms |
| **Mediana** | **8 265 ms** | **8 247 ms** |

## Quitar React (iconos SVG)

Rama `chore/remove-react`, apilada sobre `chore/typescript-6`. Corresponde a P1 de [upgrades.md](../upgrades.md).

### Qué cambia

React solo pintaba en servidor los iconos de `@tabler/icons-react`. Ahora cada icono se importa por ruta desde `@tabler/icons` (3.49.0) y Astro lo inserta en línea como componente SVG:

```astro
import IconDownload from "@tabler/icons/outline/download.svg";
<IconDownload width={18} height={18} stroke-width={2.2} aria-hidden="true" />
```

| Paquete | Antes | Después |
|---|---|---|
| @tabler/icons | | 3.49.0 (nuevo) |
| @tabler/icons-react, @astrojs/react, react, react-dom, @types/react, @types/react-dom | 3.49.0, 7.1.0, 19.2.9, 19.2.9, 19.2.18, 19.2.7 | eliminados |

| Archivo | Cambio |
|---|---|
| 10 componentes `.astro` (13 iconos) | Importación por ruta; `size` pasa a `width`/`height`, `stroke` a `stroke-width`, `className` a `class` |
| `src/components/home/NowCard.astro` | La prop `icon` pasa de `Icon` (tabler-react) a `SvgComponent` de `astro/types`; sin `any` ni `unknown` |
| `astro.config.mjs` | Fuera la integración de React y el wrapper `reactServerOnly()` |
| `tsconfig.json` | Fuera `jsx` y `jsxImportSource` (no queda ningún `.tsx`) |
| `AGENTS.md` | La regla de iconos pide `@tabler/icons` en SVG por ruta, sin React |
| `eslint.config.js` | Sin cambios: el bloque `**/*.tsx` es inofensivo y `jsx-a11y-recommended` de Astro queda intacto |

### Resultados

| Comprobación | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | OK, sin avisos de peers |
| `pnpm lint` | limpio |
| `pnpm test` | 29 de 29 |
| `pnpm build` (`astro check`) | 0 errores, 0 avisos, 0 hints (69 archivos); 12 páginas |

### SVG en `dist` frente a la Fase 1 (Astro 7.4, con React)

Se compararon los 150 `<svg>` de los 13 HTML (script propio, atributo a atributo). `width`, `height`, `stroke-width`, `stroke`, `fill`, `viewBox`, `stroke-linecap`, `stroke-linejoin` y `aria-hidden` son idénticos en todos: el `stroke-width` pasado al componente sustituye al del archivo SVG. Las únicas diferencias:

- Falta `xmlns` (124 SVG): innecesario en HTML en línea.
- La clase `tabler-icon tabler-icon-<nombre>` desaparece (queda solo la clase que se pasa, p. ej. `arrow hidden laptop:block`, que sigue funcionando). Ningún CSS ni JS del proyecto la usaba (`grep` sin resultados).
- Cada SVG lleva un `<path stroke="none" fill="none" d="M0 0h24v24H0z"/>` inicial, propio de los archivos de tabler, que no se ve.

### `dist`, instalación y build

| Métrica | Antes | Después |
|---|---|---|
| `dist/_astro` JS | 16 365 B | 16 365 B (ya se evitaba `client.*.js` con el wrapper) |
| `dist/_astro` CSS | 52 282 B | 52 282 B |
| HTML de las 13 páginas | 487 487 B | 484 963 B |
| `pnpm-lock.yaml` | 232 003 B | 227 643 B |
| Paquetes en el lockfile | 1 253 | 1 240 |
| `node_modules/.pnpm` (instalación limpia) | 617 carpetas, 397 686 kB | 609 carpetas, 349 233 kB |

`pnpm build` (con `astro check`), `dist` borrado antes de cada ejecución:

| Ejecución | Fase 2 (TS 6.0) | Sin React |
|---|---|---|
| 1 | 8 247 ms | 8 062 ms |
| 2 | 8 257 ms | 7 743 ms |
| 3 | 8 237 ms | 7 855 ms |
| **Mediana** | **8 247 ms** | **7 855 ms** |

### Lighthouse 12.2.1 (móvil, una pasada por ruta)

Rendimiento / accesibilidad / buenas prácticas / SEO: 99 / 100 / 96 / 100 en las 8 rutas, antes y después. LCP, TBT y bytes totales:

| Ruta | LCP antes → después | TBT antes → después | Bytes antes → después |
|---|---|---|---|
| / | 2,19 → 2,26 s | 39 → 35 ms | 527 291 → 527 290 |
| /proyectos | 2,18 → 2,18 s | 8 → 4 ms | 240 834 → 240 834 |
| /trayectoria-profesional | 1,96 → 1,96 s | 16 → 14 ms | 148 210 → 148 220 |
| /sobre-mi | 2,26 → 2,26 s | 13 → 16 ms | 290 905 → 290 912 |
| /en | 2,26 → 2,11 s | 39 → 43 ms | 527 158 → 527 164 |
| /en/projects | 2,18 → 2,18 s | 6 → 4 ms | 240 693 → 240 698 |
| /en/career | 1,95 → 1,96 s | 14 → 14 ms | 148 162 → 148 173 |
| /en/about-me | 2,25 → 2,25 s | 23 → 18 ms | 290 794 → 290 803 |

CLS sin cambios (0,000 a 0,018). Las diferencias están dentro del ruido de una sola pasada.

### Conclusión

El beneficio está en mantenimiento y en la instalación, no en el peso servido: el wrapper `reactServerOnly()` ya evitaba enviar React al cliente. Se eliminan 6 dependencias directas, 13 paquetes del lockfile y el riesgo de las versiones de `@astrojs/react`.
