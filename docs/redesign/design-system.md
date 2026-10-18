# Design system — ivanciudad.com

Fuente de verdad visual del rediseño. Referencia visual: el lienzo «Portfolio Iván Ciudad — Rediseño»
(https://claude.ai/artifact/VfQowbRGuRWJFuPpWpAqip), páginas Inicio, Proyectos, Trayectoria y Sobre mí,
cada una en escritorio (1440), tablet (834) y móvil (390).

Todo lo de este documento se implementa como tokens de Tailwind CSS v4 en `src/styles/global.css`
(bloque `@theme`). Ningún componente usa colores hex sueltos: siempre la utilidad del token
(`bg-ink`, `text-muted`, `border-line`…).

---

## 1. Principios

1. **Oscuro, sobrio, con dos acentos.** Fondo azul marino casi negro, texto claro, cian de marca y violeta de acento.
2. **El degradado cian → violeta solo en palabras destacadas** (una por titular como máximo). Nunca en fondos ni bloques.
3. **Tipografía con carácter:** display grotesca para titulares, sans legible para texto, mono para etiquetas de "terminal".
4. **Movimiento con intención:** entradas suaves, hover que eleva, nada que distraiga al leer. Todo se apaga con `prefers-reduced-motion`.
5. **Accesible por defecto:** contraste AA mínimo, foco visible, objetivos táctiles ≥ 44 px, HTML semántico.

---

## 2. Color

### 2.1 Tokens

| Token Tailwind | Valor | Uso |
|---|---|---|
| `--color-ink` | `#0B1120` | Fondo de página. También texto sobre botones de acento. |
| `--color-ink-raised` | `#0E1526` | Fondo de la tarjeta terminal. |
| `--color-surface` | `#121A2B` | Tarjetas, chips, bloques de CTA, nav activa. |
| `--color-line-subtle` | `#1A2338` | Bordes de tarjeta, separadores de sección, borde inferior del header. |
| `--color-line` | `#1F2A40` | Bordes de chips/tags, línea de la timeline, contenedores de tabs. |
| `--color-line-strong` | `#2A3654` | Bordes de botones secundarios, borde de los placeholders. |
| `--color-line-hover` | `#34406A` | Borde de tarjeta en hover. |
| `--color-fg` | `#E8ECF4` | Texto principal. Fondo del botón "claro". |
| `--color-muted` | `#A3AEC2` | Texto secundario, párrafos, enlaces de nav inactivos. |
| `--color-subtle` | `#8A97B0` | Metadatos, footer, etiquetas en mayúsculas mono. |
| `--color-faint` | `#7D89A3` | Texto decorativo grande (cinta de tecnologías). |
| `--color-brand` | `#22D3EE` | Cian de marca (el del logo). Eyebrows, enlaces de tarjeta, foco, punto de estado. |
| `--color-accent` | `#A78BFA` | Violeta. CTA principal, chip/tab activo, badge "Destacado". |

Degradado de texto destacado: `linear-gradient(90deg, var(--color-brand), var(--color-accent))`
con `background-clip: text; color: transparent`. Utilidad: `.text-gradient` (ver §7).

### 2.2 Contraste verificado (WCAG 2.2)

| Combinación | Ratio aprox. | Válido para |
|---|---|---|
| `fg` sobre `ink` | 15:1 | Todo |
| `muted` sobre `ink` / `surface` | 8:1 / 7:1 | Todo |
| `subtle` sobre `ink` / `surface` | 6:1 / 5.5:1 | Todo |
| `faint` sobre `ink` / `surface` | 5.4:1 / 4.9:1 | Todo (preferir para texto decorativo) |
| `brand` sobre `ink` | 10:1 | Todo |
| `accent` sobre `ink` | 7:1 | Todo |
| `ink` sobre `accent` (botón) | 7:1 | Todo |
| `ink` sobre `fg` (botón claro) | 15:1 | Todo |

Regla: ningún texto de cuerpo en `faint`. Ningún texto blanco sobre `brand` o `accent`.

---

## 3. Tipografía

### 3.1 Familias

| Rol | Familia | Paquete (self-host) | Fallback |
|---|---|---|---|
| Display (h1, h2, títulos de tarjeta, cifras) | **Bricolage Grotesque** (variable, ejes `opsz` y `wght`) | `@fontsource-variable/bricolage-grotesque` | `ui-sans-serif, system-ui, sans-serif` |
| Texto (cuerpo, botones, nav) | **Onest** (variable) — ya instalada | `@fontsource-variable/onest` | `ui-sans-serif, system-ui, sans-serif` |
| Mono (eyebrows, fechas, tags, terminal) | **JetBrains Mono** (variable) — sustituye a Source Code Pro | `@fontsource-variable/jetbrains-mono` | `ui-monospace, monospace` |

Tokens: `--font-display`, `--font-sans`, `--font-mono`. `font-display: swap` en todas.
Precargar (`<link rel="preload" as="font" crossorigin>`) solo Onest y Bricolage (latin).
Eliminar `@fontsource-variable/source-code-pro` y los `@font-face` manuales a `/fonts/*.woff2` si dejan de usarse.

### 3.2 Escala

Fluida con `clamp()` en escritorio; valores fijos de referencia por breakpoint.

| Estilo | Familia / peso | Móvil | Tablet | Escritorio | Line-height | Tracking |
|---|---|---|---|---|---|---|
| `display-xl` (h1 de página) | Display 800 | 42–46 px | 68–72 px | `clamp(46px, 6.4vw, 90px)` | 0.98–1 | -0.035em |
| `display-lg` (h2 de CTA grande) | Display 800 | 38–40 px | 58–60 px | `clamp(40px, 5.5vw, 78px)` | 1 | -0.035em |
| `display-md` (h2 de sección) | Display 700 | 32–34 px | 44–46 px | `clamp(34px, 4vw, 54px)` | 1.05 | -0.03em |
| `title-lg` (título proyecto destacado) | Display 700 | 26 px | 32 px | 34–36 px | 1.1 | -0.02em |
| `title` (título de tarjeta) | Display 700 | 20 px | 23 px | 24 px | 1.15 | 0 |
| `lead` (subtítulo hero) | Sans 400 | 17 px | 19 px | `clamp(17px, 1.5vw, 20px)` | 1.6 | 0 |
| `body` | Sans 400 | 16 px | 17 px | 17 px | 1.6–1.65 | 0 |
| `body-sm` | Sans 400 | 14–15 px | 15 px | 15–16 px | 1.5 | 0 |
| `eyebrow` | Mono 500 | 12 px | 13 px | 13 px | 1.4 | 0 (o 0.08em en mayúsculas) |
| `tag` | Mono 400 | 11 px | 12 px | 12 px | 1.4 | 0 |
| `marquee` | Display 600 | 20 px | 24 px | 26 px | 1.2 | 0 |

`font-weight` de titulares de experiencia (`h3` de timeline): Sans 600, 19–22 px.

---

## 4. Espaciado, layout y forma

### 4.1 Breakpoints (se mantienen los actuales)

`small-tablet 640` · `tablet 768` · `laptop 1024` · `desktop 1280` · `big-desktop 1536`.
Diseños de referencia: móvil 390, tablet 834, escritorio 1440.

### 4.2 Contenedor

- Ancho máximo de contenido: **1200 px** (`--container-content: 1200px`), centrado.
- Gutter horizontal: **16 px** móvil · **32 px** tablet · `clamp(16px, 4vw, 40px)` escritorio.
- Nunca scroll horizontal en ningún ancho (la cinta de tecnologías se recorta con `overflow: hidden`, no scrollea).

### 4.3 Ritmo vertical

| Token | Móvil | Tablet | Escritorio |
|---|---|---|---|
| Separación entre secciones | 56–72 px | 88–96 px | 120 px |
| Padding superior del hero | 32 px | 64 px | `clamp(56px, 8vw, 112px)` |
| Gap interno de tarjeta | 12 px | 14 px | 16–18 px |
| Padding de tarjeta | 20 px | 24–32 px | 24–44 px |

Escala base de 4 px; usar la escala de Tailwind (`gap-3`, `p-6`, `py-30`…).

### 4.4 Radios

| Token | Valor | Uso |
|---|---|---|
| `--radius-tag` | 8 px | Tags de tecnología |
| `--radius-card-sm` | 18–20 px | Tarjetas compactas en móvil, figcaptions |
| `--radius-card` | 24 px | Tarjetas estándar, imágenes |
| `--radius-card-lg` | 28 px | Proyecto destacado, retrato |
| `--radius-block` | 32 px | Bloques de CTA |
| `rounded-full` | 999 px | Botones, chips, pills, toggles |

### 4.5 Sombras

Una sola, para hover de tarjeta: `--shadow-lift: 0 24px 48px -24px rgb(167 139 250 / 0.45)`.
Tarjeta terminal flotante: `--shadow-float: 0 24px 60px -20px rgb(0 0 0 / 0.7)`.

---

## 5. Iconografía y marca

- **Logo IC**: SVG de 8 rectángulos (`src/components/Icons.tsx → LogoIcon`, mismo trazado que `public/favicon.svg`), `fill="currentColor"`, color `brand`. Variante animada en el header: cada rectángulo entra con `drop` y retardo escalonado de 70 ms.
- **Iconos**: `@tabler/icons` (import explícito por icono, nunca barrels). Trazo 1.8–2.2, tamaño 16–22 px en botones, 26–32 px en tarjetas "Ahora mismo".
- Iconos decorativos con `aria-hidden="true"`; botones solo-icono con `aria-label`.
- Sin emojis. El separador de la cinta es el carácter `✦` (marcado `aria-hidden` en la copia duplicada).

---

## 6. Componentes

Cada componente es pequeño y de una sola responsabilidad (AGENTS.md). Nombres orientativos.

### 6.1 Botones (`Button.astro`, renderiza `<a>` o `<button>`)

| Variante | Estilo | Uso |
|---|---|---|
| `primary` | `bg-accent text-ink font-bold rounded-full px-6 py-[15px]` | Acción principal (Ver proyectos, Escríbeme, Descargar CV) |
| `light` | `bg-fg text-ink font-semibold` | Acción de tarjeta (Ver proyecto) |
| `secondary` | `border border-line-strong text-fg font-semibold` | Acción secundaria (Conóceme, LinkedIn) |
| `link` | texto `brand` o `accent`, `font-semibold`, flecha que se desplaza 4 px en hover | Enlaces de tarjeta |
| `icon` | 44–54 px circular, `text-muted`, hover `bg-surface text-fg` | Redes sociales, idioma, menú |

Altura mínima 44 px. Iconos de flecha con clase `.arrow` (§7).

### 6.2 Chip / Tag (`Chip.astro`)

- **Chip de stack** (pill): `rounded-full bg-surface border border-line text-[#C9D1DE] px-3 py-1.5 text-[15px]`. Hover: borde `brand`.
- **Tag de tecnología**: `rounded-tag border border-line font-mono text-xs text-muted px-2.5 py-1`.
- **Badge**: "Destacado" con borde y texto `accent`; categoría de proyecto con borde `line-strong`.
- **Chip de filtro / tab** (botón): inactivo `bg-surface border-line text-muted`; activo `bg-accent border-accent text-ink`. `aria-pressed` (filtro) o `aria-selected` (tab).

### 6.3 Tarjetas

- **ProjectCard**: `bg-surface border border-line-subtle rounded-card overflow-hidden`, imagen 16:10 arriba, contenido con título, descripción, tags y enlace. Clase `.lift`.
- **FeaturedProject**: horizontal en escritorio (imagen 520 px flexible + texto 360 px), apilada en tablet y móvil. En la página Proyectos, filas alternas (`flex-row` / `flex-row-reverse`).
- **ProjectCardCompact** (móvil home): fila con miniatura 112–120 px a la izquierda; toda la tarjeta es un `<a>`.
- **NowCard**: icono + etiqueta mono en mayúsculas + frase de 20 px + enlace.
- **TerminalCard**: `bg-ink-raised border-line rounded-[18px] font-mono`, tres puntos decorativos, prompt `~ $` en `brand`, cursor parpadeante en `accent`.
- **StackGroup**: borde `line-subtle`, nombre del grupo en mono mayúsculas color `brand`, descripción, chips. La tarjeta "Soft skills" ocupa todo el ancho (`col-span-full`) y tiene fondo `surface`.

### 6.4 Cabecera de sección (`SectionHeader.astro`)

Eyebrow mono en `brand` (`01 — Proyectos`) + `h2` `display-md` + opcional descripción `muted` + opcional enlace "Ver todos" alineado a la derecha.

### 6.5 Header y navegación

- Escritorio/tablet: logo + enlaces (Inicio, Proyectos, Trayectoria, Sobre mí) + toggle de idioma ES/EN + botón `primary` "Contacto". Sticky arriba con fondo `ink` y borde inferior `line-subtle`.
- Página actual: `aria-current="page"`, fondo `surface`, texto `fg`.
- Móvil: logo + botón de idioma + botón menú (`aria-expanded`, `aria-controls`). El menú abre un panel con los 4 enlaces; se cierra con Escape, devolviendo el foco al botón.
- El footer en móvil repite la navegación (`<nav aria-label="Páginas">`).

### 6.6 Timeline de experiencia

`<ol>` con `border-left: 2px line`. Cada `<li>` es una tarjeta con punto a la izquierda; el puesto actual tiene punto relleno `brand` con animación `pulse`, los demás punto hueco `line-hover`. En móvil, sin tarjeta: solo texto junto a la línea.

### 6.7 Cinta de tecnologías (`TechMarquee.astro`)

`<ul>` con la lista duplicada (la copia con `aria-hidden="true"`), `width: max-content`, animación `marquee` 26–32 s lineal infinita, pausa en hover. Contenedor `overflow: hidden` con bordes superior e inferior `line-subtle`.

### 6.8 Retrato con anillo

Contenedor `rounded-[32px] overflow-hidden p-[3px]` con un `div` absoluto de 200 % y `conic-gradient(from 0deg, brand, accent, ink 40%, ink 60%, brand)` girando con `spin 7s`. La imagen encima con radio interior 29 px.

---

## 7. Movimiento

### 7.1 Tokens

| Token | Valor |
|---|---|
| `--ease-out-soft` | `cubic-bezier(.2, .7, .2, 1)` |
| `--duration-fast` | 200 ms (color, fondo) |
| `--duration-base` | 350 ms (lift de tarjeta) |
| `--duration-slow` | 700 ms (zoom de imagen) |
| `--duration-enter` | 900 ms (entrada `up`) |

### 7.2 Keyframes y utilidades (en `global.css`)

```css
@keyframes up      { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
@keyframes drop    { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }
@keyframes fade    { from { opacity: 0; transform: translateY(8px) }  to { opacity: 1; transform: none } }
@keyframes spin    { to { transform: rotate(1turn) } }
@keyframes blink   { 50% { opacity: 0 } }
@keyframes marquee { to { transform: translateX(-50%) } }
@keyframes float   { 50% { transform: translateY(-10px) } }
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgb(34 211 238 / .5) }
  70%  { box-shadow: 0 0 0 12px rgb(34 211 238 / 0) }
  100% { box-shadow: 0 0 0 0 rgb(34 211 238 / 0) }
}
```

| Utilidad | Efecto | Dónde |
|---|---|---|
| `.animate-up` (+ `animation-delay` 0/100/200/300 ms) | Entrada escalonada al cargar | Hero de cada página |
| `.animate-rise` | Como `.animate-up` pero solo con desplazamiento, sin opacidad. Para el elemento LCP: si empieza invisible, Chrome retrasa el LCP hasta que aparece | Retrato del hero de inicio |
| `.reveal` | Entrada al hacer scroll, solo desplazamiento sin opacidad para no bajar el contraste (`reveal-up`, `animation-timeline: view(); animation-range: entry 0% entry 100%`) dentro de `@supports (animation-timeline: view())`; sin soporte, el contenido se ve sin animar | Cabeceras de sección y tarjetas |
| `.lift` | `translateY(-6px)`, borde `line-hover`, `shadow-lift` en hover, solo con `@media (hover: hover)`: en táctil un toque dejaría el elemento «seleccionado» | Tarjetas |
| `.zoom` (dentro de `.lift`) | Imagen `scale(1.05)` en hover | Imágenes de tarjeta |
| `.arrow` | Flecha `translateX(4px)` en hover del enlace padre | Botones/enlaces con flecha |
| `.animate-spin-slow` | Anillo del retrato | Retrato |
| `.animate-blink` | Cursor de la terminal | TerminalCard |
| `.animate-marquee` | Cinta | TechMarquee |
| `.animate-float` | Flotación 7 s | TerminalCard, logo decorativo del CTA |
| `.animate-pulse-ring` | Halo del puesto actual | Timeline |
| `.animate-fade` | Cambio de tab/filtro | Favoritos, Proyectos |

### 7.3 Movimiento reducido (obligatorio)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

---

## 8. Accesibilidad (reglas del sistema)

- Enlace "Saltar al contenido" como primer elemento enfocable; visible solo con foco (`.skip-link`).
- Foco: `:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 3px; }`. No quitar outlines.
- Un único `h1` por página; jerarquía sin saltos.
- `<main id="contenido" tabindex="-1">`, `<header>`, `<nav aria-label>`, `<footer>`.
- Toggle de idioma: `role="group" aria-label`, idioma actual con `aria-current="true"`, `hreflang` y `lang` en el enlace.
- Filtro de proyectos: botones con `aria-pressed`; contador con `aria-live="polite"`. Sin JS se ven todos los proyectos.
- Tabs de favoritos: patrón WAI-ARIA (`role="tablist"`, `tab`, `tabpanel`, flechas izquierda/derecha, Home/End). Sin JS se ven todas las listas.
- Imágenes informativas con `alt` descriptivo localizado; miniaturas dentro de un enlace que ya tiene texto llevan `alt=""`.
- Objetivos táctiles ≥ 44 × 44 px.

---

## 9. Bloque `@theme` de referencia

```css
@import "tailwindcss";
@import "@fontsource-variable/onest";
@import "@fontsource-variable/bricolage-grotesque";
@import "@fontsource-variable/jetbrains-mono";

@theme {
  /* Breakpoints (sin cambios) */
  --breakpoint-small-tablet: 640px;
  --breakpoint-tablet: 768px;
  --breakpoint-laptop: 1024px;
  --breakpoint-desktop: 1280px;
  --breakpoint-big-desktop: 1536px;

  /* Color */
  --color-ink: #0B1120;
  --color-ink-raised: #0E1526;
  --color-surface: #121A2B;
  --color-line-subtle: #1A2338;
  --color-line: #1F2A40;
  --color-line-strong: #2A3654;
  --color-line-hover: #34406A;
  --color-fg: #E8ECF4;
  --color-muted: #A3AEC2;
  --color-subtle: #8A97B0;
  --color-faint: #7D89A3;
  --color-chip: #C9D1DE;
  --color-brand: #22D3EE;
  --color-accent: #A78BFA;

  /* Tipografía */
  --font-display: "Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Onest Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;

  /* Layout y forma */
  --container-content: 1200px;
  --radius-tag: 8px;
  --radius-card-sm: 20px;
  --radius-card: 24px;
  --radius-card-lg: 28px;
  --radius-block: 32px;
  --shadow-lift: 0 24px 48px -24px rgb(167 139 250 / 0.45);
  --shadow-float: 0 24px 60px -20px rgb(0 0 0 / 0.7);

  /* Movimiento */
  --ease-out-soft: cubic-bezier(.2, .7, .2, 1);
  --animate-up: up 900ms var(--ease-out-soft) both;
  --animate-rise: rise 900ms var(--ease-out-soft) both;
  --animate-drop: drop 500ms var(--ease-out-soft) both;
  --animate-fade: fade 450ms var(--ease-out-soft) both;
  --animate-spin-slow: spin 7s linear infinite;
  --animate-blink: blink 1s steps(1) infinite;
  --animate-marquee: marquee 30s linear infinite;
  --animate-float: float 7s ease-in-out infinite;
  --animate-pulse-ring: pulse-ring 2s ease-out infinite;
}
```

Los nombres exactos de familia de Fontsource se comprueban en el `index.css` de cada paquete tras instalarlo.
