import type { ImageMetadata } from "astro";
import buscaminasImg from "../assets/proyectos-buscaminas.webp";
import pokemonImg from "../assets/proyectos-pokemon.webp";
import eshopImg from "../assets/proyectos-public-pages.webp";
import gymImg from "../assets/proyectos-gym-tracker.webp";
import { getMessages } from "../i18n/utils";

export type ProjectId = "eshop" | "gym" | "pokemon" | "buscaminas";
export type ProjectCategory = "app" | "experiment" | "game";
export type ProjectCtaKey = "view_project" | "play" | "open_app";

export interface ProjectData {
  id: ProjectId;
  category: ProjectCategory;
  image: ImageMetadata;
  ctaKey: ProjectCtaKey;
  external: boolean;
  featured: boolean;
}

/** Datos no textuales. Título, descripción, tags, alt y href salen de `projects.items[id]`. */
export const projects: readonly ProjectData[] = [
  { id: "eshop", category: "experiment", image: eshopImg, ctaKey: "view_project", external: false, featured: true },
  { id: "gym", category: "app", image: gymImg, ctaKey: "open_app", external: true, featured: false },
  { id: "pokemon", category: "app", image: pokemonImg, ctaKey: "view_project", external: false, featured: false },
  { id: "buscaminas", category: "game", image: buscaminasImg, ctaKey: "play", external: false, featured: false },
];

/** Proyecto con sus textos localizados (el `href` cambia por idioma). */
export function getLocalizedProjects(lang: string | undefined) {
  const m = getMessages(lang);
  return projects.map((project) => ({ ...project, ...m.projects.items[project.id] }));
}
