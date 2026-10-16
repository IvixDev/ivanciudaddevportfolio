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
export function useTranslations(lang: string | undefined) {
  const messages: MessageNode = getMessages(lang);

  return function t(key: TranslationKey): string {
    let node: MessageNode | undefined = messages;
    for (const part of key.split(".")) {
      if (typeof node === "string" || node === undefined) return key;
      const next: MessageNode | undefined = Object.entries(node).find(([name]) => name === part)?.[1];
      node = next;
    }
    return typeof node === "string" ? node : key;
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
    if (activePath.startsWith(fromPath + "/")) return to + activePath.slice(fromPath.length);
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
