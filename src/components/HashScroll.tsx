"use client";
import { useLayoutEffect } from "react";
import { useLenis } from "lenis/react";

export function HashScroll() {
  const lenis = useLenis();

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY;

    // Instant native scroll before browser paints (no flash)
    window.scrollTo({ top, behavior: "instant" });

    // Sync Lenis internal state
    if (lenis) lenis.scrollTo(top, { immediate: true });
  }, [lenis]);

  return null;
}
