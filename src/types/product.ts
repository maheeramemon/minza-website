export type Category = "casual" | "formal" | "semi-formal" | "bridal";

export const CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "casual", label: "Casual" },
  { slug: "semi-formal", label: "Semi-Formal" },
  { slug: "formal", label: "Formal" },
  { slug: "bridal", label: "Bridal" },
];

export interface ProductVariant {
  size: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  fabricNotes: string;
  customizations: string[];
  turnaroundDays: string;
  images: string[];
  featured: boolean;
  // Phase 2 fields — present in schema, hidden in Phase 1 UI.
  price: number | null;
  sku: string | null;
  inStock: boolean;
  variants: ProductVariant[] | null;
}
