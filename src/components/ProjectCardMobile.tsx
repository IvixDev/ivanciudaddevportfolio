import React, { useState, useRef, useEffect } from "react";
import { type TablerIcon, IconArrowRight } from "@tabler/icons-react";
import { TechBadge, type BadgeVariant } from "./TechBadge";

export interface TechItem {
    label: string;
    icon?: string | TablerIcon | React.ComponentType<any>;
    variant?: BadgeVariant;
}

interface ProjectCardMobileProps {
    title: string;
    description: string;
    href: string;
    image?: string;
    imageAlt?: string;
    technologies?: TechItem[];
    shouldReload?: boolean;
    ctaText?: string;
    transitionName?: string;
}

export default function ProjectCardMobile({
    title,
    description,
    href,
    image,
    imageAlt,
    technologies = [],
    shouldReload = false,
    ctaText = "Ver proyecto",
    transitionName,
}: ProjectCardMobileProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const MAX_VISIBLE = 3;
    const visibleTechs = technologies.slice(0, MAX_VISIBLE);
    const hiddenTechsCount = technologies.length - MAX_VISIBLE;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isExpanded]);

    const handleNavigation = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();

        if (shouldReload) {
            window.location.href = href;
        } else {
            const a = document.createElement('a');
            a.href = href;
            if (shouldReload) a.setAttribute('data-astro-reload', 'true');
            a.click();
        }
    };

    const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();

        if (isExpanded) {
            handleNavigation();
        } else {
            setIsExpanded(true);
        }
    };

    return (
        <div
            ref={cardRef}
            onClick={handleToggle}
            className="relative block rounded-2xl border border-white/10 bg-slate-900 overflow-hidden cursor-pointer h-[400px] min-h-[400px] w-full"
        >
            {/* Background Image Container */}
            {image && (
                <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ${isExpanded ? "opacity-20 blur-md scale-110" : "opacity-50 scale-100"}`}>
                    <img
                        src={image}
                        alt={imageAlt || title}
                        className="w-full h-full object-cover"
                        style={{ viewTransitionName: transitionName } as React.CSSProperties}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                </div>
            )}

            {/* Content Container */}
            <div
                className={`absolute inset-x-0 top-0 p-6 z-20 transition-transform duration-700 ease-in-out ${isExpanded ? "translate-y-4" : "translate-y-[280px]"
                    }`}
            >
                <div className="flex flex-col">
                    {/* Header: Title & Badges */}
                    <div className="mb-4">
                        <h2 className={`text-2xl font-bold mb-2 transition-colors duration-700 ${isExpanded ? "text-cyan-400" : "text-white"}`}>
                            {title}
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {(isExpanded ? technologies : visibleTechs).map((tech, idx) => (
                                <TechBadge key={`mob-${idx}-${tech.label}`} label={tech.label} icon={tech.icon} variant={tech.variant || "cyan"} />
                            ))}
                            {!isExpanded && hiddenTechsCount > 0 && (
                                <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10 self-center">+{hiddenTechsCount}</span>
                            )}
                        </div>
                    </div>

                    {/* Body: Description & CTA */}
                    <div className={`transition-opacity duration-500 delay-200 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
                        <p className="text-slate-200 text-sm leading-relaxed mb-6 line-clamp-6">
                            {description}
                        </p>

                        <div className="flex items-center gap-2 text-base text-cyan-400 font-bold">
                            {ctaText}
                            <IconArrowRight className="size-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Gradient Overlay for closed state reading */}
            <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent transition-opacity duration-700 ${isExpanded ? "opacity-0" : "opacity-100"}`} />

            <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent transition-opacity pointer-events-none ${isExpanded ? "opacity-100" : "opacity-0"}`} />
        </div>
    );
}
