"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/types/product";
import { CATEGORIES } from "@/types/product";

const categoryLabel = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

const SWIPE_THRESHOLD = 40;

export function ProductCard({ product }: { product: Product }) {
  const images = product.images.length ? product.images : ["/images/placeholder.svg"];
  const href = `/catalog/${product.category}/${product.id}`;
  const multi = images.length > 1;

  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const advance = (delta: number) =>
    setActive((i) => (i + delta + images.length) % images.length);

  const stop = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD && multi) {
      stop(e);
      advance(dx < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  return (
    <Link href={href} className="group block">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-beige/40"
        onTouchStart={multi ? onTouchStart : undefined}
        onTouchEnd={multi ? onTouchEnd : undefined}
      >
        {images.map((src, i) => (
          <Image
            key={`${src}-${i}`}
            src={src}
            alt={i === 0 ? product.name : ""}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}

        {multi && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => { stop(e); advance(-1); }}
              className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-cream/90 text-charcoal opacity-0 transition-opacity hover:bg-cream group-hover:opacity-100 md:flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => { stop(e); advance(1); }}
              className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-cream/90 text-charcoal opacity-0 transition-opacity hover:bg-cream group-hover:opacity-100 md:flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={(e) => { stop(e); setActive(i); }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-5 bg-cream" : "w-1.5 bg-cream/60 hover:bg-cream/85"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3 overflow-hidden">
        <h3 className="font-serif text-lg leading-tight">
          <span className="relative inline-block transition-transform duration-500 ease-out group-hover:-translate-y-[1px] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
            {product.name}
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-0 bg-sage-deep transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none motion-reduce:group-hover:w-0"
            />
          </span>
        </h3>
        <span className="text-sm uppercase tracking-[0.2em] text-muted transition-colors duration-500 group-hover:text-charcoal">
          {categoryLabel(product.category)}
        </span>
      </div>
    </Link>
  );
}
