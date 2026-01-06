import node from "@astrojs/node";
import icon from "astro-icon";
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  integrations: [icon(), sitemap(), react(), tailwind()],
  output: 'server',
  site: 'https://www.ivanciudad.com',
  adapter: node({
    mode: "standalone",
  }),

  vite: {
    plugins: [],
  },
});