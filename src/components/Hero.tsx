"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function Hero() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (innerRef.current) {
          // Translate the logo down at 35% of scroll speed — net effect: logo
          // appears to scroll up at 65% of page speed (classic slow-parallax).
          innerRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0)`;
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center overflow-hidden bg-sage px-6 py-12 text-center">
      <div ref={innerRef} className="will-change-transform">
        <Image
          src="/minza-logo.png"
          alt="Minza By Nazia Junaid"
          width={180}
          height={240}
          priority
          quality={90}
          className="h-[240px] w-auto md:h-[300px] lg:h-[360px]"
        />
      </div>
    </section>
  );
}
