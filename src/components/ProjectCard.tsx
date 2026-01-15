import React, { useState, useEffect } from "react";
import { type TablerIcon, IconArrowRight } from "@tabler/icons-react";
import { TechBadge, type BadgeVariant } from "./TechBadge";
import ProjectCardMobile from "./ProjectCardMobile";

export interface TechItem {
    label: string;
    icon?: string | TablerIcon | React.ComponentType<any>;
    variant?: BadgeVariant;
}

interface ProjectCardProps {
    title: string;
    description: string;
    href: string;
    image?: string;
    technologies?: TechItem[];
    shouldReload?: boolean;
    ctaText?: string;
}

export default function ProjectCard(props: ProjectCardProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Si es móvil, delegamos totalmente en el componente especializado
    if (isMobile) {
        return <ProjectCardMobile {...props} />;
    }

    // Versión Laptop: Limpia, rápida y basada en hover nativo
    const visibleTechs = props.technologies?.slice(0, 3) || [];
    const hiddenCount = (props.technologies?.length || 0) - visibleTechs.length;

    return (
        <div
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden h-[400px] cursor-pointer"
        >
            {/* Background Image */}
            {props.image && (
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                    <img
                        src={props.image}
                        alt={props.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>
            )}

            {/* Content Container Laptop */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col bg-slate-950/40 backdrop-blur-xl border-t border-white/5 transition-transform duration-500 ease-in-out h-[310px] translate-y-[calc(100%-115px)] group-hover:translate-y-0">
                <div className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                        {props.title}
                    </h3>

                    <div className="mb-6">
                        {/* Normal state: limited count */}
                        <div className="flex flex-wrap gap-2 group-hover:hidden">
                            {visibleTechs.map((tech) => (
                                <TechBadge key={`lp-v-${tech.label}`} label={tech.label} icon={tech.icon} variant={tech.variant || "cyan"} />
                            ))}
                            {hiddenCount > 0 && (
                                <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10 self-center">+{hiddenCount}</span>
                            )}
                        </div>
                        {/* Hover state: all techs */}
                        <div className="hidden group-hover:flex flex-wrap gap-2">
                            {props.technologies?.map((tech) => (
                                <TechBadge key={`lp-f-${tech.label}`} label={tech.label} icon={tech.icon} variant={tech.variant || "cyan"} />
                            ))}
                        </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 mb-6">
                        {props.description}
                    </p>

                    <a
                        href={props.href}
                        {...(props.shouldReload ? { "data-astro-reload": "true" } : {})}
                        className="mt-auto flex items-center gap-2 text-sm text-cyan-400 font-medium transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300"
                    >
                        {props.ctaText || "Ver proyecto"} <IconArrowRight className="size-4" />
                    </a>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
}
