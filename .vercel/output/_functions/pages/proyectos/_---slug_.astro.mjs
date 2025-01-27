/* empty css                                 */
import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_CAnPjgJA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CHJ4xXxK.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.ivanciudad.com");
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const path = Astro2.url.pathname;
  const slugs = path.split("/");
  const proyecto = slugs[slugs.length - 1];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Proyectos | Iv\xE1n Ciudad Espinar" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Proyecto: ${proyecto}</p> ` })}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/proyectos/[...slug].astro", undefined);

const $$file = "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/proyectos/[...slug].astro";
const $$url = "/proyectos/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
