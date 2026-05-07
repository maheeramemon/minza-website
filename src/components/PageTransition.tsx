"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FADE_MS = 320;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion once on mount.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Fade-in on each route change (cream-to-cream feel between pages).
  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [pathname, reducedMotion]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: reducedMotion ? "none" : `opacity ${FADE_MS}ms ease-out`,
        willChange: "opacity",
      }}
    >
      {children}
    </div>
  );
}
