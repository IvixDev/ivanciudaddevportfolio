import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default defineConfig(
    {
        ignores: ['dist/', '.astro/', '.vercel/', 'node_modules/', 'public/'],
    },
    js.configs.recommended,
    ...tseslint.configs.strict,
    ...astro.configs.recommended,
    ...astro.configs['jsx-a11y-recommended'],
    // The astro jsx-a11y preset already registers the plugin globally; only the rules are needed here.
    {
        files: ['**/*.tsx'],
        languageOptions: jsxA11y.flatConfigs.recommended.languageOptions,
        rules: jsxA11y.flatConfigs.recommended.rules,
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
    // Ambient declaration files (e.g. Astro's generated env.d.ts) rely on triple-slash references.
    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/triple-slash-reference': 'off',
        },
    },
);
