import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Bespoke process, turnaround times, international shipping, sizing, and more.",
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "How does the bespoke process work?",
    a: "Inquire via WhatsApp or email with the occasion and any references. We then discuss fabric, silhouette, embroidery, and timeline. Once confirmed, the piece is patterned, sourced, and hand-finished in our Karachi atelier before being shipped to you.",
  },
  {
    q: "What are the typical turnaround times?",
    a: "Casual and semi-formal pieces take 3–6 weeks. Formal pieces 5–8 weeks. Bridal pieces 8–14 weeks depending on detail. We confirm exact timing during the consult.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we ship worldwide, fully insured, from Karachi.",
  },
  {
    q: "How are sizes and measurements handled?",
    a: "We work to your measurements. We share a simple measurement guide once the piece is confirmed, or arrange a fitting in Karachi if you visit.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Payment terms are discussed at the inquiry stage. We accommodate both local and international clients.",
  },
  {
    q: "Do you offer alterations?",
    a: "Yes — minor adjustments to existing pieces can be arranged on request.",
  },
  {
    q: "Where is the studio located?",
    a: "PECHS Block 6, Karachi. The full address is shared once a studio visit is confirmed.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">Questions</p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl">FAQ</h1>
      </header>

      <div className="mt-16 space-y-8">
        {FAQS.map((item, i) => (
          <details
            key={i}
            className="group border-b border-beige pb-6"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
              <h3 className="font-serif text-xl text-charcoal">{item.q}</h3>
              <span className="mt-1 text-sage-deep transition-transform group-open:rotate-45">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
