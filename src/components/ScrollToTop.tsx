"use client";
import { useLayoutEffect } from "react";
import { useLenis } from "lenis/react";

export function ScrollToTop() {
  const lenis = useLenis();

  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [lenis]);

  return null;
}
