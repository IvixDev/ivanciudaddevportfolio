import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  output: 'server',
  adapter: vercel({
    analytics: true,
    speedInsights: {
      enabled: true,
    },
  }),
});