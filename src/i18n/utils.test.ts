import { describe, expect, it, vi } from 'vitest';
import { getOppositeLocaleUrl, isNavActive, useTranslations } from './utils';
import es from './locales/es.json';

// Drop one EN key so the fallback to the default locale can be tested
// independently of how complete the real EN translations are.
vi.mock('./locales/en.json', async (importOriginal) => {
    const original = await importOriginal<{ default: typeof import('./locales/en.json') }>();
    const en = structuredClone(original.default);
    Reflect.deleteProperty(en.header, 'home');
    return { default: en };
});

describe('useTranslations', () => {
    it('returns the value for the requested locale', () => {
        const t = useTranslations('en');
        expect(t('footer.contact')).toBe('Contact');
    });

    it('falls back to Spanish when the key is missing in the requested locale', () => {
        const t = useTranslations('en');
        expect(t('header.home')).toBe(es.header.home);
    });

    it('uses Spanish when the locale is unknown or undefined', () => {
        expect(useTranslations('fr')('footer.contact')).toBe(es.footer.contact);
        expect(useTranslations(undefined)('footer.contact')).toBe(es.footer.contact);
    });

    it('returns the key itself when it does not exist in any locale', () => {
        const t = useTranslations('en');
        expect(t('does.not.exist')).toBe('does.not.exist');
    });

    it('returns whole sections for top-level keys', () => {
        const t = useTranslations('es');
        expect(t('nav')).toEqual(es.nav);
        expect(Array.isArray(t('experiences'))).toBe(true);
    });
});

describe('getOppositeLocaleUrl', () => {
    const pairs = [
        ['/', '/en'],
        ['/proyectos', '/en/projects'],
        ['/trayectoria-profesional', '/en/career'],
        ['/sobre-mi', '/en/about-me'],
    ] as const;

    it.each(pairs)('maps ES %s to EN %s', (esPath, enPath) => {
        expect(getOppositeLocaleUrl(esPath, 'es')).toBe(enPath);
    });

    it.each(pairs)('maps EN %s back to ES %s', (esPath, enPath) => {
        expect(getOppositeLocaleUrl(enPath, 'en')).toBe(esPath);
    });

    it('accepts a trailing slash', () => {
        expect(getOppositeLocaleUrl('/proyectos/', 'es')).toBe('/en/projects');
        expect(getOppositeLocaleUrl('/en/career/', 'en')).toBe('/trayectoria-profesional');
    });

    it('keeps sub-routes', () => {
        expect(getOppositeLocaleUrl('/proyectos/buscaminas', 'es')).toBe('/en/projects/buscaminas');
        expect(getOppositeLocaleUrl('/en/projects/buscaminas', 'en')).toBe('/proyectos/buscaminas');
    });

    it('maps EN pages under the home route without a double slash', () => {
        expect(getOppositeLocaleUrl('/en/500', 'en')).toBe('/500');
    });

    it('falls back to the opposite home for unknown ES routes', () => {
        expect(getOppositeLocaleUrl('/500', 'es')).toBe('/en');
    });
});

describe('isNavActive', () => {
    it('matches home links only exactly', () => {
        expect(isNavActive('/en', '/en', true)).toBe(true);
        expect(isNavActive('/en/', '/en', true)).toBe(true);
        expect(isNavActive('/en/career', '/en', true)).toBe(false);
    });

    it('matches other links exactly and on sub-routes', () => {
        expect(isNavActive('/proyectos', '/proyectos', false)).toBe(true);
        expect(isNavActive('/proyectos/buscaminas', '/proyectos', false)).toBe(true);
    });

    it('does not match routes that only share a prefix', () => {
        expect(isNavActive('/proyectos-viejos', '/proyectos', false)).toBe(false);
        expect(isNavActive('/sobre-mi', '/proyectos', false)).toBe(false);
    });
});
