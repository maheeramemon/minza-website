import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { InquiryButton } from "@/components/InquiryButton";

export const metadata: Metadata = {
  title: "The Process",
  description: "How a custom Minza piece comes together — from inquiry to delivery.",
};

const STEPS = [
  { n: "01", title: "Inquire", body: "Share the occasion, references, and your vision via WhatsApp or email." },
  { n: "02", title: "Consult", body: "We discuss fabric, silhouette, embroidery, palette, and timeline together." },
  { n: "03", title: "Craft", body: "Patterns are drafted, fabrics sourced, and the piece is hand-finished in the atelier." },
  { n: "04", title: "Deliver", body: "Shipped worldwide, insured. Final fittings can be arranged in Karachi." },
];

export default function BespokePage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-cream md:h-[80vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/atelier.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 motion-reduce:hidden"
          style={{ backgroundColor: "rgba(50, 36, 24, 0.32)" }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-cream/85 motion-reduce:text-charcoal/60">
            The Process
          </p>
          <h1 className="mt-4 font-serif text-5xl tracking-wide text-cream motion-reduce:text-charcoal md:text-6xl">
            Bespoke
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-cream motion-reduce:text-charcoal/85 md:text-2xl lg:text-3xl">
            Each piece begins with a conversation, and ends in your hands.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-2">
          {STEPS.map((step) => (
            <div key={step.n} className="border-t border-beige pt-6">
              <p className="font-serif text-3xl text-sage-deep">{step.n}</p>
              <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-32 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">Begin a piece.</h2>
        <p className="mt-4 text-muted">
          Tell us about the occasion. We typically respond within 48 hours.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppButton />
          <InquiryButton />
        </div>
      </section>
    </>
  );
}
