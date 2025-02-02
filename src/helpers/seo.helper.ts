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
        },
        twitter: {
          title,
          description,
          creator: "@Mrivix",
          image,
        },
        extend: {
          link: [{ rel: "icon", href: "/favicon.svg" }],
          meta: [],
        },
      }
}