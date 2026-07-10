"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { useCart } from "@/lib/cart-context";

export function CheckoutForm({ shippingValid }: { shippingValid: boolean }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    if (!shippingValid) {
      setError("Fill in your shipping details above before paying.");
      return;
    }

    setSubmitting(true);
    setError("");

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message ?? "Your card was declined. Try another card.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      clear();
      router.push(`/order-confirmation?payment_intent=${paymentIntent.id}`);
      return;
    }

    setError("Payment did not complete. Try again.");
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      <p className="text-xs text-espresso/50">
        Testing? Use card{" "}
        <span className="font-medium text-espresso/70">4242 4242 4242 4242</span>, any
        future expiry, any CVC.
      </p>
      {error && (
        <p role="alert" className="text-sm text-rosewood">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full bg-rosewood text-marble text-sm tracking-wide uppercase py-3.5 rounded-full hover:bg-rosewood/90 disabled:opacity-50"
      >
        {submitting ? "Paying…" : "Pay now"}
      </button>
    </form>
  );
}
