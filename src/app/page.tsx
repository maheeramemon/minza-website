import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import instagramFeed from "@/../data/instagram.json";

interface InstagramTile {
  image: string;
  href: string;
}
const INSTAGRAM_TILES = instagramFeed as InstagramTile[];

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <>
      <div className="bg-sage">
        <Hero />

        <section className="mx-auto max-w-3xl px-6 pt-24 pb-48 text-center md:pt-32 md:pb-64">
          <p className="text-sm uppercase tracking-[0.3em] text-charcoal/60">The Atelier</p>
          <p className="mt-6 font-serif text-2xl leading-relaxed text-charcoal md:text-3xl">
            Begun over thirty years ago in Karachi — a quiet pursuit of fabric, technique, and the
            pieces women return to again and again.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-block text-sm uppercase tracking-[0.22em] text-charcoal hover:text-cream"
          >
            Read the story →
          </Link>
        </section>
      </div>

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Featured</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">Hand-picked pieces</h2>
            </div>
            <Link href="/catalog" className="hidden text-sm uppercase tracking-[0.22em] text-sage-deep hover:text-charcoal md:inline-block">
              View all →
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">By Occasion</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Browse the catalog</h2>
        </div>
        <CategoryGrid />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Instagram</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">@minzabynj</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
          {INSTAGRAM_TILES.map((tile, i) => (
            <a
              key={tile.image}
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram post ${i + 1}`}
              className="group relative aspect-square overflow-hidden bg-beige/40"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 16vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center">
          <a href="https://instagram.com/minzabynj" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.22em] text-sage-deep hover:text-charcoal">
            Follow on Instagram →
          </a>
        </p>
      </section>
    </>
  );
}
