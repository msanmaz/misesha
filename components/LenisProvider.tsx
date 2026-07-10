"use client";

import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function init() {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis();

      // Connect Lenis scroll events to GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker (prevents double-RAF conflicts)
      const tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tickerFn);
        lenis.destroy();
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    });

    return () => cleanup?.();
  }, []);

  return <>{children}</>;
}
