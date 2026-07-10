import Link from "next/link";
import { BowIcon } from "./BowIcon";

export function Footer() {
  return (
    <footer className="mt-auto bg-espresso text-marble/80">
      <div className="mx-auto max-w-[1320px] px-5 py-12 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-marble">
            <span className="font-display text-xl">misesha</span>
            <BowIcon className="w-5 h-3 text-cipria" />
          </Link>
          <p className="text-sm max-w-xs">
            Small-batch slips, corset tops and lace sets, hand-finished in
            colours held all the way through.
          </p>
        </div>
        <div className="text-sm flex flex-col gap-2">
          <h3 className="text-marble font-medium mb-1">Shop</h3>
          <Link href="/shop?category=Dresses">Dresses</Link>
          <Link href="/shop?category=Tops">Tops</Link>
          <Link href="/shop?category=Skirts">Skirts</Link>
        </div>
        <div className="text-sm flex flex-col gap-2">
          <h3 className="text-marble font-medium mb-1">Misesha</h3>
          <span>Istanbul &amp; Bodrum</span>
          <span>© 2026 Misesha</span>
        </div>
      </div>
    </footer>
  );
}
