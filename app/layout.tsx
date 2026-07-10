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
  title: {
    default: "Misesha",
    template: "%s — Misesha",
  },
  description:
    "Small-batch slips, corset tops and lace sets, hand-finished in colours held all the way through. New colours every Thursday.",
  keywords: ["misesha", "slip dress", "lace set", "corset top", "small batch fashion", "handmade"],
  openGraph: {
    title: "Misesha",
    description: "Small-batch slips, corset tops and lace sets, hand-finished in colours held all the way through.",
    siteName: "Misesha",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/misesha-mark.svg",
    shortcut: "/misesha-mark.svg",
    apple: "/misesha-mark.svg",
  },
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
