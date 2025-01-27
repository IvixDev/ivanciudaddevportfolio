import { b as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, e as addAttribute, u as unescapeHTML, a as renderComponent, f as renderScript, g as renderSlot, h as renderHead } from './astro/server_CAnPjgJA.mjs';
import 'kleur/colors';
import { getIconData, iconToSVG } from '@iconify/utils';
import 'clsx';
/* empty css                      */

const icons = {"local":{"prefix":"local","lastModified":1737986075,"icons":{"close":{"body":"<path fill=\"currentColor\" d=\"M9.156 6.313 6.312 9.156 22.157 25 6.22 40.969l2.81 2.811L25 27.844 40.938 43.78l2.843-2.843L27.844 25 43.687 9.156l-2.843-2.844L25 22.157Z\"/>","width":50,"height":50},"github":{"body":"<path fill=\"currentColor\" d=\"M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z\"/>","height":250},"gmail":{"body":"<g fill=\"currentColor\" fill-rule=\"evenodd\"><g fill-rule=\"nonzero\"><path d=\"M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91zm360.726 0h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z\"/><path d=\"M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z\"/></g><path d=\"M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z\"/><path fill-rule=\"nonzero\" d=\"M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z\"/></g>","width":512,"height":512},"instagram":{"body":"<path fill=\"currentColor\" d=\"M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27c-36.302 0-65.73 29.43-65.73 65.73 0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z\"/>"},"linkedin":{"body":"<path fill=\"currentColor\" d=\"M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453\"/>"},"menu":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5\"/>","width":24,"height":24},"X":{"body":"<path fill=\"currentColor\" d=\"M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z\"/>","width":1200,"height":1227}},"width":256,"height":256}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$c = createAstro("https://www.ivanciudad.com");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Icon;
  const req = Astro2.request;
  const { name = "", title, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new Error(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new Error('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new Error(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new Error(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new Error(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`} <use ${addAttribute(`#${id}`, "xlink:href")}></use> </svg>`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-icon/components/Icon.astro", undefined);

const socialMediaLinks = [
  { href: "https://www.linkedin.com/in/iv%C3%A1n-ciudad-espinar-2195191b2/", name: "linkedin", ariaLabel: "Linkedin" },
  { href: "mailto:ivanciudad98@gmail.com", name: "gmail", ariaLabel: "Gmail" },
  { href: "https://github.com/Srivix", name: "github", ariaLabel: "Github" },
  { href: "https://x.com/Mrivix", name: "X", ariaLabel: "X" }
];
const headerLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobremi", label: "Sobre mi" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/cv", label: "Curriculum Vitae" }
];
const footerLinks = [
  { href: "/sobremi", label: "Sobre mi" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/cv", label: "CV" }
];

const $$Astro$b = createAstro("https://www.ivanciudad.com");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Header;
  const path = Astro2.url.pathname;
  const firstSlug = `/${path.split("/")[1]}`;
  return renderTemplate`${maybeRenderHead()}<header class="flex justify-center sticky top-0 z-20 bg-[#0f172a] w-full" data-astro-cid-3ef6ksr2> <div class="flex flex-row justify-between rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] max-w-screen-tablet p-4 tablet:px-8
    tablet:max-w-screen-laptop laptop:px-16 desktop:max-w-screen-desktop
    bigDesktop:max-w-screen-bigDesktop place-items-center w-full" data-astro-cid-3ef6ksr2> <a href="/" data-astro-cid-3ef6ksr2> <img src="/logoivan.webp" class="rounded-full p-1 bg-white" width="60px" height="60px" alt="Ivan SVG Logo" data-astro-cid-3ef6ksr2> </a> <nav class="hidden tablet:flex flex-row tablet:gap-3 laptop:gap-6" data-astro-cid-3ef6ksr2> ${headerLinks.map((link) => renderTemplate`<a${addAttribute(firstSlug === link.href ? "text-[#22d3ee]" : "", "class")}${addAttribute(link.href, "href")} data-astro-cid-3ef6ksr2> ${link.label} </a>`)} </nav> <div class="flex flex-row gap-3 items-center px-4" data-astro-cid-3ef6ksr2> ${socialMediaLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank"${addAttribute(link.ariaLabel, "aria-label")} data-astro-cid-3ef6ksr2> ${renderComponent($$result, "Icon", $$Icon, { "class": "size-6", "name": link.name, "data-astro-cid-3ef6ksr2": true })} </a>`)} </div> ${renderComponent($$result, "Icon", $$Icon, { "data-drawer-target": "sidebar-drawer", "data-drawer-show": "sidebar-drawer", "data-drawer-placement": "top", "aria-controls": "sidebar-drawer", "name": "menu", "class": "w-8 h-8 tablet:hidden cursor-pointer", "data-astro-cid-3ef6ksr2": true })} </div> </header> <!-- drawer component --> <div id="sidebar-drawer" class="shadow-2xl py-2 border-b-[2px] border-b-[#53116d] bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] flex flex-col fixed top-0 left-0 right-0 z-40 overflow-y-auto transition-transform -translate-y-full bg-[#0F172A] w-full" data-astro-cid-3ef6ksr2> <div class="p-4 border-b-[2px] border-b-[#53116d] flex flex-row justify-between items-center" data-astro-cid-3ef6ksr2> <a aria-hidden="false" href="/" data-astro-cid-3ef6ksr2> <img src="/logoivan.webp" class="rounded-full p-1 bg-white" width="60px" height="60px" alt="Ivan SVG Logo" data-astro-cid-3ef6ksr2> </a> <div class="flex flex-row gap-3 items-center px-4" data-astro-cid-3ef6ksr2> ${socialMediaLinks.map((link) => renderTemplate`<a aria-hidden="false"${addAttribute(link.href, "href")} target="_blank"${addAttribute(link.ariaLabel, "aria-label")} data-astro-cid-3ef6ksr2> ${renderComponent($$result, "Icon", $$Icon, { "class": "size-6", "name": link.name, "data-astro-cid-3ef6ksr2": true })} </a>`)} </div> ${renderComponent($$result, "Icon", $$Icon, { "data-drawer-target": "sidebar-drawer", "data-drawer-hide": "sidebar-drawer", "data-drawer-placement": "top", "aria-controls": "sidebar-drawer", "name": "close", "class": "w-8 h-8 tablet:hidden cursor-pointer", "data-astro-cid-3ef6ksr2": true })} </div> <nav tabindex="-1" aria-labelledby="sidebar-drwaer" class="divide-y divide-[#53116d]" data-astro-cid-3ef6ksr2> ${headerLinks.map((link) => renderTemplate`<a class="flex items-center justify-center  w-full p-2"${addAttribute(link.href, "href")} data-astro-cid-3ef6ksr2> ${link.label} </a>`)} </nav> </div> `;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/components/Header.astro", undefined);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="flex flex-col gap-4 justify-center p-4 items-center w-full bottom-0 bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" data-astro-cid-sz7xmlte> <nav class="flex flex-col justify-center items-center gap-4" data-astro-cid-sz7xmlte> <section class="flex flex-row justify-center items-center gap-2" data-astro-cid-sz7xmlte> <h2 class="text-sm" data-astro-cid-sz7xmlte>Enlaces</h2> <div class="flex flex-row flex-wrap" data-astro-cid-sz7xmlte> ${footerLinks.map((link) => renderTemplate`<a class="flex items-center text-sm whitespace-nowrap justify-center px-2"${addAttribute(link.href, "href")} data-astro-cid-sz7xmlte> ${link.label} </a>`)} </div> </section> <section class="flex flex-row justify-center items-center gap-4" data-astro-cid-sz7xmlte> <h2 class="text-sm" data-astro-cid-sz7xmlte>¡Contacta conmigo!</h2> <div class="flex flex-row gap-4" data-astro-cid-sz7xmlte> ${socialMediaLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank"${addAttribute(link.ariaLabel, "aria-label")} data-astro-cid-sz7xmlte> ${renderComponent($$result, "Icon", $$Icon, { "class": "size-5", "name": link.name, "data-astro-cid-sz7xmlte": true })} </a>`)} </div> </section> </nav> <p class="text-sm" data-astro-cid-sz7xmlte>Creada por Iván Ciudad &#169;2024-${currentYear}</p> </footer> `;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/components/Footer.astro", undefined);

const $$Astro$a = createAstro("https://www.ivanciudad.com");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro/components/ClientRouter.astro", undefined);

const $$Astro$9 = createAstro("https://www.ivanciudad.com");
const $$OpenGraphArticleTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", undefined);

const $$Astro$8 = createAstro("https://www.ivanciudad.com");
const $$OpenGraphBasicTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", undefined);

const $$Astro$7 = createAstro("https://www.ivanciudad.com");
const $$OpenGraphImageTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", undefined);

const $$Astro$6 = createAstro("https://www.ivanciudad.com");
const $$OpenGraphOptionalTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", undefined);

const $$Astro$5 = createAstro("https://www.ivanciudad.com");
const $$ExtendedTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, media, name, property }) => renderTemplate`<meta${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(media, "media")}${addAttribute(name, "name")}${addAttribute(property, "property")}>`)}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-seo/src/components/ExtendedTags.astro", undefined);

const $$Astro$4 = createAstro("https://www.ivanciudad.com");
const $$TwitterTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-seo/src/components/TwitterTags.astro", undefined);

const $$Astro$3 = createAstro("https://www.ivanciudad.com");
const $$LanguageAlternatesTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", undefined);

const $$Astro$2 = createAstro("https://www.ivanciudad.com");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? undefined) == undefined || (props.openGraph.basic.type ?? undefined) == undefined || (props.openGraph.basic.image ?? undefined) == undefined) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is stongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || Astro2.url.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/astro-seo/src/SEO.astro", undefined);

const $$Astro$1 = createAstro("https://www.ivanciudad.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/node_modules/@vercel/speed-insights/dist/astro/index.astro", undefined);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.ivanciudad.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head>', '<meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><meta property="og:image" content="https://www.ivanciudad.com/logoivan.webp"><meta name="google-site-verification" content="rtqz__fHq7l_eMEEl-ULln50aHX17BLq7dSVgfVkLdU"><link rel="sitemap" href="/sitemap-index.xml">', "", "", '</head> <body class="flex flex-col bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"> <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"><\/script> ', ' <div class="flex\n        justify-center\n        max-w-screen-tablet\n        px-4\n        py-10\n        tablet:px-8\n        tablet:max-w-screen-laptop\n        laptop:px-16\n        desktop:max-w-screen-desktop\n        bigDesktop:max-w-screen-bigDesktop\n        layout-height w-full"> ', " </div> ", "  </body> </html>"])), renderComponent($$result, "SEO", $$SEO, { "title": title, "description": "Esta es la web de Iv\xE1n Ciudad Espinar. Desarrollador de software e ingeniero.", "openGraph": {
    basic: {
      title,
      type: "website",
      image: "https://www.ivanciudad.com/logoivan.webp",
      url: `https://www.ivanciudad.com${path}`
    }
  }, "twitter": {
    title,
    description: "Esta es mi web de Iv\xE1n Ciudad Espinar. Desarrollador de software e ingeniero.",
    creator: "@Mrivix",
    image: "https://www.ivanciudad.com/logoivan.webp"
  }, "extend": {
    // extending the default link tags
    link: [{ rel: "icon", href: "/favicon.svg" }],
    // extending the default meta tags<p
    meta: []
  } }), addAttribute(Astro2.generator, "content"), renderComponent($$result, "SpeedInsights", $$Index, {}), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "C:/Users/ivi09/Proyectos/ivanciudaddevportfolio/src/layouts/Layout.astro", undefined);

export { $$Layout as $ };
