"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product, money } from "@/lib/products";

// Scroll-through lookbook: products crossfade as you scroll.
// Architecture: GSAP ScrollTrigger pins the section, scrub drives opacity.
// When 3D Blender frame sequences are ready, replace the <Image> slides
// with a single <canvas> and set canvas frame = Math.floor(progress * totalFrames).
export function ScrollLookbook({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const n = products.length;

  useEffect(() => {
    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Set initial opacity state
      slidesRef.current.forEach((s, i) => {
        if (s) gsap.set(s, { opacity: i === 0 ? 1 : 0 });
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${n * 100}vh`,
        pin: true,
        scrub: 1.2,
        onUpdate(self) {
          // Map scroll progress to slide index with crossfade in between
          const raw = self.progress * (n - 1);
          const idx = Math.min(Math.floor(raw), n - 1);
          const frac = idx === n - 1 ? 0 : raw - idx;

          setActiveIndex(idx);

          slidesRef.current.forEach((s, i) => {
            if (!s) return;
            const opacity =
              i === idx ? 1 - frac : i === idx + 1 ? frac : 0;
            gsap.set(s, { opacity });
          });
        },
      });
    }

    init();
  }, [n]);

  const active = products[activeIndex];

  return (
    <div ref={containerRef} className="h-[100dvh] relative overflow-hidden bg-espresso">
      {/* Product image slides */}
      {products.map((product, i) => (
        <div
          key={product.slug}
          ref={(el) => {
            slidesRef.current[i] = el;
          }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority={i < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent" />
        </div>
      ))}

      {/* Product info — re-animates when activeIndex changes */}
      <div className="absolute bottom-14 left-8 md:left-16 text-marble max-w-sm">
        <span className="text-[10px] tracking-[0.25em] uppercase text-marble/40 block mb-4">
          {String(activeIndex + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div key={activeIndex} style={{ animation: "zoom-in-up 0.4s ease-out both" }}>
          <h3 className="font-display italic text-4xl md:text-6xl leading-[1.05]">
            {active?.name}
          </h3>
          <p className="text-marble/55 mt-2 text-sm tracking-wide">
            {active?.color} · {money(active?.price ?? 0)}
          </p>
        </div>
        <Link
          href={`/product/${active?.slug}`}
          className="group inline-block mt-6 border border-marble/25 hover:border-marble/60 text-marble text-xs tracking-wider uppercase relative overflow-hidden rounded-full transition-colors duration-300"
        >
          <span className="block px-5 py-2.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-full">
            View piece
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0"
            aria-hidden="true"
          >
            View piece
          </span>
        </Link>
      </div>

      {/* Vertical progress indicator */}
      <div className="absolute bottom-14 right-8 md:right-16 flex flex-col gap-2 items-center">
        {products.map((_, i) => (
          <div
            key={i}
            className="w-px rounded-full transition-all duration-500 bg-marble"
            style={{
              height: i === activeIndex ? 32 : 8,
              opacity: i === activeIndex ? 0.8 : 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
