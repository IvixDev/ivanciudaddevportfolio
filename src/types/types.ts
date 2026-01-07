interface OpenGraph {
  basic: {
    title: string;
    type: string;
    image: string;
    url: string;
  };
  optional?: {
    description?: string;
    locale?: string;
    siteName?: string;
  };
  image?: {
    alt?: string;
    type?: string;
    width?: number;
    height?: number;
  };
}

interface Twitter {
  titleType?: string;
  title: string;
  description: string;
  creator: string;
  image: string;
  imageAlt?: string;
  card?: "summary" | "summary_large_image" | "app" | "player";
  site?: string;
}

interface Extend {
  link: { rel: string; href: string }[];
  meta: { name?: string; property?: string; content: string }[];
}

export interface InfoSeoProps {
  title: string;
  description: string;
  canonical: string;
  openGraph: OpenGraph;
  twitter: Twitter;
  extend: Extend;
}