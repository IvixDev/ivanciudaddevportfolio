import type { getLocalizedProjects } from "../../content/projects";

/** Proyecto con textos localizados, tal como lo devuelve `getLocalizedProjects`. */
export type LocalizedProject = ReturnType<typeof getLocalizedProjects>[number];
