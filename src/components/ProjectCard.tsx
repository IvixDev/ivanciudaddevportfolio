import React from "react";
import { type TablerIcon, IconArrowRight } from "@tabler/icons-react";
import { TechBadge, type BadgeVariant } from "./TechBadge";

export interface TechItem {
    label: string;
    icon?: TablerIcon | React.ComponentType<any>;
    variant?: BadgeVariant;
}

interface ProjectCardProps {
    title: string;
    description: string;
    href: string;
    technologies?: TechItem[];
    shouldReload?: boolean;
    ctaText?: string;
}

export default function ProjectCard({
    title,
    description,
    href,
    technologies = [],
    shouldReload = false,
    ctaText = "Ver proyecto",
}: ProjectCardProps) {
    return (
        <a
            href={href}
            {...(shouldReload ? { "data-astro-reload": true } : {})}
            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 block h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors relative z-10">
                {title}
            </h3>

            <p className="text-slate-400 group-hover:text-slate-300 transition-colors relative z-10 mb-6">
                {description}
            </p>

            {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {technologies.map((tech) => (
                        <TechBadge
                            key={tech.label}
                            label={tech.label}
                            icon={tech.icon}
                            variant={tech.variant || "cyan"}
                        />
                    ))}
                </div>
            )}

            <div className="flex items-center gap-2 text-sm text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all relative z-10">
                {ctaText}
                <IconArrowRight className="size-4" />
            </div>
        </a>
    );
}
