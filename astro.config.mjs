import { defineConfig } from 'astro/config';
import tailwind from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

const SITE = 'https://www.ivanciudad.com';

// Image map: associate each page URL with its relevant images for the image sitemap
const pageImages = {
  // — Spanish pages —
  [`${SITE}`]: [
    { url: `${SITE}/ivan-ciudad-hero.webp`, title: 'Iván Ciudad Espinar - Software Developer', caption: 'Iván Ciudad Espinar, Software Developer e Ingeniero Telemático' },
    { url: `${SITE}/proyectos-buscaminas.webp`, title: 'Buscaminas - Proyecto Web', caption: 'Captura del juego Buscaminas, proyecto de desarrollo web de Iván Ciudad Espinar' },
    { url: `${SITE}/trayectoria-profesional.webp`, title: 'Trayectoria Profesional', caption: 'Iván Ciudad Espinar en traje, trayectoria profesional como Software Developer' },
    { url: `${SITE}/ivan-japon.webp`, title: 'Iván Ciudad en Japón', caption: 'Iván Ciudad Espinar posando en Japón con el Templo Dorado Kinkaku-ji de fondo' },
  ],
  [`${SITE}/proyectos`]: [
    { url: `${SITE}/proyectos-buscaminas.webp`, title: 'Buscaminas', caption: 'Captura del juego Buscaminas, proyecto de desarrollo web de Iván Ciudad Espinar' },
    { url: `${SITE}/proyectos-pokemon.webp`, title: 'Tabla de Tipos Pokémon', caption: 'Captura de la herramienta Tabla de Tipos Pokémon con Drag and Drop creada por Iván Ciudad Espinar' },
    { url: `${SITE}/proyectos-public-pages.webp`, title: 'eShop Cache Lab', caption: 'Captura del proyecto eShop Cache Lab de Iván Ciudad Espinar para probar métodos de caché de Next.js' },
  ],
  [`${SITE}/sobre-mi`]: [
    { url: `${SITE}/ivan-japon.webp`, title: 'Iván Ciudad en Japón', caption: 'Iván Ciudad Espinar posando en Japón con el Templo Dorado Kinkaku-ji de fondo' },
    { url: `${SITE}/juegos-de-mesa-dados.webp`, title: 'Juegos de mesa y dados', caption: 'Cuenco de dados de rol y juegos de mesa, hobby de Iván Ciudad Espinar' },
    { url: `${SITE}/legos.webp`, title: 'Colección LEGO Star Wars', caption: 'Figuras LEGO de Grogu, R2-D2 y C-3PO de Star Wars, colección de Iván Ciudad Espinar' },
  ],
  [`${SITE}/trayectoria-profesional`]: [
    { url: `${SITE}/trayectoria-profesional.webp`, title: 'Trayectoria Profesional', caption: 'Iván Ciudad Espinar en traje, Software Developer e Ingeniero Telemático' },
  ],
  // — English pages —
  [`${SITE}/en`]: [
    { url: `${SITE}/ivan-ciudad-hero.webp`, title: 'Iván Ciudad Espinar - Software Developer', caption: 'Iván Ciudad Espinar, Software Developer and Telematics Engineer' },
    { url: `${SITE}/proyectos-buscaminas.webp`, title: 'Minesweeper - Web Project', caption: 'Screenshot of the Minesweeper game, web development project by Iván Ciudad Espinar' },
    { url: `${SITE}/trayectoria-profesional.webp`, title: 'Professional Career', caption: 'Iván Ciudad Espinar in a suit, professional career as a Software Developer' },
    { url: `${SITE}/ivan-japon.webp`, title: 'Iván Ciudad in Japan', caption: 'Iván Ciudad Espinar posing in Japan with the Golden Kinkaku-ji Temple in the background' },
  ],
  [`${SITE}/en/projects`]: [
    { url: `${SITE}/proyectos-buscaminas.webp`, title: 'Minesweeper', caption: 'Screenshot of the Minesweeper game, web development project by Iván Ciudad Espinar' },
    { url: `${SITE}/proyectos-pokemon.webp`, title: 'Pokémon Type Chart', caption: 'Screenshot of the Pokémon Type Chart tool with Drag and Drop created by Iván Ciudad Espinar' },
    { url: `${SITE}/proyectos-public-pages.webp`, title: 'eShop Cache Lab', caption: 'Screenshot of the eShop Cache Lab project by Iván Ciudad Espinar to test Next.js caching methods' },
  ],
  [`${SITE}/en/about-me`]: [
    { url: `${SITE}/ivan-japon.webp`, title: 'Iván Ciudad in Japan', caption: 'Iván Ciudad Espinar posing in Japan with the Golden Kinkaku-ji Temple in the background' },
    { url: `${SITE}/juegos-de-mesa-dados.webp`, title: 'Board games and dice', caption: 'Bowl of role-playing dice and board games, hobby of Iván Ciudad Espinar' },
    { url: `${SITE}/legos.webp`, title: 'LEGO Star Wars Collection', caption: 'LEGO figures of Grogu, R2-D2 and C-3PO from Star Wars, collection of Iván Ciudad Espinar' },
  ],
  [`${SITE}/en/career`]: [
    { url: `${SITE}/trayectoria-profesional.webp`, title: 'Professional Career', caption: 'Iván Ciudad Espinar in a suit, Software Developer and Telematics Engineer' },
  ],
};

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
      changefreq: 'monthly',
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
      serialize(item) {
        // Set per-page priority
        const path = item.url.replace(/\/$/, '');
        if (path === SITE || path === `${SITE}/en`) {
          item.priority = 1.0;
        } else if (path.includes('/proyectos') || path.includes('/projects')) {
          item.priority = 0.9;
        } else {
          item.priority = 0.8;
        }

        // Inject image sitemap data
        const normalizedUrl = item.url.replace(/\/$/, '');
        const images = pageImages[normalizedUrl];
        if (images) {
          item.img = images;
        }

        return item;
      },
      namespaces: {
        news: false,
        video: false,
      },
    }),
    react()
  ],
  output: 'static',
  site: SITE,
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwind()],
  },
});