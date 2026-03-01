import es from './locales/es.json';
import en from './locales/en.json';

export const defaultLang = 'es';

export const ui = {
    es,
    en,
};

export function useTranslations(lang: string | undefined) {
    const currentLang = (lang && lang in ui) ? lang as keyof typeof ui : defaultLang;

    return function t(key: string) {
        const keys = key.split('.');
        let value: any = ui[currentLang];
        let fallback: any = ui[defaultLang];

        for (const k of keys) {
            if (value !== undefined) value = value[k];
            if (fallback !== undefined) fallback = fallback[k];
        }

        return (value !== undefined) ? value : ((fallback !== undefined) ? fallback : key);
    }
}

/**
 * Builds a sorted route map (longest paths first) from the nav objects
 * in both locales so that prefix matching always picks the most specific route.
 */
function buildRouteMap(fromLang: string, toLang: string) {
    const fromNav = (ui as any)[fromLang].nav;
    const toNav = (ui as any)[toLang].nav;

    return Object.keys(fromNav)
        .map((key) => ({ from: fromNav[key] as string, to: toNav[key] as string }))
        .sort((a, b) => b.from.length - a.from.length);
}

export function getOppositeLocaleUrl(activePath: string, currentLang: string): string {
    const oppLang = currentLang === 'es' ? 'en' : 'es';
    const routes = buildRouteMap(currentLang, oppLang);

    for (const { from, to } of routes) {
        if (activePath === from || activePath === from + '/') return to;
        if (activePath.startsWith(from + '/')) return to + activePath.slice(from.length);
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
