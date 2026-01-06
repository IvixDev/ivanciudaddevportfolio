import icon from "astro-icon";
import { defineConfig } from 'astro/config';
import tailwind from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  integrations: [icon(), sitemap(), react()],
  output: 'static',
  site: 'https://www.ivanciudad.com',
  vite: {
    plugins: [tailwind()],
  },
});