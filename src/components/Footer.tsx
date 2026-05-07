import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-beige bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" aria-label="Minza By Nazia Junaid — home" className="block">
              <Image
                src="/minza-logo.png"
                alt="Minza By Nazia Junaid"
                width={408}
                height={612}
                className="h-24 w-auto"
              />
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
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="https://wa.me/923218239698" target="_blank" rel="noopener noreferrer" className="hover:text-sage-deep">WhatsApp</a></li>
              <li><a href="mailto:naziaj2012@gmail.com" className="hover:text-sage-deep">naziaj2012@gmail.com</a></li>
              <li><a href="https://instagram.com/minzabynj" target="_blank" rel="noopener noreferrer" className="hover:text-sage-deep">@minzabynj</a></li>
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
