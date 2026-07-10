"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BowIcon } from "./BowIcon";

export function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");

  return (
    <div className="text-center py-16 max-w-[560px] mx-auto">
      <BowIcon className="w-16 h-10 text-rosewood mx-auto mb-6" />
      <h1 className="font-display text-3xl mb-3">Thank you — your order is placed.</h1>
      <p className="text-espresso/70 mb-2">
        We&rsquo;re packing it in Bodrum. A confirmation would normally land in your
        inbox — this is test mode, so there&rsquo;s no email, just this screen.
      </p>
      {paymentIntent && (
        <p className="text-sm text-espresso/50 mb-8">Payment reference: {paymentIntent}</p>
      )}
      <Link
        href="/shop"
        className="inline-block bg-rosewood text-marble text-sm tracking-wide uppercase px-6 py-3 rounded-full"
      >
        Keep Shopping
      </Link>
    </div>
  );
}
