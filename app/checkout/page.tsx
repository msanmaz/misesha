"use client";

import { Elements } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useCart } from "@/lib/cart-context";
import { getProduct, money } from "@/lib/products";
import { getStripe } from "@/lib/stripe-client";

type Shipping = {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
};

const EMPTY_SHIPPING: Shipping = {
  name: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const { lines, subtotal, isLoaded } = useCart();
  const [shipping, setShipping] = useState<Shipping>(EMPTY_SHIPPING);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const shippingValid = Object.values(shipping).every((value) => value.trim().length > 0);

  useEffect(() => {
    if (!isLoaded || lines.length === 0 || subtotal <= 0) return;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: subtotal * 100 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setClientSecret(data.clientSecret);
      })
      .catch(() => setError("Could not reach Stripe. Try again."));
  }, [isLoaded, lines.length, subtotal]);

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-[1000px] w-full px-5 py-10">
        <h1 className="font-display text-3xl mb-8">Checkout</h1>

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
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-10">
            <div className="flex flex-col gap-8">
              <section>
                <h2 className="font-display text-xl mb-4">Shipping details</h2>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={shipping.name}
                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    className="border border-espresso/20 rounded-lg px-4 py-3 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    className="border border-espresso/20 rounded-lg px-4 py-3 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    className="border border-espresso/20 rounded-lg px-4 py-3 text-sm"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      className="flex-1 border border-espresso/20 rounded-lg px-4 py-3 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      value={shipping.postalCode}
                      onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                      className="w-32 border border-espresso/20 rounded-lg px-4 py-3 text-sm"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl mb-4">Payment</h2>
                {error && (
                  <p role="alert" className="text-sm text-rosewood mb-3">
                    {error}
                  </p>
                )}
                {clientSecret && (
                  <Elements
                    stripe={getStripe()}
                    options={{ clientSecret, appearance: { theme: "stripe" } }}
                  >
                    <CheckoutForm shippingValid={shippingValid} />
                  </Elements>
                )}
              </section>
            </div>

            <aside className="border border-espresso/10 rounded-2xl p-6 h-fit">
              <h2 className="font-display text-xl mb-4">Order summary</h2>
              <ul className="flex flex-col gap-3 mb-4">
                {lines.map((line) => {
                  const product = getProduct(line.slug);
                  if (!product) return null;
                  return (
                    <li
                      key={`${line.slug}-${line.size}`}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {product.name} · {line.size} × {line.quantity}
                      </span>
                      <span>{money(product.price * line.quantity)}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-between items-baseline pt-4 border-t border-espresso/10">
                <span className="text-espresso/70">Total</span>
                <span className="font-display text-2xl">{money(subtotal)}</span>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
