# Plan de migración: Astro 7.4, React y TypeScript

Revisión del 17-10-2026, hecha sobre `master` con el rediseño ya fusionado (`51bcfd1`) y el arreglo de PR #4 (`bf3a4aa`). Las versiones salen de `pnpm view`; los cambios, del [CHANGELOG de astro@7.4.0](https://github.com/withastro/astro/blob/astro%407.4.0/packages/astro/CHANGELOG.md) y de las guías oficiales enlazadas. Complementa a [`docs/upgrades.md`](../upgrades.md), donde ya se analizaron los saltos 5 → 6 → 7.

La explicación visual de las novedades está en [`novedades.html`](./novedades.html).

## Resumen

| Paquete | Ahora | Objetivo | Último publicado | Decisión |
|---|---|---|---|---|
| astro | 5.18.2 | **7.4.0** | 7.4.0 | ✅ Migrar (pasando por 6.4.8 como paso intermedio verificado) |
| @astrojs/react | 4.4.2 | **7.1.0** | 7.1.0 | ✅ Va con Astro 7 |
| vite (vía Astro) | 6.x | **8.3.x** (Rolldown) | 8.3.4 | ✅ Lo arrastra Astro 7 |
| sharp | 0.34.5 | **0.35.x** | 0.35.5 | ✅ Astro 7.4 pide `^0.35.4` |
| react / react-dom | 19.2.9 | **19.2.x** (sin cambios) | 19.3.1 | ⚠️ 19.1 sería **bajar de versión**; ver abajo |
| typescript | 5.9.3 | **6.0.3** | 7.0.2 | ⚠️ 7.0 **bloqueado** por `astro check`; ver abajo |
| Node (`engines`) | 24.x | 24.x | — | Sin cambios. Astro 7.4 pide ≥ 22.22 |

### React 19.1: no aplica

El proyecto ya usa **React 19.2.9** (`~19.2.3` en `package.json`). Pasar a 19.1 sería un *downgrade* que pierde arreglos sin aportar nada. Además, tras el rediseño React **solo renderiza en servidor** los iconos de `@tabler/icons-react` (no hay islas `client:*` ni archivos `.tsx`), así que su versión no afecta a lo que descarga el visitante.

Opciones, de mejor a peor:
1. **Mantener 19.2.x** (recomendado en este plan). `@astrojs/react` 7.1 acepta `^19.0.0`.
2. **Quitar React** (propuesta P1 de `upgrades.md`): iconos de `@tabler/icons` como SVG nativos de Astro. Elimina `react`, `react-dom`, `@astrojs/react`, `@types/react*` y el wrapper `reactServerOnly()`. Sería un PR aparte, antes o después de esta migración.
3. React 19.3.1: sin coste en cliente (no se hidrata nada), pero tampoco aporta nada que usemos.

### TypeScript 7.0: bloqueado, se migra a 6.0

- `@astrojs/check` 0.9.10 declara `typescript: ^5.0.0 || ^6.0.0`.
- Astro 7.3.4 cambió el error de `astro check` con TS 7 para decir que **no está soportado** y que solo se puede probar de forma experimental con TS **7.1** (hoy en `dev`) y `@astrojs/ts-content-mapper`.
- `typescript-eslint` 8.71.2 pide `typescript >=4.8.4 <6.1.0`.
- TS 7.0.2 no expone la API programática clásica (solo `typescript/unstable/*`).

Así que el objetivo es **TypeScript 6.0.3** y dejar TS 7 como fase opcional cuando salga 7.1 estable y lo soporten `@astrojs/check` y `typescript-eslint`.

## Qué nos afecta de Astro 6 y 7

Ya analizado en `upgrades.md`; resumen aplicado al código actual:

| Cambio | Versión | ¿Nos afecta? | Acción |
|---|---|---|---|
| Node ≥ 22.22 | 7.0 | Sí, **en local** (Node 20.18) | `.node-version` con `24` (fnm `--use-on-cd`) |
| Vite 8 + Rolldown | 7.0 | Sí: `reactServerOnly()` envuelve `astro:config:setup` | Verificado: `getRenderer()` en 7.1 sigue devolviendo `{ name, clientEntrypoint, serverEntrypoint }`; el wrapper debería seguir funcionando. Comprobar que no se emite `client.*.js` |
| Compilador en Rust | 7.0 | Posible: falla con HTML inválido | Arreglar lo que aflore (mejora de a11y/SEO) |
| `compressHTML: 'jsx'` por defecto | 7.0 | Posible: espacios entre inline (texto + `<a>`, icono + texto, `StableLabel`) | Revisión visual; si algo se pega, `compressHTML: true` o `{" "}` explícito |
| APIs obsoletas de `astro:transitions` | 7.0 | No: usamos `<ClientRouter />` y eventos `astro:*` por nombre | — |
| Imágenes: recorta y no amplía; estilos responsive con clase | 6.0 | Posible en `<Image>`/`<Picture>` | Comparar dimensiones en `dist/` y revisión visual |
| `<script>`/`<style>` en orden de escritura | 6.0 | Posible en `Layout.astro` (`is:inline` + script de ciclo de vida) | Revisar orden en `<head>` |
| `i18n.routing.redirectToDefaultLocale` | 6.0 | No (`prefixDefaultLocale: false`) | Probar rutas ES/EN y 404/500 |
| Zod 4, Sätteri, `src/fetch.ts` reservado | 6/7 | No | — |
| `getViteConfig()` + Vitest 5 | 6/7 | Vitest 5.0.5 acepta `vite ^8` | Ejecutar `pnpm test` |

## Novedades que aprovechamos

Solo las que tienen sentido en un sitio estático de 12 páginas (detalle en `novedades.html`):

- **Builds más rápidos**: Vite 8 (Rolldown) + compilador en Rust. Medir antes/después.
- **`astro build --timings`** (7.4): resumen de qué consume tiempo en el build.
- **HTML válido obligatorio** (7.0): el compilador falla con etiquetas sin cerrar o anidado inválido.
- **API de fuentes** (estable desde 6): `fonts` + `<Font preload>` sustituye a Fontsource + los `?url` del `Layout`, y genera *fallbacks* métricos (menos CLS). 7.3.6 arregla el proveedor `fontsource` con el sufijo `Variable`. Fase opcional.
- **Rendimiento del dev server** (7.3.x): HMR de estilos más estable y sin reevaluar todo el grafo.
- **`astro preview --background` / `--ignore-lock`** (7.2/7.3): útil para Lighthouse y E2E en local.

Descartadas por no aplicar: caché de rutas y `routeRules`, routing avanzado (`astro/hono`, `astro/fetch`), colecciones en vivo, sesiones, `experimental.parallelPrerender` e `incrementalBuild` (12 páginas: mejora inapreciable), CSP (incompatible con `<ClientRouter />`).

## Fases y PRs

Rama base: `master` con PR #4 fusionado. PRs pequeños, título `[ivanciudaddevportfolio] …`.

### Fase 0 · Preparación (`chore/astro7-prep`)
1. Añadir `.node-version` con `24`.
2. Quitar `@astrojs/vercel` (no se importa; sitio `output: 'static'`) y sacar `vercel` de `dependencies`.
3. Medir la línea base y guardarla en `docs/migracion-astro-7/baseline.md`:
   - tiempo de `pnpm build` (3 ejecuciones, mediana),
   - tamaño de `dist/` y de `dist/_astro` (gzip -9),
   - Lighthouse en las 8 rutas (móvil),
   - copia de `dist/**/*.html` para comparar después.

### Fase 1 · Astro 7.4 (`chore/astro-7`)
Commits separados para poder bisecar:
1. `astro@^6.4.8` + `@astrojs/react` compatible + `pnpm build`/`test`/`lint` en verde. Revisar imágenes y orden de `<head>`.
2. `astro@^7.4.0`, `@astrojs/react@^7.1.0`, `sharp@^0.35.4`. Arreglar errores del compilador Rust.
3. Ajustar `compressHTML` solo si la revisión visual lo pide.
4. Actualizar `AGENTS.md` y `upgrades.md` con lo aprendido (p. ej. versión mínima de Node en local).

### Fase 2 · TypeScript 6.0 (`chore/typescript-6`)
1. `typescript@^6.0.3`.
2. Revisar `types: []` por defecto (globales de Node en `astro.config.mjs`, `vitest.config.ts`, `scripts/check-i18n.mjs`) y `noUncheckedSideEffectImports` (imports de CSS y Fontsource).
3. `pnpm build` (incluye `astro check`) sin errores ni avisos.

### Fase 3 · Opcional
- API de fuentes de Astro (quita 3 dependencias de Fontsource y los `?url`). Medir CLS/LCP.
- Quitar React (P1).
- TypeScript 7.1 cuando lo soporten `@astrojs/check` y `typescript-eslint`.

## Ejecución con agentes

- **Sonnet** implementa cada fase (código, `package.json`, lockfile, configuración). Recibe este plan y la fase concreta, trabaja en su rama y no hace push.
- **Opus** (esta sesión) revisa el diff, ejecuta la verificación y abre los PRs tras confirmación.
- Una fase cada vez: la Fase 1 depende de la 0 y la 2 de la 1 (comparten `package.json` y `pnpm-lock.yaml`).

## Verificación (cada fase)

Con Node 24 (como CI y Vercel):
1. `pnpm install --frozen-lockfile` sin avisos de peers.
2. `pnpm lint`, `pnpm test` (29 tests) y `pnpm build` (`astro check`: 0 errores, 0 avisos).
3. Diff de `dist/**/*.html` contra la línea base: solo cambios esperados (hashes, espacios). Atención a `<head>`: canonical, hreflang, JSON-LD, preloads.
4. `dist/sitemap-0.xml` igual que antes.
5. No se emite `client.*.js` de React; JS de cliente ≈ 5 kB gzip.
6. Lighthouse en las 8 rutas: Accesibilidad 100, SEO 100, Performance ≥ 98.
7. Revisión visual a 320, 768, 834 y 1440 px en ES y EN, sin scroll horizontal.
8. Cambio de idioma: sin animaciones repetidas, header estable y scroll conservado (lo de PR #4).
9. `astro build --timings` y tiempo de build frente a la línea base.

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| El wrapper `reactServerOnly()` deja de impedir `client.*.js` | Baja | Comprobar `dist/_astro`; alternativa: quitar React (P1) |
| `compressHTML: 'jsx'` pega texto e iconos | Media | Revisión visual; `compressHTML: true` |
| El compilador Rust rechaza HTML del rediseño | Baja-media | Arreglarlo: es HTML inválido de verdad |
| Cambios en `<Image>` (recorte, sin ampliar) | Media | Diff de dimensiones y revisión visual |
| Node 20 en local rompe `astro dev` | Alta sin Fase 0 | `.node-version` |
| `types: []` de TS 6 oculta globales de Node | Media | Añadir `"types": ["node"]` donde haga falta |
