"use client";

import { useState, type SubmitEvent } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-marble">You&rsquo;re on the list. See you Thursday.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@example.com"
        className="flex-1 bg-transparent border border-marble/30 rounded-full px-4 py-2.5 text-sm text-marble placeholder:text-marble/50"
      />
      <button
        type="submit"
        className="bg-marble text-espresso text-sm tracking-wide uppercase px-5 py-2.5 rounded-full hover:bg-marble/90"
      >
        Notify Me
      </button>
    </form>
  );
}
