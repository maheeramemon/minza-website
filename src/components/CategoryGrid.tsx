import Image from "next/image";
import Link from "next/link";

const CATS = [
  { slug: "casual", label: "Casual", caption: "Everyday ease." },
  { slug: "semi-formal", label: "Semi-Formal", caption: "Daytime gatherings." },
  { slug: "formal", label: "Formal", caption: "Evening occasions." },
  { slug: "bridal", label: "Bridal", caption: "The defining piece." },
] as const;

export function CategoryGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {CATS.map((c) => (
        <Link
          key={c.slug}
          href={`/catalog/${c.slug}`}
          className="group relative block aspect-[3/4] overflow-hidden bg-beige/40"
        >
          <Image
            src="/images/placeholder.svg"
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-charcoal/10 transition-colors group-hover:bg-charcoal/25" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
            <p className="font-serif text-2xl tracking-wide">{c.label}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] opacity-80">{c.caption}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
