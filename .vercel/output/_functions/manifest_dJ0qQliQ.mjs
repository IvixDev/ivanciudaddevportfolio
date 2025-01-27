import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C_w3UoPo.mjs';
import 'es-module-lexer';
import { d as decodeKey } from './chunks/astro/server_CAnPjgJA.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/cv.CCo7I3oL.css"}],"routeData":{"route":"/cv","isIndex":false,"type":"page","pattern":"^\\/cv\\/?$","segments":[[{"content":"cv","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cv.astro","pathname":"/cv","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/cv.CCo7I3oL.css"}],"routeData":{"route":"/proyectos","isIndex":true,"type":"page","pattern":"^\\/proyectos\\/?$","segments":[[{"content":"proyectos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proyectos/index.astro","pathname":"/proyectos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/cv.CCo7I3oL.css"}],"routeData":{"route":"/proyectos/[...slug]","isIndex":false,"type":"page","pattern":"^\\/proyectos(?:\\/(.*?))?\\/?$","segments":[[{"content":"proyectos","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/proyectos/[...slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/cv.CCo7I3oL.css"}],"routeData":{"route":"/sobremi","isIndex":false,"type":"page","pattern":"^\\/sobremi\\/?$","segments":[[{"content":"sobremi","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sobremi.astro","pathname":"/sobremi","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/cv.CCo7I3oL.css"},{"type":"inline","content":"article[data-astro-cid-j7pv25f6]{border:1px solid #22d3ee;border-radius:.5rem;padding:1rem}b[data-astro-cid-j7pv25f6],a[data-astro-cid-j7pv25f6]{font-weight:800;color:#22d3ee}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.ivanciudad.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/cv.astro",{"propagation":"none","containsHead":true}],["C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/proyectos/[...slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/proyectos/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/pages/sobremi.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/cv@_@astro":"pages/cv.astro.mjs","\u0000@astro-page:src/pages/proyectos/index@_@astro":"pages/proyectos.astro.mjs","\u0000@astro-page:src/pages/proyectos/[...slug]@_@astro":"pages/proyectos/_---slug_.astro.mjs","\u0000@astro-page:src/pages/sobremi@_@astro":"pages/sobremi.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_kBlUHtb9.mjs","\u0000@astrojs-manifest":"manifest_dJ0qQliQ.mjs","C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CShTJ5oK.js","C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.rasoniT7.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var l=\"@vercel/speed-insights\",f=\"1.0.4\",v=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function w(){return typeof window<\"u\"}function p(){try{const e=\"production\"}catch{}return\"production\"}function d(){return p()===\"development\"}function m(e,n){if(!e||!n)return e;let r=e;try{for(const[s,i]of Object.entries(n)){const t=Array.isArray(i),o=t?i.join(\"/\"):i,u=t?`...${s}`:s,a=new RegExp(`/${S(o)}(?=[/?#]|$)`);a.test(r)&&(r=r.replace(a,`/[${u}]`))}return r}catch{return e}}function S(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var c=\"https://va.vercel-scripts.com/v1/speed-insights\",h=`${c}/script.js`,g=`${c}/script.debug.js`,R=\"/_vercel/speed-insights/script.js\";function y(e={}){var n;if(!w()||e.route===null)return null;v();const s=!!e.dsn?h:R,i=e.scriptSrc||(d()?g:s);if(document.head.querySelector(`script[src*=\"${i}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=i,t.defer=!0,t.dataset.sdkn=l+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=f,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),d()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:o=>{t.dataset.route=o??void 0}}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const n=JSON.parse(this.dataset.props??\"{}\"),r=JSON.parse(this.dataset.params??\"{}\"),s=m(this.dataset.pathname??\"\",r);y({route:s,...n,framework:\"astro\",beforeSend:window.speedInsightsBeforeSend})}catch(n){throw new Error(`Failed to parse SpeedInsights properties: ${n}`)}}});"]],"assets":["/_astro/cv.CCo7I3oL.css","/carrera.jpg","/CV_IvanCiudadEspinar.pdf","/favicon.svg","/fotoivan.webp","/google6ebd45112fd3f016.html","/laboral.webp","/logoivan.webp","/programacion.webp","/robots.txt","/sobremi.webp","/fonts/Onest.woff2","/fonts/SourceCodePro.woff2","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.rasoniT7.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"zprYhvgO0JMpIxvGbtMtADCcsUIoaLgmsUFfOnuSD9M="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
