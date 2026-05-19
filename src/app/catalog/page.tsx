import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";
import { CATEGORIES } from "@/types/product";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Bespoke pieces across casual, semi-formal, formal, and bridal categories.",
};

export default function CatalogPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <header className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">The Collection</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Catalog</h1>
        <p className="mx-auto mt-4 max-w-xl font-serif italic text-muted">
          Every piece is bespoke and made to measure. Inquire to begin.
        </p>
      </header>

      <nav className="mb-14 flex flex-wrap items-center justify-center gap-2">
        <FilterChip href="/catalog" label="All" active />
        {CATEGORIES.map((c) => (
          <FilterChip key={c.slug} href={`/catalog/${c.slug}`} label={c.label} />
        ))}
      </nav>

      {products.length === 0 ? (
        <p className="text-center text-sm text-muted">No pieces yet.</p>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          ? "border-sage-deep bg-sage-deep text-cream"
          : "border-beige text-charcoal hover:border-sage-deep hover:text-sage-deep"
      }`}
    >
      {label}
    </Link>
  );
}
