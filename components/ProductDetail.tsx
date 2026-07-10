"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { money, type Product } from "@/lib/products";
import { BowIcon } from "./BowIcon";
import { ProductCard } from "./ProductCard";

const SIZES = ["XS", "S", "M", "L"];

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [size, setSize] = useState("S");
  const [feedback, setFeedback] = useState("");
  const { addLine, notifyAdded } = useCart();

  const handleAddToBag = () => {
    addLine(product.slug, size);
    notifyAdded(product.slug, size);
    setFeedback(`Added — ${product.name}, size ${size}.`);
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1320px] px-5 pt-6 text-sm text-espresso/60">
        <Link href="/">Home</Link> /{" "}
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>{" "}
        / <span aria-current="page">{product.name}</span>
      </nav>

      <section className="mx-auto max-w-[1320px] px-5 py-6 grid md:grid-cols-[1.2fr_1fr] gap-10">
        <div>
          <div className="relative aspect-square arch overflow-hidden bg-white">
            <Image
              src={activeImage}
              alt={product.alt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
              priority
            />
          </div>
          {product.gallery.length > 1 && (
            <div className="flex gap-3 mt-3">
              {product.gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`relative w-16 h-20 overflow-hidden border ${
                    activeImage === src ? "border-rosewood" : "border-espresso/15"
                  }`}
                  aria-label="View image"
                  aria-current={activeImage === src}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
            <BowIcon className="w-5 h-3" />
            {product.color} · {product.category}
          </span>
          <h1 className="font-display text-3xl md:text-4xl mt-3">{product.name}</h1>
          <p className="text-espresso/70 mt-2">{product.tagline}</p>
          <p className="font-display text-2xl mt-4">{money(product.price)}</p>

          <div role="group" aria-label="Select a size" className="flex gap-2 mt-6">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`w-11 h-11 rounded-full border text-sm ${
                  size === s
                    ? "bg-espresso text-marble border-espresso"
                    : "border-espresso/25"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddToBag}
            className="group mt-6 w-full bg-rosewood text-marble text-sm tracking-wide uppercase rounded-full relative overflow-hidden"
          >
            <span className="block py-3.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-full">
              Add to Bag
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0"
              aria-hidden="true"
            >
              Add to Bag
            </span>
          </button>
          {feedback && (
            <p role="status" aria-live="polite" className="text-sm text-espresso/70 mt-2">
              {feedback}
            </p>
          )}

          <p className="mt-6 text-espresso/80 leading-relaxed">{product.description}</p>

          <details className="mt-6 border-t border-espresso/10 pt-4" open>
            <summary className="cursor-pointer text-sm font-medium">Details &amp; Care</summary>
            <ul className="mt-3 text-sm text-espresso/70 list-disc pl-5 space-y-1">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>

          <details className="mt-2 border-t border-espresso/10 pt-4">
            <summary className="cursor-pointer text-sm font-medium">Shipping &amp; Returns</summary>
            <p className="mt-3 text-sm text-espresso/70">
              Ships within Türkiye in 2–4 business days. Free returns within
              14 days on unworn pieces with tags attached.
            </p>
          </details>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1320px] px-5 py-10">
          <h2 className="font-display text-2xl mb-6">More from the same colour story</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
