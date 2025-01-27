/* empty css                              */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CAnPjgJA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CHJ4xXxK.mjs';
export { renderers } from '../renderers.mjs';

const $$Sobremi = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sobre mi | Iv\xE1n Ciudad Espinar" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>te voy a contar mi vida</p> ` })}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/sobremi.astro", undefined);

const $$file = "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/sobremi.astro";
const $$url = "/sobremi";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sobremi,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
