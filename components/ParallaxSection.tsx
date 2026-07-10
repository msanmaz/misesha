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
      // 25% parallax rate — image moves at ¼ the scroll speed
      const offset = -rect.top * 0.25;
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[420px] md:h-[560px] overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 scale-125 will-change-transform"
      >
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-espresso/35 flex items-center justify-center px-6">
        {quote}
      </div>
    </section>
  );
}
