/* empty css                              */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CAnPjgJA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CHJ4xXxK.mjs';
export { renderers } from '../renderers.mjs';

const $$Cv = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "CV | Iv\xE1n Ciudad Espinar" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="w-full"> <embed src="/CV_IvanCiudadEspinar.pdf" type="application/pdf" class="w-full h-full"> </main> ` })}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/cv.astro", undefined);

const $$file = "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/cv.astro";
const $$url = "/cv";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cv,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
