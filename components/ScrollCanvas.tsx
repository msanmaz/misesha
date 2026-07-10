"use client";

// ScrollCanvas — scroll-driven garment crossfade on canvas.
// White backgrounds removed via saturation-based pixel manipulation.
// GSAP ScrollTrigger scrubs a playhead; render() composites with globalAlpha.
//
// FRAME MODE (3D renders): replace the PHOTO MODE render block with:
//   cx.drawImage(frames[frame], 0, 0, cvs.width, cvs.height)

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type LookbookItem = {
  src: string;
  name: string;
  color: string;
  price: string;
  slug: string;
};

const FRAMES_PER_ITEM = 70;

// Removes white studio background AND crops the result to the garment's
// actual content bounding box in a single pixel pass.
// Without the crop, empty transparent space at the bottom of product photos
// throws off the visual centre — the dress appears too high.
function stripWhiteBackground(img: HTMLImageElement): HTMLCanvasElement {
  const off = document.createElement("canvas");
  off.width = img.naturalWidth;
  off.height = img.naturalHeight;
  const ctx = off.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const data = ctx.getImageData(0, 0, off.width, off.height);
  const px = data.data;
  const W = off.width;

  let minX = W, maxX = 0, minY = off.height, maxY = 0;

  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat  = max === 0 ? 0 : (max - min) / max;
    const brightness = (r + g + b) / 3;

    if (brightness > 251 && sat < 0.02) {
      px[i + 3] = 0;
    } else if (brightness > 238 && sat < 0.04) {
      const satFactor    = sat / 0.04;
      const brightFactor = (brightness - 238) / 13;
      px[i + 3] = Math.round(Math.max(satFactor, 1 - brightFactor) * px[i + 3]);
    }

    // Track non-transparent content bounds for later crop
    if (px[i + 3] > 30) {
      const idx = i / 4;
      const x = idx % W;
      const y = Math.floor(idx / W);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  ctx.putImageData(data, 0, 0);

  // Crop canvas to garment content + small padding so drawGarment centres
  // the actual dress, not the transparent void below the hemline
  const pad   = Math.round(off.width * 0.025);
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(off.width,  maxX + pad) - cropX;
  const cropH = Math.min(off.height, maxY + pad) - cropY;

  const cropped = document.createElement("canvas");
  cropped.width  = cropW;
  cropped.height = cropH;
  cropped.getContext("2d")!.drawImage(off, -cropX, -cropY);
  return cropped;
}

function drawGarment(
  ctx: CanvasRenderingContext2D,
  processed: HTMLCanvasElement,
  cw: number,
  ch: number,
  alpha: number
) {
  const scale = Math.min(cw / processed.width, ch / processed.height) * 0.88;
  const dw = processed.width * scale;
  const dh = processed.height * scale;
  ctx.globalAlpha = alpha;
  ctx.drawImage(processed, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  ctx.globalAlpha = 1;
}

export function ScrollCanvas({ items }: { items: LookbookItem[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const n = items.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cvs = canvas;
    const cx  = ctx;
    cvs.width  = 900;
    cvs.height = 1200;

    const processed: (HTMLCanvasElement | null)[] = new Array(n).fill(null);
    let loadedCount = 0;

    function render(frame: number) {
      const totalFrames = n * FRAMES_PER_ITEM;
      const raw  = (frame / Math.max(totalFrames - 1, 1)) * (n - 1);
      const idx  = Math.min(Math.floor(raw), n - 1);
      const frac = idx === n - 1 ? 0 : raw - idx;

      cx.clearRect(0, 0, cvs.width, cvs.height);

      const cur = processed[idx];
      const nxt = processed[idx + 1];
      if (cur) drawGarment(cx, cur, cvs.width, cvs.height, 1 - frac);
      if (nxt && frac > 0) drawGarment(cx, nxt, cvs.width, cvs.height, frac);

      setActiveIndex(idx);
    }

    function tryInit() {
      loadedCount++;
      if (loadedCount === n) initGSAP();
    }

    items.forEach((item, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        processed[i] = stripWhiteBackground(img);
        if (i === 0) render(0);
        tryInit();
      };
      img.onerror = () => tryInit();
      img.src = item.src;
    });

    async function initGSAP() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const totalFrames = n * FRAMES_PER_ITEM;
      const playhead = { frame: 0 };

      gsap.to(playhead, {
        frame: totalFrames - 1,
        ease: "none",
        onUpdate() { render(Math.round(playhead.frame)); },
        duration: totalFrames / 30,
        paused: true,
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }
  }, [items, n]);

  const active = items[activeIndex];

  return (
    <div ref={trackRef} style={{ height: `${(n + 2) * 100}vh` }} className="relative">
      <div className="sticky top-0 h-[100dvh] bg-[#0d0b0a] flex flex-col overflow-hidden">

        {/* Canvas zone */}
        <div className="flex-1 flex items-center justify-center relative min-h-0">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(241,214,210,0.07) 0%, transparent 70%)",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              display: "block",
              maxHeight: "100%",
              maxWidth: "min(88vw, 440px)",
              width: "auto",
              height: "auto",
              filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.6))",
            }}
          />
          {/* Progress bar */}
          <div className="absolute right-5 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 items-center">
            {items.map((_, i) => (
              <div
                key={i}
                className="w-px rounded-full bg-marble transition-all duration-500"
                style={{ height: i === activeIndex ? 24 : 5, opacity: i === activeIndex ? 0.55 : 0.15 }}
              />
            ))}
          </div>
        </div>

        {/* Info zone */}
        <div className="flex-shrink-0 flex items-end justify-between px-6 md:px-14 pb-10 md:pb-12">
          <div className="text-marble max-w-[70vw] md:max-w-xs">
            <span className="text-[9px] tracking-[0.22em] uppercase text-marble/30 block mb-3">
              {String(activeIndex + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <div key={activeIndex} style={{ animation: "zoom-in-up 0.45s ease-out both" }}>
              <h3 className="font-display italic text-2xl md:text-4xl leading-[1.05] text-marble">
                {active?.name}
              </h3>
              <p className="text-marble/40 mt-1.5 text-xs md:text-sm tracking-wide">
                {active?.color} · {active?.price}
              </p>
            </div>
            <Link
              href={`/product/${active?.slug}`}
              className="group inline-block mt-4 border border-marble/20 hover:border-marble/50 text-marble text-[10px] md:text-xs tracking-wider uppercase relative overflow-hidden rounded-full transition-colors duration-300"
            >
              <span className="block px-4 py-2 md:px-5 md:py-2.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-full">
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
          <div className="flex flex-col items-center gap-2 opacity-25 pb-1">
            <div className="w-px h-8 bg-marble/40 overflow-hidden">
              <div className="w-full h-full bg-marble" style={{ animation: "scroll-line 1.8s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
