import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Three decades of bespoke Pakistani craft, hand-made in Karachi by Nazia Junaid and her sister Amna.",
};

const FOUNDERS = [
  {
    name: "Nazia Junaid",
    role: "Founder & Designer",
    src: "/images/about/nazia.jpg",
  },
  {
    name: "Amna Ahmed",
    role: "Atelier Director",
    src: "/images/about/amna.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">About</p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl">Three decades of craft</h1>
      </header>

      <div className="mx-auto mt-16 max-w-3xl space-y-8 text-center font-serif text-lg leading-relaxed text-charcoal/85 md:text-xl">
        <p>
          Minza began over thirty years ago in Karachi, where Nazia Junaid started crafting
          pieces rooted in traditional Pakistani techniques and shaped by a modern sensibility.
        </p>
        <p>
          What began as a personal pursuit grew into a beloved label, and eventually her sister
          Amna joined the atelier as the demand for bespoke work continued to grow — and
          together they have grown Minza into the fashion house it is today.
        </p>
        <p>
          Minza By Nazia Junaid remains rooted in the same principles that defined its earliest
          pieces — uncompromising fabric selection, masterful craftsmanship, and designs made to
          be worn and remembered.
        </p>
        <p>
          Every piece is bespoke, made to measure, and shipped worldwide from our Karachi studio.
        </p>
      </div>

      <section className="mt-24 md:mt-32">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-muted">The Sisters</p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 md:gap-16">
          {FOUNDERS.map((f) => (
            <figure key={f.name} className="text-center">
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-beige/40">
                <Image
                  src={f.src}
                  alt={f.name}
                  fill
                  sizes="(min-width: 768px) 480px, 100vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5">
                <p className="font-serif text-2xl">{f.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.22em] text-muted">{f.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-24 border-t border-beige pt-12 text-center md:mt-32">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">The Atelier</p>
        <p className="mt-4 font-serif text-xl">PECHS Block 6, Karachi</p>
        <p className="mt-2 text-sm text-muted">Studio visits by appointment.</p>
      </div>
    </div>
  );
}
