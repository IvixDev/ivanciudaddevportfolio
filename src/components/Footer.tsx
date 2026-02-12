import React from "react";
import {
    IconBrandGithub,
    IconMail,
    IconBrandLinkedin,
    IconBrandX,
} from "@tabler/icons-react";
import { LogoIcon } from "./Icons";
import { footerLinks, socialMediaLinks } from "../content/layout.consts";

const ICON_MAP = {
    github: IconBrandGithub,
    gmail: IconMail,
    linkedin: IconBrandLinkedin,
    X: IconBrandX,
} as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 bg-slate-950/70 backdrop-blur-xl mt-24">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
                {/* Main Grid */}
                <div className="grid grid-cols-1 tablet:grid-cols-3 gap-10 laptop:gap-16">
                    {/* Col 1: Brand */}
                    <div className="flex flex-col gap-5 items-center tablet:items-start text-center tablet:text-left">
                        <a href="/" className="flex items-center gap-3 group">
                            <div className="p-2 bg-white/5 rounded-full border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                <LogoIcon className="size-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                                Iván Ciudad Espinar
                            </span>
                        </a>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Software Developer & Ingeniero Telemático.
                            <br />
                            Transformando ideas en experiencias digitales fluidas y
                            modernas.
                        </p>
                    </div>

                    {/* Col 2: Navigation */}
                    <div className="flex flex-col gap-5 items-center tablet:items-start">
                        <h3 className="text-slate-100 font-semibold tracking-wide">
                            Mapa del sitio
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {footerLinks &&
                                footerLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span>
                                        {link.label}
                                    </a>
                                ))}
                        </nav>
                    </div>

                    {/* Col 3: Social & Contact */}
                    <div className="flex flex-col gap-5 items-center tablet:items-start">
                        <h3 className="text-slate-100 font-semibold tracking-wide">
                            Contacto
                        </h3>
                        <div className="flex gap-3">
                            {socialMediaLinks &&
                                socialMediaLinks.map((link) => {
                                    const IconBrand =
                                        ICON_MAP[link.name as keyof typeof ICON_MAP];
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.ariaLabel}
                                            className="p-2 bg-white/5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
                                        >
                                            {IconBrand ? (
                                                <IconBrand className="size-6" />
                                            ) : null}
                                        </a>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                {/* Divider & Copyright */}
                <div className="w-full border-t border-white/5 pt-8 flex flex-col tablet:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; 2024-{currentYear} Iván Ciudad Espinar.</p>
                    <p className="flex items-center gap-1">
                        Hecho con <span className="text-red-500">❤</span> y Astro
                    </p>
                </div>
            </div>
        </footer>
    );
}
