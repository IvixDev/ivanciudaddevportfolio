/* empty css                              */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CAnPjgJA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Bzj4DG6_.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Proyectos | Iv\xE1n Ciudad Espinar" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>estos son los proyectos</p> ` })}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/proyectos/index.astro", undefined);

const $$file = "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/proyectos/index.astro";
const $$url = "/proyectos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
