import type { InfoSeoProps } from "../types/types"

export const seoMapper = (title: string, description: string, url: string, image: string, canonical?: string): InfoSeoProps => {
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
        locale: "es_ES",
        siteName: "Iván Ciudad Portfolio",
      },
      image: {
        alt: title,
        type: "image/webp",
        width: 1200,
        height: 630,
      }
    },
    twitter: {
      title,
      description,
      creator: "@Mrivix",
      image,
      card: "summary_large_image",
      site: "@Mrivix",
    },
    extend: {
      link: [{ rel: "icon", href: "/favicon.svg" }],
      meta: [
        { name: "twitter:image:alt", content: title },
        { name: "theme-color", content: "#0f172a" }
      ],
    },
  }
}