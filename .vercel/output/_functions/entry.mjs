import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BVlks-w9.mjs';
import { manifest } from './manifest_dJ0qQliQ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/cv.astro.mjs');
const _page2 = () => import('./pages/proyectos.astro.mjs');
const _page3 = () => import('./pages/proyectos/_---slug_.astro.mjs');
const _page4 = () => import('./pages/sobremi.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/cv.astro", _page1],
    ["src/pages/proyectos/index.astro", _page2],
    ["src/pages/proyectos/[...slug].astro", _page3],
    ["src/pages/sobremi.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "98b76b7d-e9ca-451f-a602-2d2b0c84ff85",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
