import type { InfoSeoProps } from "../types/types"
import type { Lang } from "../i18n/utils"

const OG_LOCALES = { es: "es_ES", en: "en_US" } as const satisfies Record<Lang, string>

export const seoMapper = (title: string, description: string, url: string, image: string, imageAlt?: string, canonical?: string, lang: Lang = "es"): InfoSeoProps => {
  const imgAlt = imageAlt ?? title;
  return {
    title,
    description,
    canonical: canonical ?? url,
    openGraph: {
      basic: {
        title,
        type: "website",
        image,
        url,
      },
      optional: {
        description,
        locale: OG_LOCALES[lang],
        localeAlternate: [OG_LOCALES[lang === "es" ? "en" : "es"]],
        siteName: "Iván Ciudad Portfolio",
      },
      image: {
        alt: imgAlt,
        type: "image/webp",
        width: 1200,
        height: 630,
      }
    },
    twitter: {
      title,
      description,
      image,
      card: "summary_large_image",
    },
    extend: {
      link: [{ rel: "icon", href: "/favicon.svg" }],
      meta: [
        { name: "twitter:image:alt", content: imgAlt },
        { name: "theme-color", content: "#0B1120" }
      ],
    },
  }
}