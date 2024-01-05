import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  output: 'server',
  adapter: vercel({
    speedInsights: {
      enabled: true,
    },
  }),
});

console.log(process.env.VERCEL_ANALYTICS_ID, process.env.PUBLIC_VERCEL_ANALYTICS_ID)
if (!process.env.VERCEL_ANALYTICS_ID) {
  process.env.VERCEL_ANALYTICS_ID = process.env.PUBLIC_VERCEL_ANALYTICS_ID
}