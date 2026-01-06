import vercel from "@astrojs/vercel";
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
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  vite: {
    plugins: [],
  },
});