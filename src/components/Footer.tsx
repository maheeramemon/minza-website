import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-beige bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" aria-label="Minza By Nazia Junaid — home" className="block">
              <Logo className="h-36 w-auto text-charcoal md:h-40" />
            </Link>
            <p className="mt-6 max-w-xs text-sm text-muted">
              Bespoke Pakistani couture, hand-crafted in Karachi and shipped worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.22em] text-muted">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/catalog" className="hover:text-sage-deep">Catalog</Link></li>
              <li><Link href="/bespoke" className="hover:text-sage-deep">The Process</Link></li>
              <li><Link href="/about" className="hover:text-sage-deep">About</Link></li>
              <li><Link href="/contact" className="hover:text-sage-deep">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-sage-deep">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.22em] text-muted">Connect</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/923218239698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-charcoal transition-colors hover:text-sage-deep"
                >
                  <svg viewBox="0 0 32 32" className="h-4 w-4 text-sage-deep" fill="currentColor" aria-hidden="true">
                    <path d="M16.003 3C9.376 3 4 8.373 4 14.997c0 2.36.681 4.65 1.97 6.62L4 29l7.6-1.94a12.96 12.96 0 0 0 4.4.77h.005C22.624 27.83 28 22.457 28 15.83 28 12.617 26.747 9.6 24.46 7.314A11.93 11.93 0 0 0 16.003 3Zm0 21.83a10.85 10.85 0 0 1-5.534-1.514l-.397-.234-4.51 1.152 1.2-4.4-.258-.41A10.78 10.78 0 0 1 5.99 14.997c0-5.524 4.493-10.014 10.014-10.014a9.93 9.93 0 0 1 7.077 2.93 9.94 9.94 0 0 1 2.928 7.087c0 5.524-4.493 10.83-9.997 10.83Z" />
                  </svg>
                  <span className="underline decoration-beige decoration-1 underline-offset-4 transition-colors group-hover:decoration-sage-deep">
                    WhatsApp
                  </span>
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-muted transition-colors group-hover:text-sage-deep" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="mailto:naziaj2012@gmail.com"
                  className="group inline-flex items-center gap-2.5 text-charcoal transition-colors hover:text-sage-deep"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-sage-deep" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="1.5" />
                    <path d="M3.5 6l8.5 7 8.5-7" />
                  </svg>
                  <span className="underline decoration-beige decoration-1 underline-offset-4 transition-colors group-hover:decoration-sage-deep">
                    naziaj2012@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/minzabynj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-charcoal transition-colors hover:text-sage-deep"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-sage-deep" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                  </svg>
                  <span className="underline decoration-beige decoration-1 underline-offset-4 transition-colors group-hover:decoration-sage-deep">
                    @minzabynj
                  </span>
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-muted transition-colors group-hover:text-sage-deep" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.22em] text-muted">Atelier</h4>
            <p className="mt-4 text-sm text-muted">PECHS Block 6<br />Karachi, Pakistan</p>
            <p className="mt-3 text-sm text-muted">Studio visits by appointment.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-beige pt-8 text-xs text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Minza By Nazia Junaid. All rights reserved.</p>
          <p className="font-serif italic">Made in Karachi.</p>
        </div>
      </div>
    </footer>
  );
}
