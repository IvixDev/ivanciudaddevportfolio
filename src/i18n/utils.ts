import es from "./locales/es.json";
import en from "./locales/en.json";

export type Messages = typeof es;
export type Lang = "es" | "en";

export const defaultLang: Lang = "es";

export const ui = {
  es,
  en: en satisfies Messages,
} as const;

/** Rutas de claves cuyo valor es un string (las listas se leen con getMessages). */
type StringPaths<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends readonly object[] | readonly string[]
      ? never
      : T[K] extends object
        ? `${K}.${StringPaths<T[K]>}`
        : never;
}[keyof T & string];

export type TranslationKey = StringPaths<Messages>;

type MessageNode = string | object;

export function getLang(lang: string | undefined): Lang {
  return lang === "en" ? "en" : defaultLang;
}

/** Devuelve el objeto de textos tipado del idioma. Preferido en componentes. */
export function getMessages(lang: string | undefined): Messages {
  return ui[getLang(lang)];
}

/** Traducción por ruta (p. ej. `t("home.title")`). Si falta la clave devuelve la propia clave. */
function lookup(messages: MessageNode, key: string): string | undefined {
  let node: MessageNode | undefined = messages;
  for (const part of key.split(".")) {
    if (typeof node === "string" || node === undefined) return undefined;
    node = Object.entries(node).find(([name]) => name === part)?.[1];
  }
  return typeof node === "string" ? node : undefined;
}

/** Traductor por ruta de clave. Si falta en el idioma pedido usa el español; si tampoco existe, devuelve la clave. */
export function useTranslations(lang: string | undefined) {
  const messages: MessageNode = getMessages(lang);
  const fallback: MessageNode = getMessages(defaultLang);

  return function t(key: TranslationKey): string {
    return lookup(messages, key) ?? lookup(fallback, key) ?? key;
  };
}

/** Sustituye `{count}`, `{date}`, `{year}`… en una cadena. */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

/**
 * Builds a sorted route map (longest paths first) from the nav objects
 * in both locales so that prefix matching always picks the most specific route.
 */
function buildRouteMap(fromLang: Lang, toLang: Lang) {
  const fromNav: Record<string, string> = ui[fromLang].nav;
  const toNav: Record<string, string> = ui[toLang].nav;

  return Object.keys(fromNav)
    .map((key) => ({ from: fromNav[key], to: toNav[key] }))
    .sort((a, b) => b.from.length - a.from.length);
}

export function getOppositeLocaleUrl(activePath: string, currentLang: string): string {
  const from = getLang(currentLang);
  const oppLang: Lang = from === "es" ? "en" : "es";
  const routes = buildRouteMap(from, oppLang);

  for (const { from: fromPath, to } of routes) {
    if (activePath === fromPath || activePath === fromPath + "/") return to;
    // Quita la barra final de "/" para que "/en/500" lleve a "/500" y no a "//500".
    if (activePath.startsWith(fromPath + "/")) return to.replace(/\/$/, "") + activePath.slice(fromPath.length);
  }

  return oppLang === "en" ? "/en" : "/";
}

/**
 * Determines if a nav link is active. Home links require an exact match
 * to prevent them from lighting up on every sub-page (e.g. /en is prefix of /en/career).
 */
export function isNavActive(activePath: string, href: string, isHome: boolean): boolean {
  if (isHome) return activePath === href || activePath === href + "/";
  return activePath === href || activePath.startsWith(href + "/");
}

/** Idioma de una ruta según su prefijo (las rutas en inglés cuelgan de /en). */
function routeLang(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/** Indica si una navegación solo cambia de idioma (de /x a /en/x o al revés). */
export function isLanguageSwitch(fromPath: string, toPath: string): boolean {
  return routeLang(fromPath) !== routeLang(toPath);
}
