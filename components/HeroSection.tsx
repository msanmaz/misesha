"use client";

// Hero animation using GSAP best practices:
// - useGSAP hook for proper Next.js cleanup
// - SplitText word-by-word with mask:"words" for the curtain-reveal on H1
// - gsap.timeline() for sequenced entrance (eyebrow → words → body → CTA)
// - ScrollTrigger for subtle hero image parallax as content slides over
// - gsap.matchMedia() respects prefers-reduced-motion

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { BowIcon } from "./BowIcon";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef     = useRef<HTMLImageElement>(null);
  const eyebrowRef   = useRef<HTMLSpanElement>(null);
  const h1Ref        = useRef<HTMLHeadingElement>(null);
  const bodyRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Full animation for users with no motion preference
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(h1Ref.current, {
          type: "words",
          mask: "words",
        });

        const tl = gsap.timeline({ delay: 0.1 });
        tl.from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.5, ease: "power2.out" })
          .from(
            split.words,
            { yPercent: 110, stagger: 0.07, duration: 0.75, ease: "power3.out" },
            "-=0.25"
          )
          .from(bodyRef.current, { y: 18, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
          .from(ctaRef.current, { y: 14, opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.3");

        if (imageRef.current) {
          gsap.to(imageRef.current, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true },
          });
        }
      });

      // No animation for reduced-motion preference — elements stay visible
      mm.add("(prefers-reduced-motion: reduce)", () => { /* intentionally empty */ });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="fixed top-0 left-0 right-0 bottom-0 z-0 overflow-hidden"
    >
      <Image
        ref={imageRef}
        src="/images/hero-riad-arch.jpg"
        alt="Woman in white lace dress standing beneath a carved Moroccan arch, lush riad courtyard behind"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />

      {/* Bottom gradient — text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/15 to-transparent" />
      {/* Top gradient — nav contrast regardless of image content */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-espresso/60 to-transparent" />

      {/* Text block */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-16 md:px-16 md:pb-20">
        <div className="max-w-[580px]">
          <span
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-marble/80 font-medium"
          >
            <BowIcon className="w-5 h-3 text-cipria" />
            Resort Edit, Vol. 1
          </span>

          <h1
            ref={h1Ref}
            className="font-display text-5xl md:text-7xl text-marble leading-[1.05] mt-3"
          >
            Tied in ribbon,{" "}
            <em className="italic text-cipria">worn like skin.</em>
          </h1>

          <p
            ref={bodyRef}
            className="mt-4 text-marble/70 max-w-md text-base"
          >
            Slips, corset tops and lace sets stitched for the mornings you
            take slow — from a kitchen table in Bodrum to your own.
          </p>

          <div ref={ctaRef}>
            <Link
              href="/shop"
              className="group inline-block mt-6 bg-marble text-espresso text-sm tracking-wide uppercase rounded-full relative overflow-hidden"
            >
              <span className="block px-6 py-3 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-full">
                Shop New In
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0"
                aria-hidden="true"
              >
                Shop New In
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-3">
        <span className="text-marble/40 text-[9px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-14 bg-marble/20 overflow-hidden relative">
          <div
            className="absolute inset-x-0 top-0 h-full bg-marble/60"
            style={{ animation: "scroll-line 1.8s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
