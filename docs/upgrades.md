# Actualización de dependencias

Revisión del 16-10-2026, hecha sobre `master` (`1c4b7da`). Inventario con `pnpm outdated` y `pnpm view <paquete>@<major> version`. Todas las novedades citadas salen del changelog o de la guía oficial enlazada; lo que no se ha podido comprobar se marca como **por verificar**.

## Resumen

- **Aplicado en esta rama** (`chore/deps-upgrades`): solo saltos patch/minor sin cambios incompatibles. Verificado con Node 24.22 (el de `engines`): `pnpm lint`, `pnpm test` (20 tests) y `pnpm build` (`astro check`: 0 errores, 0 avisos, 0 hints; 12 páginas).
- **React se queda en 19.2.x a propósito.** React 19.3 hace crecer el runtime de cliente `client.*.js` de 58,2 kB a 66,8 kB en gzip (+8,6 kB, +14,8 %). Se ha medido compilando con ambas versiones y el resto de dependencias igual. En `master` React se hidrata en islas (`client:visible`, `client:idle`), así que ese coste llegaría a todos los visitantes sin aportar nada que usemos.
- **Saltos major: solo propuestos.** Astro 5 → 7, ESLint 10, TypeScript 6/7, pnpm 11, @vercel/* 2, astro-seo 1, sharp 0.35.
- **La mejora con más impacto no es una versión:** quitar React por completo y pintar los iconos con `@tabler/icons` en SVG (ver [P1](#p1-quitar-react-iconos-de-tabler-en-svg)).

## Inventario

Leyenda del salto: **patch** / **minor** / **major**. En los paquetes `0.x`, cambiar el minor se considera major.

| Paquete | Actual | Último en su major | Último | Salto | Riesgo | Estado |
|---|---|---|---|---|---|---|
| astro | 5.16.7 | 5.18.2 | 7.4.0 | minor / major ×2 | Bajo / **Alto** | ✅ 7.4.0 (rama `chore/astro-7`, ver [resultados](./migracion-astro-7/results.md)) |
| @astrojs/check | 0.9.6 | 0.9.10 | 0.9.10 | patch | Bajo (requiere Node ≥ 20.19, ver nota) | ✅ |
| @astrojs/sitemap | 3.6.1 | 3.7.4 | 3.7.4 | minor | Bajo (cambia la URL de la home) | ✅ |
| @astrojs/react | 4.4.2 | 4.4.2 | 7.1.0 | major ×3 | Alto (va con Astro 6/7) | ✅ 7.1.0 con Astro 7.4 · o eliminar (P1) |
| @astrojs/vercel | 9.0.3 | 9.0.5 | 11.0.15 | patch / major | — | ✅ 9.0.5 · **no se usa**: proponer eliminarlo |
| tailwindcss / @tailwindcss/vite | 4.1.18 | 4.3.3 | 4.3.3 | minor | Bajo | ✅ |
| react / react-dom | 19.2.3 | 19.3.1 | 19.3.1 | patch (19.2.9) / minor | Medio (+8,6 kB gz medidos) | ✅ 19.2.9, fijado con `~` · 19.3 no |
| @types/react / @types/react-dom | 19.2.7 / 19.2.3 | 19.3.0 | 19.3.0 | patch | Bajo | ✅ 19.2.18 / 19.2.7 (alineados con React 19.2) |
| @tabler/icons-react | 3.36.1 | 3.49.0 | 3.49.0 | minor | Bajo | ✅ |
| @fontsource-variable/onest | 5.2.11 | 5.3.1 | 5.3.1 | minor | Bajo | ✅ |
| @fontsource-variable/source-code-pro | 5.2.7 | 5.3.1 | 5.3.1 | minor | — | ⏭️ lo quita el rediseño |
| typescript | 5.9.3 | 5.9.3 | 7.0.2 | major ×2 | Medio (6) / **Bloqueado** (7) | ✅ 6.0.3 (rama `chore/typescript-6`, ver [resultados](./migracion-astro-7/results.md#fase-2--typescript-60)) |
| eslint / @eslint/js | 9.39.5 | 9.39.5 | 10.13.0 / 10.0.1 | major | **Bloqueado** por jsx-a11y | Esperar |
| eslint-plugin-astro | 1.7.0 | 1.7.0 | 3.2.1 | major ×2 | Necesita ESLint 10 | Esperar |
| typescript-eslint, vitest, globals, eslint-plugin-jsx-a11y | 8.71.2, 5.0.5, 17.13.0, 6.10.2 | = | = | — | — | Al día |
| astro-seo | 0.8.4 | 0.8.4 | 1.2.0 | major | Bajo | Propuesto |
| @vercel/analytics | 1.6.1 | 1.6.1 | 2.0.1 | major | Bajo | Propuesto |
| @vercel/speed-insights | 1.3.1 | 1.3.1 | 2.0.0 | major | Bajo (sin notas publicadas) | Propuesto |
| vercel (CLI) | 50.1.6 | 50.44.0 | 64.3.1 | major | — | Proponer sacarlo de `dependencies` |
| sharp | 0.34.5 | 0.34.5 | 0.35.5 | major (0.x) | Ligado a Astro | ✅ 0.35.5 con Astro 7.4 |
| @types/node | 16.18.11 (transitivo, por el peer de vite) | — | 26.6.5 | — | Bajo | ✅ añadido `^24.19.2` en dev |
| framer-motion, clsx, tailwind-merge, autoprefixer, postcss | 12.24.10, 2.1.1, 3.4.0, 10.4.23, 8.5.6 | — | 14.3.0, 2.1.1, 3.7.0, 10.6.1, 8.5.30 | — | — | ⏭️ los quita el rediseño |
| Node (`engines`) | 24.x | — | — | — | — | Sin cambios (Astro 6/7 piden ≥ 22.12 / ≥ 22.22) |
| pnpm (`packageManager`) | 10.27.0 | 10.34.7 | 12.14.0 | minor / major | Bajo / Medio | Propuesto |

### Notas sobre lo aplicado

- **`@types/node`**: no se declaraba en el proyecto, así que vite resolvía su peer opcional con `@types/node@16.18.11`, fuera de su rango (`^18 || ^20 || >=22`). Al declarar `^24.19.2` (el mismo major que `engines.node`), `pnpm install` deja de avisar.
- **`@astrojs/check` 0.9.10 ya no funciona con Node 20.18**: su `language-server` hace `require()` de un módulo ESM (`ERR_REQUIRE_ESM`). En Node 24 (CI y Vercel) va bien. En local hace falta Node ≥ 20.19 o, mejor, el 24 (ver P6).
- **Sitemap 3.7.4**: la única diferencia en `dist/sitemap-0.xml` es `<loc>https://www.ivanciudad.com</loc>` → `<loc>https://www.ivanciudad.com/</loc>`, por el arreglo de la home con `trailingSlash: "never"` ([#17851](https://github.com/withastro/astro/pull/17851)). Ahora coincide con el `hreflang` que ya se emitía (`href="https://www.ivanciudad.com/"`). El `rel="canonical"` de la home sigue sin barra. Para Google, la raíz con y sin barra es la misma URL, pero conviene unificarlo (P7). 3.7.3 también mejora el `<lastmod>` del índice ([#16837](https://github.com/withastro/astro/pull/16837)).
- **Tailwind 4.3**: el CSS crece 441 B (122 B en gzip). Trae utilidades nuevas (`scrollbar-*`, `scrollbar-gutter-*`, `zoom-*`, `@container-size`), `pbs-*`/`mbs-*`/`inset-s-*` lógicas, y deja obsoletos `start-*`/`end-*`, que no usamos (solo `col-start-*`/`row-start-*`, que no cambian). Por accesibilidad, Preflight ya no pisa el `:focus-visible` nativo de los `iframe` en Firefox ([#20292](https://github.com/tailwindlabs/tailwindcss/pull/20292)). Fuente: [CHANGELOG](https://github.com/tailwindlabs/tailwindcss/blob/main/CHANGELOG.md).
- **Astro 5.17 y 5.18**: novedades menores, como la prop `background` en `<Image />`, la opción `kernel` de Sharp, cookies `partitioned` y `security.actionBodySizeLimit`. También arreglos de seguridad en el host, las server islands y el overlay de errores. Los cambios incompatibles de 5.16.x/5.17.1 afectan solo a la API **experimental** de fuentes, que no usamos. Fuente: [CHANGELOG astro@5.18.2](https://github.com/withastro/astro/blob/astro%405.18.2/packages/astro/CHANGELOG.md).

### Medidas (build de `master` → esta rama)

| Recurso | Antes (gzip) | Después (gzip) |
|---|---|---|
| `client.*.js` (runtime de React) | 58 188 B | 58 188 B (con React 19.3 serían 66 828 B) |
| `proxy.*.js` (framer-motion) | 37 044 B | 37 044 B |
| `HeaderDock.*.js` | 12 111 B | 12 110 B |
| CSS (`about-me.*.css`) | 9 091 B | 9 213 B |
| `dist/` total | 3 439 152 B | 3 439 601 B |

Medido con `gzip -9` sobre `dist/_astro`.

## Cambios incompatibles de los saltos major

### Astro 5 → 6 ([guía oficial](https://docs.astro.build/en/guides/upgrade-to/v6/))

Lo que nos afecta:
- **Node ≥ 22.12**: ya lo cumplimos (24.x).
- **Vite 7**. Además, `getViteConfig()` (lo usa `vitest.config.ts`) solo menciona compatibilidad con **Vitest 3.2 o 4.1**, y usamos Vitest 5.0.5. **Por verificar** antes de migrar.
- **Imágenes**: el servicio por defecto **recorta** y **nunca amplía**. Los estilos responsive pasan de `style` en línea a una clase con hash y atributos `data-*`. Hay que revisar visualmente `<Image>` en `AboutMe`, `CareerStepper` y `HomeView`.
- **`<script>`/`<style>` se emiten en el orden en que están escritos** (antes, en orden inverso). Hay que revisar los estilos de `Layout.astro`.
- **`i18n.routing.redirectToDefaultLocale` pasa a `false` por defecto** y solo actúa con `prefixDefaultLocale: true`. Usamos `false`, así que no nos afecta. Aun así, hay que probar las rutas ES/EN y los 404/500.
- `import.meta.env` siempre se inserta como literal; Zod 4.
- Se elimina `<ViewTransitions />`. Ya usamos `<ClientRouter />`, así que no nos afecta.

### Astro 6 → 7 ([guía oficial](https://docs.astro.build/en/guides/upgrade-to/v7/))

- **Nuevo compilador en Rust**: ya no corrige el HTML. Las etiquetas sin cerrar dan error y el anidado inválido (p. ej. un `<div>` dentro de un `<p>`) ya no se arregla solo. Es un riesgo, pero también **una mejora de accesibilidad y SEO**: aflora HTML inválido que hoy pasa sin aviso.
- **`compressHTML` pasa a `'jsx'` por defecto**: puede desaparecer el espacio entre elementos en línea (texto + `<a>`, iconos + texto). Hay que revisarlo visualmente o fijar `compressHTML: true`.
- **Vite 8 (Rolldown)**: la compatibilidad con integraciones o plugins que tocan las tripas de Vite puede romperse. En el rediseño, `reactServerOnly()` envuelve el hook `astro:config:setup` de `@astrojs/react`, justo lo más frágil.
- `.md`/`.mdx` pasan a usar Sätteri. No tenemos Markdown, así que no nos afecta.
- `src/fetch.ts` pasa a ser un nombre reservado. No existe, así que no nos afecta.

### React 19.2 → 19.3 ([post oficial](https://react.dev/blog/2026/09/09/react-19-3))

`<ViewTransition>` y las refs en `Fragment` pasan a estables, y se añaden `browser()` y soporte de Trusted Types. No los usamos (las transiciones las hace el `ClientRouter` de Astro) y cuesta +8,6 kB gzip medidos. **No aplicar mientras React se hidrate en el cliente.**

### TypeScript 6 / 7

- **6.0** ([anuncio](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)): `strict` pasa a ser el valor por defecto (ya lo tenemos), `types: []` por defecto, `noUncheckedSideEffectImports: true`, y se marcan como obsoletos `baseUrl`, `moduleResolution: node10`, etc. Es compatible con nuestra cadena: `@astrojs/check` ≥ 0.9.9 acepta `^6` ([changelog](https://github.com/withastro/astro/blob/main/packages/language-tools/astro-check/CHANGELOG.md)) y `typescript-eslint` 8.71 acepta `<6.1`. Riesgo medio: `types: []` puede ocultar los globales de Node a `astro.config.mjs` y `vitest.config.ts`.
- **7.0** ([anuncio](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)): es el port nativo, con builds 8-12× más rápidos, pero **no expone API programática**. El propio anuncio dice que las herramientas que integran TS para Astro/Vue/Svelte siguen necesitando la 6.0. **Bloqueado.**

### ESLint 10 ([guía de migración](https://eslint.org/docs/latest/use/migrate-to-10.0.0))

`eslint-plugin-jsx-a11y` 6.10.2 solo declara soporte hasta ESLint 9, y `eslint-plugin-astro` 2/3 exige ESLint ≥ 10. Existe el fork `eslint-plugin-jsx-a11y-x` 0.2.0, con soporte para ESLint 9 y 10 y aceptado como peer por `eslint-plugin-astro` 3.2. Cambiar el plugin de reglas de accesibilidad es una decisión aparte. **Esperar**, o probarlo en un PR propio.

### pnpm 11 ([release](https://github.com/pnpm/pnpm/releases/tag/v11.0.0))

Exige Node 22+. `minimumReleaseAge` pasa a 1 día por defecto (bueno contra ataques a la cadena de suministro). `strictDepBuilds: true` y `allowBuilds` sustituyen a `onlyBuiltDependencies`: hoy pnpm ignora los scripts de build de `esbuild` y `sharp`, así que con `strictDepBuilds` la instalación **fallaría** hasta declararlos. Además, `.npmrc` pasa a leerse solo para autenticación y registro. La 12.x no se ha revisado.

### Otros

- **astro-seo 1.x** ([releases](https://github.com/jonasmerlin/astro-seo/releases)): el único cambio incompatible es exigir Astro ≥ 5.16, que ya cumplimos. 1.1 añade `noarchive`, `robotsExtras` y `removeTrailingSlashForRoot`, que serviría para controlar la barra de la home en el canonical (P7). 1.2 permite omitir el canonical pasando `null`.
- **@vercel/analytics 2.0** ([releases](https://github.com/vercel/analytics/releases)): según las notas, solo cambia la licencia (MPL-2.0 → MIT) y añade soporte de Nuxt. **@vercel/speed-insights 2.0** no publica notas, así que **por verificar** que `@vercel/speed-insights/astro` sigue existiendo.
- **sharp 0.35** ([changelog](https://sharp.pixelplumbing.com/changelog/v0.35.0/)): Node ≥ 20.9, AVIF con calidad ajustada por SSIMULACRA2 y WebAssembly ya estable. Astro 5.18 depende de `sharp ^0.34.0`, así que hay que actualizarlo junto con Astro.

## Mejoras propuestas (por beneficio / esfuerzo)

| # | Mejora | Beneficio | Esfuerzo | Depende de |
|---|---|---|---|---|
| P1 | Quitar React: iconos de `@tabler/icons` en SVG | Alto (bundle, mantenimiento, desbloquea Astro 6/7) | Medio | Rediseño fusionado |
| P2 | Quitar `@astrojs/vercel` y sacar `vercel` de `dependencies` | Medio (instalación, superficie) | Bajo | — |
| P3 | Astro 7, en dos pasos (6 → 7) | Alto (build, HTML válido, fuentes, CSP) | Alto | P1 recomendado |
| P4 | API de fuentes de Astro (`fonts` + `<Font preload>`) | Medio-alto (CLS/LCP) | Bajo-medio | Astro 6 |
| P5 | astro-seo 1.x y @vercel/* 2.x | Bajo-medio | Bajo | — |
| P6 | Fijar la versión de Node en local (`.node-version`) | Medio (DX) | Muy bajo | — |
| P7 | Unificar la barra de la home en canonical, sitemap y hreflang | Bajo-medio (SEO) | Bajo | P5 |
| P8 | pnpm 10.34 y, después, pnpm 11 | Medio (seguridad de la cadena de suministro) | Bajo / Medio | — |
| P9 | CSP con `security.csp` | Medio (seguridad) | Alto | Astro 6, quitar `ClientRouter` |

### P1. Quitar React: iconos de tabler en SVG

Tras el rediseño, React solo sirve para pintar en servidor los iconos de `@tabler/icons-react`, con el hack `reactServerOnly()` en `astro.config.mjs`. `@tabler/icons` 3.49 expone los SVG con `"./*": "./icons/*"`, y Astro importa SVG como componentes desde 5.7: se insertan en línea y aceptan `width`, `height`, `stroke` y cualquier atributo de `<svg>` ([docs](https://docs.astro.build/en/guides/images/)). Por ejemplo:

```astro
---
import IconBrandGithub from "@tabler/icons/outline/brand-github.svg";
---
<IconBrandGithub width={20} height={20} aria-hidden="true" />
```

Se podrían eliminar `react`, `react-dom`, `@astrojs/react`, `@types/react*` y `reactServerOnly()`. Con eso desaparece el riesgo de React 19.3 y de los majors 5/6/7 de `@astrojs/react`, y la migración a Vite 8 queda más limpia. Afecta a 10 archivos del rediseño. Para accesibilidad, los iconos decorativos llevan `aria-hidden="true"` y los que van solos necesitan nombre accesible en el control que los contiene. Respeta la regla de AGENTS.md de importar los iconos uno a uno.

### P2. Dependencias que sobran

- `@astrojs/vercel` no se importa en ningún sitio: `astro.config.mjs` no tiene `adapter` y `output: 'static'`. Vercel despliega el `dist/` estático sin adaptador.
- `vercel` (la CLI, 50 → 64) está en `dependencies` y se instala en cada build. Si se usa en local, mejor `pnpm dlx vercel` o moverla a `devDependencies`.

### P3. Astro 7

Novedades que nos benefician, según las fuentes:
- **Build más rápido**: Vite 8 con Rolldown y el compilador en Rust. En astro.build (~308 páginas), de 62,7 s a 24,2 s ([blog Astro 7](https://astro.build/blog/astro-7/)). Hay que medirlo aquí: hoy el build tarda unos 7-15 s con 12 páginas.
- **HTML válido obligatorio**: el compilador en Rust falla con etiquetas sin cerrar y no reordena el anidado inválido. Es bueno para accesibilidad y SEO.
- La API de fuentes (P4) y la CSP (P9) llegan con la 6.
- No nos aportan nada: la caché de rutas, `routeRules`, el routing avanzado y las colecciones en vivo. El sitio es estático y no tiene contenido.

Plan: primero 5 → 6 (Vite 7, imágenes, orden de estilos, Vitest), y en otro PR 6 → 7 (compilador, `compressHTML`). Cada paso hay que verificarlo comparando `dist/` y con una revisión visual en ES y EN.

### P4. API de fuentes (Astro 6+)

El rediseño carga Onest, Bricolage Grotesque y JetBrains Mono con `@fontsource-variable/*` y precarga a mano con `?url`. Con `fonts: [{ provider: fontProviders.fontsource(), name: "Onest", cssVariable: "--font-onest" }]` y `<Font cssVariable="--font-onest" preload />`, Astro descarga y sirve las fuentes desde el propio sitio, añade los preload y **genera fallbacks optimizados** a partir de la familia genérica ([docs](https://docs.astro.build/en/guides/fonts/)). Eso reduce el CLS al cambiar de fuente. La guía v6 confirma que se quitó el flag `experimental.fonts`. Se podrían eliminar las dependencias de Fontsource y los imports `?url`. Hay que medir el CLS y el LCP con Speed Insights antes y después.

### P5. astro-seo 1.x y @vercel/* 2.x

Son majors con poco riesgo según sus notas. Van en un PR pequeño: hay que revisar el `<head>` generado (diferencias en `dist/**/*.html`) y que los scripts de Analytics y Speed Insights siguen apareciendo.

### P6. Node en local

En local está Node 20.18 (fnm, versión por defecto). Con él falla `astro check` 0.9.10 y pnpm avisa de `engines`. Un `.node-version` con `24` lo resuelve: fnm lo lee con `--use-on-cd`. `setup-node` puede seguir leyendo `engines` de `package.json`.

### P7. Barra de la home

Tras actualizar el sitemap: el `<loc>` y el `hreflang` usan `https://www.ivanciudad.com/`, pero el `canonical` es `https://www.ivanciudad.com`. Para la raíz es la misma URL, pero conviene emitir lo mismo en los tres sitios.

### P8. pnpm

Primero `packageManager: pnpm@10.34.7` (minor). Para pnpm 11 hay que declarar `allowBuilds` para `esbuild` y `sharp` en `pnpm-workspace.yaml`, revisar `.npmrc` y comprobar el Node de la CI y de Vercel.

### P9. CSP

`security.csp` (Astro 6) genera un `<meta http-equiv="content-security-policy">` con hashes de scripts y estilos, pero **no es compatible con `<ClientRouter />`** ([referencia](https://docs.astro.build/en/reference/configuration-reference/)), y los scripts externos de Vercel necesitan hashes propios. Solo merece la pena si en algún momento se quita `ClientRouter`.

## Orden recomendado (PRs pequeños)

1. **Este PR**: patch/minor seguros y `@types/node` (`[ivanciudaddevportfolio] Actualizar dependencias patch/minor`).
2. Fusionar el rediseño y resolver los conflictos en `package.json`/`pnpm-lock.yaml`. Lo más sencillo es partir del `package.json` del rediseño, volver a aplicar estas versiones y regenerar el lockfile con `pnpm install`.
3. P2 + P6: quitar dependencias sobrantes y añadir `.node-version`.
4. P1: iconos SVG y quitar React (mide el JS de cliente antes y después).
5. P5: astro-seo 1.x y @vercel/* 2.x.
6. P8: `pnpm@10.34.7`.
7. P3a: Astro 6 (con `sharp` 0.35 si Astro 6 lo admite, **por verificar**), más P4 (fuentes) en un PR propio.
8. P3b: Astro 7.
9. TypeScript 6. ESLint 10 cuando `eslint-plugin-jsx-a11y` lo soporte o se decida usar el fork.

## Qué cambia cuando se fusione el rediseño

- Elimina framer-motion, clsx, tailwind-merge, autoprefixer, postcss y source-code-pro: no se han actualizado aquí para no generar conflictos inútiles.
- Añade Fontsource para Bricolage Grotesque y JetBrains Mono: P4 los sustituiría.
- React deja de llegar al cliente (`reactServerOnly()` quita el `clientEntrypoint`). El coste de React 19.3 medido aquí dejaría de importar, pero P1 sigue siendo mejor que actualizar React.
- `package.json` y `pnpm-lock.yaml` tendrán conflictos con esta rama, porque las líneas editadas están junto a las que borra el rediseño. Son fáciles de resolver con el paso 2.
