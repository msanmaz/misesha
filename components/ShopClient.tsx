"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const CATEGORIES: Category[] = ["Dresses", "Skirts", "Tops"];

const COLORS = Array.from(
  new Map(PRODUCTS.map((p) => [p.color, p.colorHex])).entries()
).sort(([a], [b]) => a.localeCompare(b));

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

export function ShopClient() {
  const params = useSearchParams();
  const initialCategory = params.get("category");

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Set<string>>(
    new Set(initialCategory ? [initialCategory] : [])
  );
  const [colors, setColors] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortKey>("featured");

  const toggle = (set: Set<string>, value: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (q && !`${p.name} ${p.color}`.toLowerCase().includes(q)) return false;
      if (categories.size > 0 && !categories.has(p.category)) return false;
      if (colors.size > 0 && !colors.has(p.color)) return false;
      return true;
    });

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [search, categories, colors, sort]);

  const hasFilters = search || categories.size > 0 || colors.size > 0;

  const clearAll = () => {
    setSearch("");
    setCategories(new Set());
    setColors(new Set());
  };

  return (
    <section className="mx-auto max-w-[1320px] px-5 py-8 md:py-12">
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
          Shop All
        </span>
        <h1 className="font-display text-3xl mt-2">
          Every colour we&rsquo;re holding right now
        </h1>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <aside aria-label="Filter products" className="flex flex-col gap-6">
          <div>
            <label htmlFor="search-input" className="text-xs tracking-wide uppercase text-espresso/60 block mb-2">
              Search
            </label>
            <input
              id="search-input"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or colour…"
              className="w-full border border-espresso/20 rounded-full px-4 py-2 text-sm bg-white"
            />
          </div>

          <div>
            <h2 className="text-xs tracking-wide uppercase text-espresso/60 mb-2">Category</h2>
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={categories.has(cat)}
                      onChange={() => toggle(categories, cat, setCategories)}
                      className="accent-rosewood w-4 h-4"
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs tracking-wide uppercase text-espresso/60 mb-2">Colour</h2>
            <ul className="flex flex-col gap-2">
              {COLORS.map(([color, hex]) => (
                <li key={color}>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={colors.has(color)}
                      onChange={() => toggle(colors, color, setColors)}
                      className="accent-rosewood w-4 h-4"
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-espresso/15 inline-block"
                      style={{ backgroundColor: hex }}
                    />
                    {color}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm underline text-left w-fit"
            >
              Clear all filters
            </button>
          )}
        </aside>

        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-espresso/70" role="status" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
            <label className="text-sm flex items-center gap-2">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-espresso/20 rounded-full px-3 py-1.5 bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-display text-2xl mb-2">Nothing here yet</h2>
              <p className="text-espresso/70 mb-4">
                No piece matches that search. Try a different colour or clear
                your filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="border border-espresso/30 rounded-full px-5 py-2 text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
