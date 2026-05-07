import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { InquiryButton } from "@/components/InquiryButton";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Minza atelier — WhatsApp, phone, email, or Instagram.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-28">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">In Touch</p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl">Contact</h1>
        <p className="mx-auto mt-4 max-w-xl font-serif italic text-muted">
          The fastest path to a piece. We respond within 48 hours.
        </p>
      </header>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <ContactCard label="WhatsApp" detail="+92 321 8239698" sub="Product inquiries" href="https://wa.me/923218239698" />
        <ContactCard label="Email" detail="naziaj2012@gmail.com" sub="For longer briefs" href="mailto:naziaj2012@gmail.com" />
        <ContactCard label="Phone — Pakistan" detail="+92 322 2244 2288" sub="Appointments" href="tel:+923222244288" />
        <ContactCard label="Phone — US" detail="+1 469 213 9562" sub="International" href="tel:+14692139562" />
        <ContactCard label="Instagram" detail="@minzabynj" sub="Latest from the atelier" href="https://instagram.com/minzabynj" />
        <ContactCard label="Studio" detail="PECHS Block 6, Karachi" sub="Address shared after inquiry" />
      </div>

      <div className="mt-20 border-t border-beige pt-12 text-center">
        <h2 className="font-serif text-3xl">Begin a piece.</h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppButton />
          <InquiryButton />
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  label,
  detail,
  sub,
  href,
}: {
  label: string;
  detail: string;
  sub: string;
  href?: string;
}) {
  const Inner = (
    <div className="border border-beige p-8 transition-colors hover:border-sage-deep">
      <p className="text-sm uppercase tracking-[0.22em] text-muted">{label}</p>
      <p className="mt-3 font-serif text-2xl">{detail}</p>
      <p className="mt-2 text-xs text-muted">{sub}</p>
    </div>
  );
  if (!href) return Inner;
  const isExternal = href.startsWith("http");
  return (
    <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
      {Inner}
    </a>
  );
}
