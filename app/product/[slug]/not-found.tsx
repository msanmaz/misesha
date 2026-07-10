import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ProductNotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-[1320px] px-5 py-20 text-center">
        <h1 className="font-display text-3xl mb-3">We can&rsquo;t find that piece</h1>
        <p className="text-espresso/70 mb-6">
          It may have sold out for good — once a colour is gone, we don&rsquo;t
          re-order it. Browse what&rsquo;s left.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-rosewood text-marble text-sm tracking-wide uppercase px-6 py-3 rounded-full"
        >
          Back to Shop All
        </Link>
      </main>
      <Footer />
    </>
  );
}
