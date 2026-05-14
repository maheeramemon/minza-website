import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/products";
import { CATEGORIES, type Category } from "@/types/product";

const CATEGORY_INTRO: Record<Category, string> = {
  casual: "Quiet pieces for the everyday — softened fabrics, considered cuts.",
  "semi-formal": "Light formality. Designed for daytime gatherings and intimate occasions.",
  formal: "Evening pieces with depth — crafted for the occasion.",
  bridal: "The defining piece. Made to be worn with love today and remembered with love forever.",
};

const isCategory = (s: string): s is Category =>
  CATEGORIES.some((c) => c.slug === s);

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const label = CATEGORIES.find((c) => c.slug === category)?.label ?? category;
  return { title: label, description: CATEGORY_INTRO[category] };
}

export default async function CategoryPage({
  params,
}: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const label = CATEGORIES.find((c) => c.slug === category)!.label;
  const products = getProductsByCategory(category);
  const isBridal = category === "bridal";

  return (
    <div className={`mx-auto max-w-7xl px-6 md:px-10 ${isBridal ? "py-24 md:py-36" : "py-20 md:py-28"}`}>
      <header className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">Catalog</p>
        <h1 className={`mt-3 font-serif ${isBridal ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"}`}>{label}</h1>
        <p className="mx-auto mt-4 max-w-xl font-serif italic text-muted">
          {CATEGORY_INTRO[category]}
        </p>
      </header>

      <nav className="mb-14 flex flex-wrap items-center justify-center gap-2">
        <FilterChip href="/catalog" label="All" />
        {CATEGORIES.map((c) => (
          <FilterChip key={c.slug} href={`/catalog/${c.slug}`} label={c.label} active={c.slug === category} />
        ))}
      </nav>

      {products.length === 0 ? (
        <p className="text-center text-sm text-muted">No pieces in this category yet.</p>
      ) : (
        <div className={`grid gap-x-6 sm:grid-cols-2 ${
          isBridal ? "gap-y-16 lg:grid-cols-3" : "gap-y-12 lg:grid-cols-3 xl:grid-cols-4"
        }`}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

function FilterChip({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`border px-5 py-2 text-sm uppercase tracking-[0.18em] transition-colors ${
        active
          ? "border-charcoal bg-charcoal text-cream"
          : "border-beige text-charcoal hover:border-sage-deep hover:text-sage-deep"
      }`}
    >
      {label}
    </Link>
  );
}
