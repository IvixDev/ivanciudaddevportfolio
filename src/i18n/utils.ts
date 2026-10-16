import es from './locales/es.json';
import en from './locales/en.json';

export const defaultLang = 'es';

export const ui = {
    es,
    en,
};

type Lang = keyof typeof ui;

/** Shape of the translations, taken from the default locale. */
export type Translations = typeof es;

type TranslationNode = string | number | boolean | null | TranslationNode[] | { [key: string]: TranslationNode };

function isLang(lang: string): lang is Lang {
    return lang in ui;
}

function getChild(node: TranslationNode | undefined, key: string): TranslationNode | undefined {
    if (node === null || typeof node !== 'object') return undefined;
    return Array.isArray(node) ? node[Number(key)] : node[key];
}

export function useTranslations(lang: string | undefined) {
    const currentLang: Lang = (lang && isLang(lang)) ? lang : defaultLang;

    /** Top-level keys return their typed section (e.g. `t('experiences')`). */
    function t<K extends keyof Translations>(key: K): Translations[K];
    /** Dotted keys return a string by default; pass a type argument for other shapes. */
    function t<T = string>(key: string): T;
    function t(key: string) {
        const keys = key.split('.');
        let value: TranslationNode | undefined = ui[currentLang];
        let fallback: TranslationNode | undefined = ui[defaultLang];

        for (const k of keys) {
            value = getChild(value, k);
            fallback = getChild(fallback, k);
        }

        return value ?? fallback ?? key;
    }

    return t;
}

/**
 * Builds a sorted route map (longest paths first) from the nav objects
 * in both locales so that prefix matching always picks the most specific route.
 */
function buildRouteMap(fromLang: Lang, toLang: Lang) {
    const fromNav = ui[fromLang].nav;
    const toNav = ui[toLang].nav;

    return (Object.keys(fromNav) as (keyof typeof fromNav)[])
        .map((key) => ({ from: fromNav[key], to: toNav[key] }))
        .sort((a, b) => b.from.length - a.from.length);
}

export function getOppositeLocaleUrl(activePath: string, currentLang: string): string {
    const fromLang: Lang = currentLang === 'en' ? 'en' : 'es';
    const oppLang: Lang = fromLang === 'es' ? 'en' : 'es';
    const routes = buildRouteMap(fromLang, oppLang);

    for (const { from, to } of routes) {
        if (activePath === from || activePath === from + '/') return to;
        // Strip the trailing slash of '/' so '/en/500' maps to '/500' instead of '//500'.
        if (activePath.startsWith(from + '/')) return to.replace(/\/$/, '') + activePath.slice(from.length);
    }

    return oppLang === 'en' ? '/en' : '/';
}

/**
 * Determines if a nav link is active. Home links require an exact match
 * to prevent them from lighting up on every sub-page (e.g. /en is prefix of /en/career).
 */
export function isNavActive(activePath: string, href: string, isHome: boolean): boolean {
    if (isHome) return activePath === href || activePath === href + '/';
    return activePath === href || activePath.startsWith(href + '/');
}
