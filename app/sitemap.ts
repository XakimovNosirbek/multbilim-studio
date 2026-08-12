import type { MetadataRoute } from "next";
import { projects } from "./data/projects";

const BASE_URL = "https://multbilim-studio-demo.nosirbekxakimov01.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...projects.map((project) => ({ url: `${BASE_URL}/projects/${project.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
