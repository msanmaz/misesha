"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { getProduct, money } from "@/lib/products";

export default function CartPage() {
  const { lines, updateQuantity, removeLine, subtotal, isLoaded } = useCart();

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-[900px] w-full px-5 py-10">
        <h1 className="font-display text-3xl mb-8">Your Bag</h1>

        {!isLoaded ? null : lines.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-espresso/70 mb-6">Your bag is empty.</p>
            <Link
              href="/shop"
              className="inline-block bg-rosewood text-marble text-sm tracking-wide uppercase px-6 py-3 rounded-full"
            >
              Shop All
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-6">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return (
                  <li
                    key={`${line.slug}-${line.size}`}
                    className="flex gap-4 border-b border-espresso/10 pb-6"
                  >
                    <Link href={`/product/${product.slug}`} className="relative w-24 h-28 shrink-0 bg-white">
                      <Image src={product.image} alt={product.alt} fill sizes="96px" className="object-cover" />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link href={`/product/${product.slug}`} className="font-display italic text-lg">
                            {product.name}
                          </Link>
                          <p className="text-sm text-espresso/60">Size {line.size}</p>
                        </div>
                        <p className="font-medium">{money(product.price * line.quantity)}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-auto pt-3">
                        <div className="flex items-center border border-espresso/20 rounded-full">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(line.slug, line.size, line.quantity - 1)}
                            className="w-11 h-11 text-lg"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm" aria-live="polite">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(line.slug, line.size, line.quantity + 1)}
                            className="w-11 h-11 text-lg"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.slug, line.size)}
                          className="text-sm underline text-espresso/60"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-between items-baseline mt-8 pt-6 border-t border-espresso/10">
              <span className="text-espresso/70">Subtotal</span>
              <span className="font-display text-2xl">{money(subtotal)}</span>
            </div>
            <p className="text-sm text-espresso/50 mt-1">Shipping and taxes calculated at checkout.</p>

            <Link
              href="/checkout"
              className="mt-6 block text-center bg-rosewood text-marble text-sm tracking-wide uppercase py-3.5 rounded-full hover:bg-rosewood/90"
            >
              Checkout
            </Link>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
