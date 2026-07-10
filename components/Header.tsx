"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { BowIcon } from "./BowIcon";
import { MiniCart } from "./MiniCart";

const NAV_LINKS = [
  { href: "/", label: "New In" },
  { href: "/shop?category=Dresses", label: "Dresses" },
  { href: "/shop?category=Tops", label: "Tops" },
  { href: "/shop", label: "Lace Edit" },
];

const supportsHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagHovered, setBagHovered] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-marble">
      <div className="bg-espresso text-marble text-center text-xs tracking-wide px-4 py-2.5">
        Hand-finished in small batches — new colours every Thursday · Free
        returns within Türkiye
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden justify-self-start text-xs tracking-wider uppercase"
          aria-expanded={menuOpen}
          aria-label="Open menu"
        >
          Menu
        </button>

        <Link
          href="/"
          className="justify-self-start inline-flex items-center gap-1.5"
          aria-label="Misesha home"
        >
          <span className="font-display text-2xl leading-none">misesha</span>
          <BowIcon className="w-5 h-3 text-rosewood -translate-y-0.5" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex justify-self-center gap-8 text-sm"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-rosewood">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end flex items-center gap-3 md:gap-4 text-xs md:text-sm">
          <Link href="/shop" aria-label="Search">
            Search
          </Link>
          <div
            className="relative"
            onMouseEnter={() => supportsHover() && setBagHovered(true)}
            onMouseLeave={() => setBagHovered(false)}
          >
            <Link href="/cart" aria-label={`Bag, ${count} items`}>
              Bag ({count})
            </Link>
            <MiniCart open={bagHovered} />
          </div>
        </div>

        {menuOpen && (
          <nav
            aria-label="Primary mobile"
            className="md:hidden absolute left-0 right-0 top-full bg-marble border-b border-espresso/10 flex flex-col px-5 pb-3"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-espresso/10 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
