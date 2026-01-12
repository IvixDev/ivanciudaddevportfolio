import React from "react";
import { type TablerIcon } from "@tabler/icons-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type BadgeVariant = "default" | "cyan" | "purple" | "green" | "blue" | "orange";

interface TechBadgeProps {
    label: string;
    icon?: TablerIcon | React.ComponentType<any>;
    variant?: BadgeVariant;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    green: "bg-green-500/10 text-green-300 border-green-500/20",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    orange: "bg-orange-500/10 text-orange-300 border-orange-500/20",
};

export function TechBadge({ label, icon: Icon, variant = "default", className }: TechBadgeProps) {
    return (
        <span
            className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-full border flex items-center gap-1 transition-colors",
                variantStyles[variant],
                className
            )}
        >
            {Icon && <Icon className="size-3.5" />}
            {label}
        </span>
    );
}
