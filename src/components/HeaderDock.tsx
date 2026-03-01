import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence,
    type MotionValue,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
    IconBrandGithub,
    IconMail,
    IconBrandLinkedin,
    IconBrandX,
} from "@tabler/icons-react";
import { LogoIcon } from "./Icons";
import { headerLinks, socialMediaLinks } from "../content/layout.consts";
import { useTranslations, getOppositeLocaleUrl, isNavActive } from "../i18n/utils";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Map icon names from consts to components
const IconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    logo: LogoIcon,
    github: IconBrandGithub,
    gmail: IconMail,
    linkedin: IconBrandLinkedin,
    X: IconBrandX,
};

interface HeaderDockProps {
    currentPath: string;
    lang?: string;
}

export default function HeaderDock({ currentPath, lang }: HeaderDockProps) {
    const t = useTranslations(lang);
    const [activePath, setActivePath] = useState(currentPath);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Sync active path when props change (view transitions)
    useEffect(() => {
        const handlePageLoad = () => {
            setActivePath(window.location.pathname);
            setIsMobileMenuOpen(false);
        };

        // Sync from props
        setActivePath(currentPath);
        setIsMobileMenuOpen(false);

        // Listen for Astro transitions
        document.addEventListener("astro:page-load", handlePageLoad);
        return () => document.removeEventListener("astro:page-load", handlePageLoad);
    }, [currentPath]);

    // Framer Motion logic for Desktop Dock
    const mouseX = useMotionValue(Infinity);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const oppositeLangPath = getOppositeLocaleUrl(activePath, lang || 'es');

    return (
        <header className="header-dock fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
            <div className="flex flex-row justify-between items-center rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-2xl px-6 py-3 w-full">
                {/* Logo */}
                <a
                    aria-label="Home"
                    href="/"
                    className="flex items-center gap-3 group relative z-10"
                >
                    <div className="p-1.5 bg-white/5 rounded-full border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                        <LogoIcon className="size-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="hidden tablet:block font-bold text-lg text-slate-200 group-hover:text-white transition-colors">
                        Iván Ciudad
                    </span>
                </a>

                {/* Desktop Nav - Dock Style */}
                <nav
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    className="hidden tablet:flex flex-row gap-1 items-center bg-slate-900/30 p-1 rounded-full border border-white/5"
                >
                    {headerLinks.map((link) => {
                        const localizedHref = t(`nav.${link.tKey}_url`) as string;
                        return (
                            <DockItem key={link.tKey} mouseX={mouseX} href={localizedHref} active={isNavActive(activePath, localizedHref, link.tKey === 'home')}>
                                {t(`header.${link.tKey}`)}
                            </DockItem>
                        );
                    })}
                </nav>

                {/* Socials & Mobile Toggle */}
                <div className="flex items-center gap-3 relative z-10">
                    <a
                        href={oppositeLangPath}
                        className="hidden tablet:flex items-center bg-slate-900/40 rounded-full p-1 w-[70px] h-8 relative shadow-inner group border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                        aria-label="Toggle language"
                    >
                        <span className={cn(
                            "absolute flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-[10px] font-bold text-cyan-400 transition-all duration-300 z-10 shadow-sm border border-white/10",
                            lang === 'en' ? "translate-x-9" : "translate-x-0"
                        )}>
                            {lang === 'en' ? 'EN' : 'ES'}
                        </span>
                        <span className="absolute left-2 text-[10px] font-bold text-slate-500 z-0 transition-colors group-hover:text-slate-400">ES</span>
                        <span className="absolute right-2 text-[10px] font-bold text-slate-500 z-0 transition-colors group-hover:text-slate-400">EN</span>
                    </a>
                    <div className="hidden laptop:flex flex-row gap-2 items-center">
                        {socialMediaLinks.map((link) => {
                            const Icon = IconMap[link.name] || IconMap["github"];
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    aria-label={link.ariaLabel}
                                    className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                                >
                                    <Icon className="size-6" />
                                </a>
                            );
                        })}
                    </div>

                    <button
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                        className="burger-menu group relative flex h-[20px] flex-col items-center justify-between tablet:hidden w-6 z-50"
                        aria-label={t('header.menu_aria')}
                    >
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                            className="h-[2px] w-6 bg-slate-300 origin-center block"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="h-[2px] w-6 bg-slate-300 block"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="h-[2px] w-6 bg-slate-300 block"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                            className="h-[2px] w-6 bg-slate-300 origin-center block"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {/* Explicitly using key and defined exit props */}
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="absolute top-full left-0 right-0 mt-4 rounded-2xl border border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-2xl overflow-hidden tablet:hidden"
                    >
                        <nav className="flex flex-col p-4 gap-2">

                            {headerLinks.map((link) => {
                                const localizedHref = t(`nav.${link.tKey}_url`) as string;
                                const active = isNavActive(activePath, localizedHref, link.tKey === 'home');
                                return (
                                    <a
                                        key={link.tKey}
                                        className={cn(
                                            "w-full py-3 text-center rounded-xl transition-all duration-200 text-lg",
                                            active
                                                ? "bg-white/10 text-cyan-400 font-medium scale-105"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                        )}
                                        href={localizedHref}
                                    >
                                        {t(`header.${link.tKey}`)}
                                    </a>
                                );
                            })}
                        </nav>
                        <div className="flex flex-row gap-4 justify-center items-center py-5 border-t border-white/10 bg-white/5">
                            <a
                                href={oppositeLangPath}
                                className="px-4 py-2 bg-slate-800 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors mr-2"
                                aria-label="Toggle language"
                            >
                                {lang === 'en' ? 'Español' : 'English'}
                            </a>
                            {socialMediaLinks.map((link) => {
                                const Icon = IconMap[link.name] || IconMap["github"];
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        aria-label={link.ariaLabel}
                                        className="p-2 bg-slate-800 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                    >
                                        <Icon className="size-6" />
                                    </a>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

function DockItem({
    children,
    href,
    active,
    mouseX,
}: {
    children: React.ReactNode;
    href: string;
    active: boolean;
    mouseX: MotionValue<number>;
}) {
    const ref = useRef<HTMLAnchorElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // const widthSync = useTransform(distance, [-150, 0, 150], [100, 140, 100]);
    // const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.a
            ref={ref}
            href={href}
            className={cn(
                "relative flex items-center justify-center rounded-full text-sm font-medium transition-colors mx-0.5 px-3 whitespace-nowrap py-2",
                active ? "text-cyan-400" : "text-slate-400 hover:text-slate-200"
            )}
            style={{
                scale: useTransform(distance, [-150, 0, 150], [1, 1.05, 1]),
            }}
        >
            {active && (
                <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full shadow-inner z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            {children}
        </motion.a>
    );
}
