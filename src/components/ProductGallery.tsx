"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const safe = images.length ? images : ["/images/placeholder.svg"];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % safe.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + safe.length) % safe.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, safe.length]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative aspect-[4/5] w-full overflow-hidden bg-beige/40"
          aria-label="Open image"
        >
          <Image
            src={safe[active]}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </button>

        {safe.length > 1 && (
          <div className="flex gap-3 overflow-x-auto">
            {safe.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden bg-beige/40 transition-opacity ${
                  active === i ? "opacity-100 ring-1 ring-sage-deep" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-6 top-6 text-cream"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={safe[active]} alt={alt} fill sizes="100vw" className="object-contain" />
          </div>
          {safe.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + safe.length) % safe.length); }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % safe.length); }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
