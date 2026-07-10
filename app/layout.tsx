import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Misesha — Slips, lace & ribbon-tied basics",
  description:
    "Misesha makes small-batch slips, corset tops and lace sets in colours held all the way through.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-marble text-espresso font-body">
        <CartProvider>
          <LenisProvider>{children}</LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
