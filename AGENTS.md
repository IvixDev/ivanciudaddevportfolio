## Convenciones
- Usa pnpm para todo. No usar npm ni yarn bajo ningún concepto
- Node 24.x (definido en `engines` de `package.json`; lo usan Vercel y la CI). En local lo fija `.node-version` (fnm con `--use-on-cd`). Si cambia la versión, actualizar los dos a la vez
- TypeScript es obligatorio
- Usa siempre Tailwind CSS para estilos
- Iconos de `@tabler/icons` como SVG, importados por ruta (`import IconX from "@tabler/icons/outline/x.svg"`), uno a uno, nunca barrels. Sin React
- Preferir ESM y sintaxis moderna del navegador

## Creación de proyectos
- Si hay que crear un proyecto nuevo, usa Astro
- Comando recomendado:
  `pnpm create astro@latest <project_name>`
- Configura TypeScript en modo estricto desde el inicio
- Añade Tailwind usando la integración oficial de Astro
- No añadir dependencias hasta que sean necesarias

## Organización
- Componentes pequeños, con una sola responsabilidad
- Preferir composición frente a configuraciones complejas
- Evita abstracciones prematuras
- El código compartido debe vivir en carpetas claras como `components`, `layouts`, `lib` o `utils`

## Reglas de TypeScript
- Evita `any` y `unknown`
- Preferir siempre que se pueda inferencia
- Si los tipos no están claros, parar y aclarar antes de continuar

## UI y estilos
- Tailwind es la única solución de estilos
- No duplicar clases si se puede extraer un componente
- Priorizar legibilidad frente a micro-optimizaciones visuales
- Accesibilidad no es opcional: HTML semántico, roles ARIA cuando aplique y foco gestionado

## Testing y calidad
- Revisar los workflows de CI en `.github/workflows` (`ci.yml` ejecuta `pnpm lint`, `pnpm test` y `pnpm build` en cada PR).
- Ejecutar los tests con:
  `pnpm test` (una vez) o `pnpm test:watch` (modo watch)
- Para Vitest:
  `pnpm vitest run -t "<nombre del test>"`
- Los tests viven junto al código como `*.test.ts` dentro de `src`.
- Tras mover archivos o cambiar imports, ejecutar:
  `pnpm lint` (o `pnpm lint:fix` para autocorregir)
- ESLint usa flat config (`eslint.config.js`) con `typescript-eslint` estricto, `eslint-plugin-astro` y `eslint-plugin-jsx-a11y`. Nunca desactivar reglas de a11y sin un comentario que lo justifique.
- `@typescript-eslint/no-explicit-any` es error. Para traducciones, usar el tipado de `useTranslations` en lugar de `as any`.
- Mantener `eslint-plugin-astro` en 1.x mientras se use ESLint 9 (las versiones 2+ exigen ESLint 10).
- No se acepta código con errores de tipos, lint o tests fallidos.
- Añadir o actualizar tests cuando se cambie comportamiento, aunque no se pida explícitamente.

## Rendimiento y decisiones técnicas
- No adivinar rendimiento, tamaño de bundle o tiempos de carga: medir.
- Si algo parece lento, añadir instrumentación antes de optimizar.
- Validar primero en pequeño antes de escalar cambios a todo el proyecto.
- Al sustituir `public/CV_IvanCiudadEspinar.pdf`, cambiar el `?v=AAAA-MM` de `career.cv_url` en `es.json` y `en.json`. El archivo mantiene su nombre, pero los navegadores guardan el PDF anterior y, sin cambiar la URL, pueden seguir mostrándolo.

## Commits y Pull Requests
- Título del PR: [<project_name>] Descripción clara y concisa.
- PRs pequeños y enfocados.
- Antes de commitear:
  - pnpm lint
  - pnpm test
- Explicar qué ha cambiado, por qué y cómo se ha verificado.
- Si se introduce una nueva restricción ("nunca X", "siempre Y"), documentarla en este archivo.

## Comportamiento del agente
- Si una petición no está clara, hacer preguntas concretas antes de ejecutar.
- Tareas simples y bien definidas se ejecutan directamente.
- Cambios complejos (refactors, nuevas features, decisiones de arquitectura) requieren confirmar entendimiento antes de actuar.
- No asumir requisitos implícitos. Si falta información, se pide.
