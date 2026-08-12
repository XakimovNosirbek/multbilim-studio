import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/telegram", "/api/"] }],
    sitemap: "https://multbilim-studio-demo.nosirbekxakimov01.chatgpt.site/sitemap.xml",
  };
}
