import Image from "next/image";
import Link from "next/link";
import { money, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="block bg-white overflow-hidden mb-3"
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 50vw, 280px"
            className="object-cover"
          />
        </div>
      </Link>
      <h3 className="font-display italic text-lg leading-snug">
        <Link href={`/product/${product.slug}`}>{product.name}</Link>
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
