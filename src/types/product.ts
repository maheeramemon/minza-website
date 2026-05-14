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
  /** Optional editorial subtitle ("The Heirloom"). Rendered under the name on
   *  flagship pieces. Null/omitted on most products. */
  subtitle?: string | null;
  category: Category;
  description: string;
  fabricNotes: string;
  customizations: string[];
  turnaroundDays: string;
  images: string[];
  featured: boolean;
  /** When true, the piece is given visual prominence in the homepage featured
   *  section (rendered as a large flagship tile above the standard grid). */
  flagship?: boolean;
  /** Slugs of companion pieces (e.g. a shawl that can be purchased separately
   *  alongside the main piece). Phase 1 surfaces nothing for this; in Phase 2
   *  it'll drive a "Companion pieces" section on the product page and let each
   *  companion be added to cart independently. */
  companions?: string[] | null;
  // Phase 2 fields — present in schema, hidden in Phase 1 UI.
  price: number | null;
  sku: string | null;
  inStock: boolean;
  variants: ProductVariant[] | null;
}
