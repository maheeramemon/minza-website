import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { CATEGORIES } from "@/types/product";

const categoryLabel = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

export function FlagshipCard({ product }: { product: Product }) {
  const primary = product.images[0] ?? "/images/placeholder.svg";
  const href = `/catalog/${product.category}/${product.id}`;

  return (
    <Link
      href={href}
      className="group block overflow-hidden"
      aria-label={`${product.name}${product.subtitle ? ` — ${product.subtitle}` : ""}`}
    >
      <div className="grid items-center gap-10 md:grid-cols-5 md:gap-14 lg:gap-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige/40 md:col-span-3">
          <Image
            src={primary}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            quality={90}
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="md:col-span-2">
          <p className="text-sm uppercase tracking-[0.28em] text-sage-deep">
            Flagship · {categoryLabel(product.category)}
          </p>
          <h3 className="mt-4 font-serif text-5xl leading-[1.05] tracking-wide md:text-6xl">
            {product.name}
          </h3>
          {product.subtitle && (
            <p className="mt-3 font-serif text-xl italic text-charcoal/65 md:text-2xl">
              {product.subtitle}
            </p>
          )}
          <p className="mt-8 leading-relaxed text-charcoal/80">{product.description}</p>
          <span className="mt-8 inline-block border-b border-sage-deep pb-1 text-sm uppercase tracking-[0.22em] text-sage-deep transition-colors group-hover:border-charcoal group-hover:text-charcoal">
            View the piece →
          </span>
        </div>
      </div>
    </Link>
  );
}
