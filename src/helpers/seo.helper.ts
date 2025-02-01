interface OpenGraph {
    basic: {
      title: string;
      type: string;
      image: string;
      url: string;
    };
  }
  
  interface Twitter {
    title: string;
    description: string;
    creator: string;
    image: string;
  }
  
  interface Extend {
    link: { rel: string; href: string }[];
    meta: any[];
  }
  
 export interface InfoSeoProps {
    title: string;
    description: string;
    canonical: string;
    openGraph: OpenGraph;
    twitter: Twitter;
    extend: Extend;
  }

export const seoMapper = (title: string, description: string, url: string, image: string, canonical?: string) => {
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