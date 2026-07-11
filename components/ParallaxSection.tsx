"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function ParallaxSection({
  src,
  alt,
  quote,
}: {
  src: string;
  alt: string;
  quote: React.ReactNode;
}) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      // 20% parallax rate — slow enough not to expose the edges
      el.style.transform = `translateY(${-rect.top * 0.2}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[640px] overflow-hidden bg-espresso">
      {/*
        Extend the image div 40% beyond the section on each side using real
        negative inset values — not CSS scale(), which doesn't add DOM height.
        This ensures the image covers the section at all scroll positions even
        when translateY pushes it up or down by ~viewport*0.2.
      */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 will-change-transform"
        style={{ top: "-40%", bottom: "-40%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </div>
      <div className="absolute inset-0 bg-espresso/40 flex items-center justify-center px-6">
        {quote}
      </div>
    </section>
  );
}
