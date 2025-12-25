import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"
import { i18n } from "@/components/internationalization"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/login", "/register"]

  const sitemap: MetadataRoute.Sitemap = []

  for (const locale of i18n.locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.8,
      })
    }
  }

  return sitemap
}
