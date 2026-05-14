"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/types/product";

const HIDE_THRESHOLD = 120; // don't hide until scrolled past the header itself
const DELTA_THRESHOLD = 6;  // ignore tiny scroll jitters

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);

        if (!reduce) {
          const delta = y - lastY.current;
          if (y < HIDE_THRESHOLD) {
            setHidden(false);
          } else if (Math.abs(delta) > DELTA_THRESHOLD) {
            setHidden(delta > 0);
          }
        }
        if (open) setHidden(false);

        lastY.current = y;
        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const navLink =
    "text-sm tracking-[0.18em] uppercase font-light hover:text-sage-deep transition-colors";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[transform,opacity,filter,background-color] duration-[220ms] ease-out will-change-transform motion-reduce:transition-none ${
        scrolled || open ? "bg-cream/95 backdrop-blur border-b border-beige" : "bg-transparent"
      } ${
        hidden
          ? "-translate-y-full opacity-0 blur-[3px] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-none"
          : "translate-y-0 opacity-100 blur-0"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-center px-6 md:h-20 md:px-10">
        <nav className="hidden items-center gap-10 md:flex">
          <Link href="/" className={navLink}>Home</Link>
          <div className="group relative">
            <Link href="/catalog" className={navLink}>Catalog</Link>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
              <div className="min-w-[180px] border border-beige bg-cream py-2 shadow-sm">
                <Link href="/catalog" className="block px-5 py-2 text-sm hover:bg-beige/40">All Pieces</Link>
                {CATEGORIES.map((c) => (
                  <Link key={c.slug} href={`/catalog/${c.slug}`} className="block px-5 py-2 text-sm hover:bg-beige/40">
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/bespoke" className={navLink}>The Process</Link>
          <Link href="/about" className={navLink}>About</Link>
          <Link href="/contact" className={navLink}>Contact</Link>
          <a
            href="https://instagram.com/minzabynj"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-charcoal hover:text-sage-deep"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="absolute right-6 top-1/2 -translate-y-1/2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.25">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M3 7h18" />
                <path d="M3 17h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <nav className="flex flex-col gap-1 border-t border-beige bg-cream px-6 py-6">
            <Link onClick={() => setOpen(false)} href="/" className="py-3 text-sm uppercase tracking-[0.18em]">Home</Link>
            <Link onClick={() => setOpen(false)} href="/catalog" className="py-3 text-sm uppercase tracking-[0.18em]">Catalog</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} onClick={() => setOpen(false)} href={`/catalog/${c.slug}`} className="py-2 pl-4 text-sm text-muted">
                {c.label}
              </Link>
            ))}
            <Link onClick={() => setOpen(false)} href="/bespoke" className="py-3 text-sm uppercase tracking-[0.18em]">The Process</Link>
            <Link onClick={() => setOpen(false)} href="/about" className="py-3 text-sm uppercase tracking-[0.18em]">About</Link>
            <Link onClick={() => setOpen(false)} href="/contact" className="py-3 text-sm uppercase tracking-[0.18em]">Contact</Link>
            <Link onClick={() => setOpen(false)} href="/faq" className="py-3 text-sm uppercase tracking-[0.18em]">FAQ</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
