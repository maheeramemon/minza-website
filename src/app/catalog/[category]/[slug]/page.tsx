import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { InquiryButton } from "@/components/InquiryButton";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/products";
import { CATEGORIES, type Category } from "@/types/product";

const isCategory = (s: string): s is Category =>
  CATEGORIES.some((c) => c.slug === s);

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ category: p.category, slug: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; slug: string }> }
): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategory(category)) return {};
  const product = getProduct(category, slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductPage({
  params,
}: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  if (!isCategory(category)) notFound();

  const product = getProduct(category, slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const categoryLabel = CATEGORIES.find((c) => c.slug === category)!.label;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((src) => `https://minzabynj.com${src}`),
    brand: { "@type": "Brand", name: "Minza By Nazia Junaid" },
    category: categoryLabel,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <nav className="mb-10 text-sm uppercase tracking-[0.18em] text-muted">
          <Link href="/catalog" className="hover:text-charcoal">Catalog</Link>
          <span className="mx-2">/</span>
          <Link href={`/catalog/${category}`} className="hover:text-charcoal">{categoryLabel}</Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="lg:pt-6">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">{categoryLabel}</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.name}</h1>
            {product.subtitle && (
              <p className="mt-3 font-serif text-lg italic text-charcoal/65 md:text-xl">
                {product.subtitle}
              </p>
            )}

            <p className="mt-8 leading-relaxed text-charcoal/85">{product.description}</p>

            <dl className="mt-10 space-y-5 border-t border-beige pt-8 text-sm">
              <Detail label="Fabric & Craft" value={product.fabricNotes} />
              <Detail label="Customisation" value={product.customizations.join(" · ")} />
              <Detail label="Turnaround" value={product.turnaroundDays} />
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton productName={product.name} />
              <InquiryButton productName={product.name} />
            </div>

            <p className="mt-6 text-xs text-muted">
              All pieces are bespoke and made to measure. We&apos;ll respond within 48 hours.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-32">
            <div className="mb-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted">You may also like</p>
              <h2 className="mt-2 font-serif text-3xl">More from {categoryLabel}</h2>
            </div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm uppercase tracking-[0.22em] text-muted">{label}</dt>
      <dd className="mt-1 leading-relaxed">{value}</dd>
    </div>
  );
}
