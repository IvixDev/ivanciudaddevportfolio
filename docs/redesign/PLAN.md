# Plan de implementación del rediseño — ivanciudaddevportfolio

Objetivo: llevar a código Astro el rediseño aprobado (Inicio, Proyectos, Trayectoria, Sobre mí; móvil, tablet y escritorio),
con el nuevo design system, textos localizados ES/EN, animaciones, accesibilidad y SEO como requisitos.

## Material de referencia

| Qué | Dónde |
|---|---|
| Diseño visual (12 pantallas, navegable con Play) | https://claude.ai/artifact/VfQowbRGuRWJFuPpWpAqip — páginas Inicio, Proyectos, Trayectoria, Sobre mí |
| Design system (tokens, tipografía, componentes, movimiento, a11y) | `docs/redesign/design-system.md` |
| Textos nuevos en español | `docs/redesign/i18n/es.json` |
| Textos nuevos en inglés (misma forma exacta que `es.json`) | `docs/redesign/i18n/en.json` |
| Normas del repo (obligatorias) | `AGENTS.md` |

## Reparto de trabajo entre modelos

| Agente | Modelo | Responsabilidad |
|---|---|---|
| Orquestador | sesión principal | Rama, mediciones base, lanzar agentes, revisar diffs, verificación final, PR. No escribe código de producto. |
| **H1 — Design system** | **Haiku** (`model: "haiku"`) | Tokens, fuentes, keyframes y utilidades en `src/styles/global.css` |
| **H2 — Textos** | **Haiku** (`model: "haiku"`) | Locales `src/i18n/locales/*.json`, captions de imágenes en `astro.config.mjs` |
| **S1 — Base** | **Sonnet** (`model: "sonnet"`) | Tipado i18n, layout, header/footer, componentes UI base, datos |
| **S2a–S2d — Páginas** | **Sonnet** | Una página por agente: Inicio, Proyectos, Trayectoria, Sobre mí |
| **S3 — Limpieza, SEO y verificación** | **Sonnet** | Schema.org, hreflang, 404/500, borrar código muerto y dependencias, build |
| **H3 — Revisión de textos** | **Haiku** | Ningún texto visible fuera de i18n; paridad ES/EN; `alt` y `aria-label` localizados |

Regla de ownership: **Haiku nunca edita `.astro`/`.ts`/`.tsx` de componentes; Sonnet nunca reescribe los JSON de locales ni los tokens de `global.css`.**
Si Sonnet necesita una clave nueva, la pide al orquestador, que se la encarga a H2/H3.

Cada agente se lanza con la herramienta Agent, `subagent_type: "general-purpose"`, el `model` indicado y el brief literal de la sección «Briefs».
Los agentes que se ejecutan en paralelo tocan archivos disjuntos en la misma rama.

## Orden y dependencias

```
Fase 0  Orquestador: rama + medición base
           │
Fase 1  H1 (design system) ──┐   en paralelo
        H2 (textos) ─────────┤
           │                 │
Fase 2  S1 (base) ◄──────────┘
           │
Fase 3  S2a Inicio │ S2b Proyectos │ S2c Trayectoria │ S2d Sobre mí   en paralelo
           │
Fase 4  S3 (limpieza, SEO, build) ──► H3 (revisión de textos)
           │
Fase 5  Orquestador: verificación final, medición, PR
```

Entre fases el build puede romperse (por ejemplo, tras H2 los componentes viejos usan claves que ya no existen). Es esperado:
la condición de «build verde» se exige al final de la Fase 4, no antes.

---

## Fase 0 — Preparación (orquestador)

1. Crear rama `feat/redesign-16-10-26` desde `master`, llevándose los cambios sin commitear que quitan X (`layout.consts.ts`, `Footer.tsx`, `HeaderDock.tsx`) y la carpeta `docs/redesign`.
   Trabajar en un worktree propio para no interferir con la sesión que monta ESLint/Vitest en paralelo.
2. Medir la línea base y guardarla en `docs/redesign/baseline.md` (AGENTS.md: medir, no adivinar):
   - `pnpm build` → tiempo y salida de `astro check`.
   - Tamaño total de `dist/_astro/*.js` y `*.css` (bytes, y gzip con `gzip -c | wc -c`).
   - Lighthouse móvil de `/`, `/proyectos`, `/trayectoria-profesional`, `/sobre-mi` con `pnpm preview` (Performance, Accessibility, SEO, LCP, CLS, TBT).
3. No hay scripts `lint` ni `test` en `package.json` aunque AGENTS.md los pide; se añaden en un PR aparte (ESLint + Vitest + CI).
   **Puerta de calidad de este plan: `pnpm build`** (incluye `astro check`) más las auditorías de SEO y accesibilidad de la Fase 5.
   Si el PR de ESLint/Vitest se fusiona antes, rebasar y pasar también `pnpm lint` y `pnpm test`.

## Fase 1 — Design system y textos (Haiku, en paralelo)

### H1 — Design system
- Instalar fuentes: `pnpm add @fontsource-variable/bricolage-grotesque @fontsource-variable/jetbrains-mono`; quitar `@fontsource-variable/source-code-pro`.
- Reescribir `src/styles/global.css` con el bloque `@theme` de `design-system.md` §9, los keyframes de §7.2 y las utilidades:
  `.text-gradient`, `.reveal` (dentro de `@supports (animation-timeline: view())`), `.lift`, `.zoom`, `.arrow`, `.skip-link`,
  `:focus-visible`, `@media (prefers-reduced-motion: reduce)`, y en `html`: `scroll-padding-top: 88px` (altura del header sticky)
  y `scroll-behavior: smooth` solo dentro de `@media (prefers-reduced-motion: no-preference)`.
- Eliminar del CSS: `@font-face` a `/fonts/*.woff2`, `--font-onest`, `--font-source-code`, `.animate-shimmer`, `.layout-container`,
  las reglas de `caret-color`/`user-select` globales (perjudican la accesibilidad: impiden seleccionar texto de botones y enlaces).
- Comprobar en `node_modules/@fontsource-variable/*/index.css` el nombre exacto de cada `font-family` y usarlo en los tokens.
- Hecho cuando: `global.css` compila con `pnpm astro check` sin errores de CSS y contiene todos los tokens de §9.

### H2 — Textos
- Sustituir `src/i18n/locales/es.json` y `en.json` por `docs/redesign/i18n/es.json` y `en.json` (copiar tal cual).
- Ejecutar el script de paridad (abajo) y que devuelva 0 diferencias.
- En `astro.config.mjs` (`pageImages`): añadir `proyectos-gym-tracker.webp` a `/proyectos` y `/en/projects` con los `img_alt` de `projects.items.gym`;
  alinear captions y títulos con los `img_alt`/`title` de los JSON nuevos. No tocar nada más del config.
- Hecho cuando: JSON válidos, paridad 0, config actualizado.

Script de paridad (guardar como `scripts/check-i18n.mjs` y documentar en el PR):

```js
import es from "../src/i18n/locales/es.json" with { type: "json" };
import en from "../src/i18n/locales/en.json" with { type: "json" };
const shape = (o, p = "") => Array.isArray(o) ? o.flatMap((v, i) => shape(v, `${p}[${i}]`))
  : o && typeof o === "object" ? Object.keys(o).sort().flatMap((k) => shape(o[k], `${p}.${k}`))
  : [`${p}:${typeof o}`];
const a = new Set(shape(es)), b = new Set(shape(en));
const diff = [...a].filter((x) => !b.has(x)).concat([...b].filter((x) => !a.has(x)));
if (diff.length) { console.error(diff.join("\n")); process.exit(1); }
console.log("i18n OK");
```

## Fase 2 — Base de código (Sonnet, S1)

1. **i18n tipado** (`src/i18n/utils.ts`): eliminar `any`. `type Messages = typeof es`; `en` validado con `satisfies Messages`.
   Exponer `getMessages(lang)` que devuelve el objeto tipado (preferido en componentes: `const m = getMessages(lang); m.home.hero_title_before`)
   y mantener `useTranslations` solo si algo lo sigue necesitando, tipado por ruta. Helper `format(str, vars)` para `{count}`, `{date}`, `{year}`.
   Mantener `getOppositeLocaleUrl` e `isNavActive` (siguen leyendo `nav`).
2. **`RichText.astro`**: convierte `**texto**` en `<strong>` escapando todo lo demás. Prohibido `set:html` con contenido de los JSON.
3. **Datos no textuales** en `src/content/projects.ts`: `id`, `category: "app" | "experiment" | "game"`, imagen (import de `src/assets`),
   `ctaKey: "view_project" | "play" | "open_app"`, `external: boolean`, `featured: boolean`. El texto **y la URL** salen de `projects.items[id]`
   (`href` cambia por idioma: `/proyectos/buscaminas` frente a `/en/projects/minesweeper`, según las rewrites de `vercel.json`).
   Enlaces externos (`external: true`): `target="_blank" rel="noopener"` y el texto oculto `a11y.new_tab`.
   Lista de la cinta en `src/content/marquee.ts`: `["TypeScript","React","Next.js","Astro","Tailwind CSS","Node.js","Java · Spring Boot","Kubernetes","Google Cloud","Core Web Vitals","ArgoCD","IA aplicada"]`
   (la última entrada no es un nombre propio: se pinta con la clave `home.marquee_ai`, «IA aplicada» / «Applied AI»).
4. **Componentes UI** en `src/components/ui/`: `Button.astro` (variantes de §6.1, renderiza `<a>` o `<button>`), `Chip.astro`, `Tag.astro`,
   `GradientText.astro`, `SectionHeader.astro`, `Logo.astro` (SVG de `LogoIcon` con prop `animated`). Iconos: `@tabler/icons-react`
   importados uno a uno y renderizados **sin** directiva `client:*` (HTML estático, cero JS).
5. **Layout** (`src/layouts/Layout.astro`):
   - Quitar el script de tema claro/oscuro con `localStorage` (la web es solo oscura) y el `radial-gradient` del `body`.
   - Mantener `ClientRouter`; todo script nuevo se inicializa en `astro:page-load`.
   - `<a class="skip-link" href="#contenido">` primero; `<main id="contenido" tabindex="-1">` sin el contenedor de anchos actual
     (cada sección gestiona su contenedor de 1200 px).
   - Preload de Onest y Bricolage (latin). Color crítico inline `#0B1120`.
   - **Corregir hreflang**: `esUrl` apunta hoy a `https://www.ivanciudad.es…`; debe ser `https://www.ivanciudad.com…` como `SITE`.
6. **`SiteHeader.astro`** (sustituye a `HeaderDock.tsx`): §6.5. Menú móvil con `<button aria-expanded aria-controls>` y un `<script>` ESM
   que abre/cierra, cierra con Escape y devuelve el foco. `LanguageSwitch.astro` con `getOppositeLocaleUrl`, `hreflang` y `lang`.
7. **`SiteFooter.astro`** (sustituye a `Footer.tsx`): logo, copyright con año, «Hecho con…», enlaces GitHub/LinkedIn/Email (sin X)
   y enlace `footer.source_code` a `https://github.com/IvixDev/ivanciudaddevportfolio`;
   en móvil incluye `<nav aria-label={a11y.footer_nav}>` con las 4 páginas.
8. **Enlaces al CV**: siempre `career.cv_url` con `type="application/pdf"` y `hreflang="es"`; en inglés se añade `common.cv_language_note`
   («(in Spanish)») porque de momento solo existe el CV en español.
- Hecho cuando: Layout, header y footer renderizan en las 8 rutas (ES/EN) con los textos nuevos y `astro check` no da errores en estos archivos.

## Fase 3 — Páginas (Sonnet, S2a–S2d en paralelo)

Reglas comunes para los cuatro agentes:
- Un solo marcado responsive con Tailwind (`tablet:`, `laptop:`); nada de componentes distintos por dispositivo.
  Las variantes `*_short` del JSON se muestran solo en móvil (`tablet:hidden` / `hidden tablet:inline`).
- Imágenes con `<Image>` de `astro:assets`, `widths` y `sizes` reales; la imagen LCP de cada página con `loading="eager" fetchpriority="high"`, el resto lazy.
- Entradas del hero con `animate-up` + `animation-delay`; secciones con `.reveal`; tarjetas con `.lift`/`.zoom`.
- Un único `h1`; `h2` por sección; textos solo desde i18n; colores solo por tokens.
- Archivos de la página en `src/views/<Página>View.astro` y componentes en `src/components/<página>/`. No tocar archivos de otra página.

### S2a — Inicio (`HomeView.astro`, `src/components/home/`)
Hero (eyebrow, h1 con `GradientText`, subtítulo, CTAs, redes, retrato con anillo `animate-spin-slow`, `TerminalCard` flotante),
`TechMarquee`, proyectos (destacado eShop + 3 tarjetas; en móvil tarjetas compactas), «Ahora mismo» (3 `NowCard`),
«Sobre mí» (3 fotos en cuadrícula, sin scroll horizontal), `ContactBlock`. Conservar los dos `<script type="application/ld+json">`.

### S2b — Proyectos (`ProjectsView.astro`, `src/components/projects/`)
Hero con contador `aria-live`, filtro (`aria-pressed`) por categoría implementado con `<script>` ESM que oculta con `hidden`;
**sin JS se ven todos** y el HTML servido siempre contiene los 4 proyectos (SEO). Filas alternas en escritorio, apiladas en tablet/móvil.
Bloque «¿Se te ocurre algo…?». Usar `t("projects.url")`, que ahora existe (antes la canónica salía literalmente como `"projects.url"`).

### S2c — Trayectoria (`CareerView.astro`, `src/components/career/`, sustituye `CareerStepper.astro`)
Intro con retrato y CTA de CV (`career.cv_url`), `ExperienceTimeline` (`<ol>`, punto actual con `animate-pulse-ring`),
estudios, `StackGroups` (7 grupos de `career.stack`; el de `wide: true` ocupa todo el ancho), CTA final de CV.

### S2d — Sobre mí (`AboutView.astro`, `src/components/about/`, sustituye `AboutMe.astro`)
Intro (h1 + `origin` + `work` con `RichText` + foto de Japón con hover `tilt`), secciones Pasiones y Construir alternadas,
`FavoritesTabs` con patrón WAI-ARIA completo (flechas, Home/End, `aria-selected`, `tabpanel`; sin JS se ven las 3 listas), CTA.

- Hecho cuando (cada S2): la página coincide con su diseño en 390, 834 y 1440 px; no hay scroll horizontal; navegable con teclado.

## Fase 4 — Limpieza, SEO y verificación (Sonnet S3, luego Haiku H3)

### S3
- `src/helpers/schema.helper.ts` y `seo.helper.ts`: adaptar a las claves nuevas (`projects.items.*`, `about.*`, `career.*`). Añadir GymTracker al ItemList de proyectos.
- **Quitar los metadatos de X**: `creator`/`site: "@Mrivix"` en `seo.helper.ts`, `404View.astro` y `500View.astro`. Se mantiene la tarjeta
  `twitter:card = summary_large_image` (la usan otras plataformas para la vista previa), sin handle.
- `jobTitle` de Schema.org se queda en «Senior Frontend Developer» (decisión de Iván).
- Restyle de `404View`/`500View` con los componentes nuevos.
- Borrar: `HeaderDock.tsx`, `Footer.tsx`, `ProjectCard.tsx`, `ProjectCardMobile.tsx`, `TechBadge.tsx`, `ScrollReveal.tsx`, `CareerStepper.astro`, `AboutMe.astro`, `public/fonts/*` si nada los usa.
- Dependencias: quitar `framer-motion`, `clsx`, `tailwind-merge`, `autoprefixer`, `postcss` si ya no se importan. **No quitar React** mientras se use `@tabler/icons-react`.
- `pnpm build` en verde (0 errores, 0 warnings de `astro check`). `node scripts/check-i18n.mjs` en verde.
- `grep` de control: ningún `any` nuevo; ningún hex de color en `src/components` ni `src/views`; ningún import de barrel de tabler.

### H3 — Revisión de textos
- Buscar texto visible escrito a mano en `.astro` (fuera de `t()`/`getMessages`) y listar archivo:línea. Si falta una clave, añadirla en ES y EN.
- Verificar que todo `alt`, `aria-label` y `title` sale de i18n y está traducido.
- Revisar ortografía y tildes de ambos idiomas. Volver a pasar el script de paridad.

## Fase 5 — Verificación final y PR (orquestador)

Checklist (todo con evidencia en el PR):
- [ ] `pnpm build` verde y `node scripts/check-i18n.mjs` verde.
- [ ] Las 8 rutas (ES + EN) cargan; navegación entre páginas y cambio de idioma conservan la ruta equivalente.
- [ ] En 390, 834 y 1440 px: `document.documentElement.scrollWidth <= innerWidth` en todas las rutas.
- [ ] Teclado: skip link, menú móvil (abrir, Escape, foco), filtro, tabs con flechas; foco siempre visible.
- [ ] `prefers-reduced-motion: reduce` desactiva todas las animaciones.
- [ ] Lighthouse móvil de las 4 páginas ES: Accessibility ≥ 95, SEO = 100; comparar Performance, LCP, CLS y peso de JS/CSS con `baseline.md`.
      Si algo empeora, instrumentar y explicar antes de optimizar.
- [ ] `hreflang` y `canonical` correctos en las 8 rutas; JSON-LD válido.
- PR: título `[ivanciudaddevportfolio] Rediseño del portfolio con nuevo design system`, descripción con qué cambia, por qué, cómo se ha verificado y la tabla antes/después.

---

## Briefs para los agentes

Pasar cada brief tal cual en el `prompt`, sustituyendo nada. Todos empiezan con el mismo encabezado:

> Trabajas en el repo `ivanciudaddevportfolio` (Astro 5, Tailwind v4, TypeScript estricto, pnpm), rama `feat/redesign-16-10-26`.
> SEO y accesibilidad son requisitos, no extras: cumple la sección «Requisitos de SEO y accesibilidad» de PLAN.md en todo lo que toques.
> Lee primero `AGENTS.md` y `docs/redesign/PLAN.md` (tu tarea está en él) y `docs/redesign/design-system.md`.
> Usa solo pnpm. No hagas commit ni push. Toca solo los archivos de tu tarea. Al terminar, responde con: archivos cambiados,
> comandos ejecutados con su resultado, y cualquier duda o clave i18n que falte.

- **H1 (haiku):** «Ejecuta la tarea H1 — Design system de PLAN.md. Hecho cuando se cumpla su criterio.»
- **H2 (haiku):** «Ejecuta la tarea H2 — Textos de PLAN.md, incluido crear `scripts/check-i18n.mjs` y ejecutarlo.»
- **S1 (sonnet):** «Ejecuta la Fase 2 — Base de código (S1) de PLAN.md. Los tokens y los textos ya están aplicados; no los modifiques.»
- **S2a/S2b/S2c/S2d (sonnet):** «Ejecuta la tarea S2x de la Fase 3 de PLAN.md con las reglas comunes. Usa los componentes de `src/components/ui/` y el layout de S1; no los modifiques: si necesitas un cambio en ellos, descríbelo en tu respuesta.»
- **S3 (sonnet):** «Ejecuta la tarea S3 de la Fase 4 de PLAN.md. Termina con `pnpm build` verde y pega su salida.»
- **H3 (haiku):** «Ejecuta la tarea H3 de la Fase 4 de PLAN.md. Puedes editar solo `src/i18n/locales/*.json`; para cambios en componentes, lista archivo:línea y el cambio propuesto.»

## Requisitos de SEO y accesibilidad (criterios de aceptación)

### SEO
- `<title>` y `meta description` únicos por ruta y por idioma, desde i18n (`home.*`, `projects.*`, `career.*`, `about.*`).
- `canonical` absoluto en `https://www.ivanciudad.com`; `hreflang` `es`, `en` y `x-default` (→ ES) en las 8 rutas, recíprocos.
- `<html lang>` correcto; enlaces a contenido en otro idioma con `hreflang` (p. ej. el CV en español desde la versión inglesa).
- Open Graph completo (`og:title`, `og:description`, `og:image` 1200×630 o la imagen actual, `og:locale` `es_ES`/`en_US` y `og:locale:alternate`).
- JSON-LD válido: `Person` + `WebSite` en Inicio, `ItemList` en Proyectos (4 proyectos), `ProfilePage` en Sobre mí y Trayectoria,
  `BreadcrumbList` en las subpáginas. Validar con el Rich Results Test o `schema.org` validator.
- Todo el contenido indexable está en el HTML servido (filtro y tabs solo ocultan con JS; sin JS se ve todo).
- Sitemap con imágenes por página (incluido GymTracker) y `robots.txt` sin cambios de alcance.
- Core Web Vitals: imagen LCP `eager` + `fetchpriority="high"`; todas las `<img>` con `width`/`height` (CLS 0); fuentes con preload y `font-display: swap`;
  animaciones solo con `transform`/`opacity`; nada de JS cliente salvo los scripts pequeños de menú, filtro y tabs.
- Objetivo Lighthouse móvil: SEO 100, Best Practices ≥ 95, Performance igual o mejor que la línea base.

### Accesibilidad (WCAG 2.2 AA)
- Landmarks: `header`, `nav` con `aria-label`, `main#contenido`, `footer`. Un único `h1`; jerarquía de encabezados sin saltos.
- Skip link funcional; `scroll-padding-top` igual a la altura del header sticky para que el foco nunca quede tapado (2.4.11).
- Foco visible en todos los interactivos (`outline` 2 px `brand`); orden de tabulación lógico; sin trampas de foco salvo el menú móvil abierto.
- Menú móvil: `aria-expanded`, `aria-controls`, cierre con Escape y devolución de foco.
- Filtro: `aria-pressed` y contador `aria-live="polite"`. Tabs: patrón WAI-ARIA completo con flechas, Home y End.
- Contraste según la tabla de `design-system.md` §2.2; nada de texto de cuerpo en `faint`.
- Objetivos táctiles ≥ 44 × 44 px (2.5.8 pide 24; usamos 44).
- Imágenes informativas con `alt` localizado; decorativas con `alt=""` o `aria-hidden`. SVG decorativos `aria-hidden="true"`.
- Enlaces externos anuncian que abren pestaña nueva (`a11y.new_tab`, oculto visualmente).
- `prefers-reduced-motion` desactiva todas las animaciones; ninguna animación parpadea más de 3 veces por segundo.
- Contenido usable con zoom al 200 % y a 320 px de ancho sin scroll horizontal (1.4.10).
- Auditoría: `pnpm dlx @axe-core/cli` sobre las 8 rutas con **0 violaciones**, y Lighthouse Accessibility = 100 (mínimo 95 con justificación).

## Decisiones tomadas (Iván)

1. **Lint y tests**: ESLint + Vitest + CI van en un PR aparte (sesión «Añadir ESLint y Vitest al portfolio»).
2. **CV en inglés**: no existe todavía. Se enlaza el PDF en español con aviso `(in Spanish)` y `hreflang="es"`.
3. **Metadatos de X**: se quitan los handles `@Mrivix` (tarea S3).
4. **Cargo**: se mantiene «Senior Frontend Developer» en Trayectoria y Schema.org.
5. **Repositorio**: `https://github.com/IvixDev/ivanciudaddevportfolio`, enlazado desde el footer como «Código de esta web».
   Los proyectos (Buscaminas, Pokémon, eShop Cache Lab, GymTracker) viven en otros repos: sin botón «Código» por proyecto hasta tener sus URLs.

## Pendiente de confirmar

- El remoto git y el enlace de GitHub del sitio usan `github.com/Srivix`, pero el repo indicado es `github.com/IvixDev/...`.
  ¿El perfil se llama ahora `IvixDev`? Si es así, actualizar `socialMediaLinks` y `sameAs` de Schema.org.
