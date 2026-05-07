import fs from "node:fs";
import path from "node:path";
import type { Category, Product } from "@/types/product";

const PRODUCTS_DIR = path.join(process.cwd(), "data", "products");

let cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cache) return cache;
  if (!fs.existsSync(PRODUCTS_DIR)) {
    cache = [];
    return cache;
  }
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));
  const products = files.map((file) => {
    const raw = fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf8");
    return JSON.parse(raw) as Product;
  });
  cache = products.sort((a, b) => a.id.localeCompare(b.id));
  return cache;
}

export function getProductsByCategory(category: Category): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getProduct(category: Category, id: string): Product | undefined {
  return getAllProducts().find((p) => p.category === category && p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
