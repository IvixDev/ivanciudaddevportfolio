import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), sitemap()],
  output: 'server',
  site: 'https://www.ivanciudad.com',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});