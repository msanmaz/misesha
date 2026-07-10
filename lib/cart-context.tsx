"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/products";

export type CartLine = {
  slug: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addLine: (slug: string, size: string, quantity?: number) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeLine: (slug: string, size: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isLoaded: boolean;
  isMiniCartOpen: boolean;
  lastAdded: { slug: string; size: string } | null;
  notifyAdded: (slug: string, size: string) => void;
  closeMiniCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "misesha-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ slug: string; size: string } | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // Seeding from localStorage only after mount avoids an SSR/client hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed/unavailable storage
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, isLoaded]);

  const addLine = (slug: string, size: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.size === size);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug && l.size === size
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { slug, size, quantity }];
    });
  };

  const updateQuantity = (slug: string, size: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) =>
            l.slug === slug && l.size === size ? { ...l, quantity } : l
          )
    );
  };

  const removeLine = (slug: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  };

  const clear = () => setLines([]);

  const notifyAdded = (slug: string, size: string) => {
    setLastAdded({ slug, size });
    setIsMiniCartOpen(true);
  };

  const closeMiniCart = () => setIsMiniCartOpen(false);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = getProduct(line.slug);
      if (!product) continue;
      count += line.quantity;
      subtotal += product.price * line.quantity;
    }
    return { count, subtotal };
  }, [lines]);

  return (
    <CartContext.Provider
      value={{
        lines,
        addLine,
        updateQuantity,
        removeLine,
        clear,
        count,
        subtotal,
        isLoaded,
        isMiniCartOpen,
        lastAdded,
        notifyAdded,
        closeMiniCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
