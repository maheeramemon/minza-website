import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { CATEGORIES } from "@/types/product";

const BASE = "https://minzabynj.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/catalog", "/bespoke", "/about", "/contact", "/faq"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${BASE}/catalog/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${BASE}/catalog/${p.category}/${p.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
