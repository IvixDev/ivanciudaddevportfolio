import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import { defineConfig } from 'astro/config';
import tailwind from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  integrations: [icon(), sitemap()],
  output: 'server',
  site: 'https://www.ivanciudad.com',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  vite: {
    plugins: [tailwind()],
  },
});
