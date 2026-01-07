import { defineConfig } from 'astro/config';
import tailwind from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    react()
  ],
  output: 'static',
  site: 'https://www.ivanciudad.com',
  vite: {
    plugins: [tailwind()],
  },
});