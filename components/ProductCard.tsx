import Image from "next/image";
import Link from "next/link";
import { money, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="group block bg-white overflow-hidden mb-3"
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 50vw, 280px"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <h3 className="font-display italic text-lg leading-snug">
        <Link
          href={`/product/${product.slug}`}
          className="group relative overflow-hidden inline-block leading-none"
        >
          <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-full">
            {product.name}
          </span>
          <span
            className="absolute top-0 left-0 w-full block translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 text-rosewood"
            aria-hidden="true"
          >
            {product.name}
          </span>
        </Link>
      </h3>
      <div className="flex items-baseline justify-between text-sm mt-1 text-espresso/70">
        <span>
          {product.color} · {product.category}
        </span>
        <span className="text-espresso">{money(product.price)}</span>
      </div>
    </article>
  );
}
