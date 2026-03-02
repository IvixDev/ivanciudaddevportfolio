import { socialMediaLinks } from "../content/layout.consts";

type TranslateFn = (key: string) => any;

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
            url: `${SITE}/ivan-ciudad-hero.webp`,
            width: 800,
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
            name: "MasOrange",
            url: "https://www.masorange.es",
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

export function buildProfilePageSchema(t: TranslateFn, pageKey: "career_page" | "about_page") {
    const pageData = t(pageKey) as {
        title: string;
        description: string;
        url: string;
        image_url: string;
    };

    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": pageData.url,
        name: pageData.title,
        description: pageData.description,
        url: pageData.url,
        mainEntity: {
            "@id": `${SITE}/#person`,
        },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: pageData.image_url,
        },
    };
}

export function buildProjectsPageSchema(t: TranslateFn) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": t("projects.title"),
        name: t("projects.title"),
        description: t("projects.description"),
        author: {
            "@id": `${SITE}/#person`,
        },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: t("projects.buscaminas_title"),
                    url: `${SITE}${t("projects.buscaminas_url")}`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: t("projects.pokemon_title"),
                    url: `${SITE}${t("projects.pokemon_url")}`,
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: t("projects.eshop_title"),
                    url: `${SITE}${t("projects.eshop_url")}`,
                },
            ],
        },
    };
}
