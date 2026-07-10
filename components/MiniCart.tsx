"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import { getProduct, money } from "@/lib/products";

const AUTO_DISMISS_MS = 6000;

export function MiniCart({ open = false }: { open?: boolean }) {
  const { lines, subtotal, isMiniCartOpen, closeMiniCart, lastAdded } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const visible = open || isMiniCartOpen;

  useEffect(() => {
    if (!isMiniCartOpen) return;
    const timer = setTimeout(closeMiniCart, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [isMiniCartOpen, lastAdded, closeMiniCart]);

  useEffect(() => {
    if (!visible) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closeMiniCart();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMiniCart();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, closeMiniCart]);

  if (!visible || lines.length === 0) return null;

  const lastProduct = isMiniCartOpen && lastAdded ? getProduct(lastAdded.slug) : null;

  return (
    <div className="absolute right-0 top-full pt-3 w-[min(340px,calc(100vw-2rem))] z-50">
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Bag preview"
        className="bg-marble border border-espresso/15 rounded-2xl shadow-lg p-4 text-left"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-sm leading-snug">
            {lastProduct ? (
              <>
                Added — <span className="font-medium">{lastProduct.name}</span>, size{" "}
                {lastAdded?.size}.
              </>
            ) : (
              "Your bag"
            )}
          </p>
          <button
            type="button"
            onClick={closeMiniCart}
            aria-label="Close bag preview"
            className="w-6 h-6 shrink-0 -mt-1 -mr-1 text-espresso/50 hover:text-espresso text-lg leading-none"
          >
            ×
          </button>
        </div>

        <ul className="flex flex-col gap-3 max-h-64 overflow-y-auto">
          {lines.map((line) => {
            const product = getProduct(line.slug);
            if (!product) return null;
            return (
              <li key={`${line.slug}-${line.size}`} className="flex gap-3">
                <div className="relative w-14 h-16 shrink-0 bg-white">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display italic text-sm leading-snug truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-espresso/60">
                    {product.color} · {line.size} × {line.quantity}
                  </p>
                </div>
                <p className="text-sm shrink-0">{money(product.price * line.quantity)}</p>
              </li>
            );
          })}
        </ul>

        <div className="flex justify-between items-baseline mt-4 pt-3 border-t border-espresso/10 text-sm">
          <span className="text-espresso/70">Subtotal</span>
          <span className="font-display text-lg">{money(subtotal)}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href="/cart"
            onClick={closeMiniCart}
            className="flex-1 text-center border border-espresso/30 text-espresso text-sm py-2.5 rounded-full hover:border-espresso/60 hover:bg-espresso/5 transition-colors"
          >
            View Bag
          </Link>
          <Link
            href="/checkout"
            onClick={closeMiniCart}
            className="flex-1 text-center bg-rosewood text-marble text-sm py-2.5 rounded-full hover:bg-rosewood/90"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
