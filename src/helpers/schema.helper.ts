import { socialMediaLinks } from "../content/layout.consts";
import { getLocalizedProjects } from "../content/projects";
import type { TranslationKey } from "../i18n/utils";

type TranslateFn = (key: TranslationKey) => string;

const SITE = "https://www.ivanciudad.com";

const sameAsLinks = socialMediaLinks
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href);

export function buildPersonSchema(t: TranslateFn) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: "Iván Ciudad Espinar",
        givenName: "Iván",
        familyName: "Ciudad Espinar",
        url: SITE,
        image: {
            "@type": "ImageObject",
            url: `${SITE}/trayectoria-profesional.webp`,
            width: 1200,
            height: 800,
            caption: t("schema.person_caption"),
        },
        sameAs: sameAsLinks,
        jobTitle: t("schema.job_title"),
        description: t("home.description"),
        email: "ivanciudad98@gmail.com",
        nationality: {
            "@type": "Country",
            name: t("schema.nationality"),
        },
        knowsLanguage: [
            { "@type": "Language", name: t("schema.lang_spanish"), alternateName: "es" },
            { "@type": "Language", name: t("schema.lang_english"), alternateName: "en" },
        ],
        worksFor: {
            "@type": "Organization",
            name: "Orange",
            url: "https://www.orange.es",
        },
        alumniOf: [
            {
                "@type": "EducationalOrganization",
                name: "Universidad de València",
                url: "https://www.uv.es",
            },
            {
                "@type": "EducationalOrganization",
                name: t("schema.edem_name"),
                url: "https://edem.es",
            },
        ],
        hasCredential: [
            {
                "@type": "EducationalOccupationalCredential",
                name: t("schema.credential_degree"),
                credentialCategory: "degree",
                recognizedBy: {
                    "@type": "EducationalOrganization",
                    name: "Universidad de València",
                },
            },
            {
                "@type": "EducationalOccupationalCredential",
                name: t("schema.credential_master"),
                credentialCategory: "degree",
                recognizedBy: {
                    "@type": "EducationalOrganization",
                    name: "EDEM",
                },
            },
        ],
        knowsAbout: [
            "Software Development",
            "Frontend Development",
            "Next.js",
            "React",
            "TypeScript",
            "Angular",
            "Astro",
            "Tailwind CSS",
            "SEO",
            "Web Performance",
            "Node.js",
            "Java",
            "Spring Boot",
            "Web Performance Optimization",
            "Core Web Vitals",
            "Micro Frontends",
            "Kubernetes",
            "Nginx",
            "Istio",
        ],
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": SITE,
        },
    };
}

export function buildWebsiteSchema(t: TranslateFn) {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: t("schema.website_name"),
        description: t("home.description"),
        inLanguage: ["es-ES", "en-US"],
        author: {
            "@id": `${SITE}/#person`,
        },
        publisher: {
            "@id": `${SITE}/#person`,
        },
    };
}

export function buildProfilePageSchema(t: TranslateFn, pageKey: "career" | "about") {
    const url = t(`${pageKey}.url`);

    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": url,
        name: t(`${pageKey}.title`),
        description: t(`${pageKey}.description`),
        url,
        mainEntity: {
            "@id": `${SITE}/#person`,
        },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: t(`${pageKey}.image_url`),
        },
    };
}

export function buildProjectsPageSchema(t: TranslateFn, lang: string | undefined) {
    const url = t("projects.url");

    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": url,
        name: t("projects.title"),
        description: t("projects.description"),
        url,
        author: {
            "@id": `${SITE}/#person`,
        },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: getLocalizedProjects(lang).map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: project.title,
                url: project.href.startsWith("http") ? project.href : `${SITE}${project.href}`,
            })),
        },
    };
}

export function buildBreadcrumbSchema(t: TranslateFn, pageKey: "projects" | "career" | "about") {
    const homePath = t("nav.home_url");

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: t("header.home"),
                item: homePath === "/" ? SITE : `${SITE}${homePath}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: t(`header.${pageKey}`),
                item: t(`${pageKey}.url`),
            },
        ],
    };
}
