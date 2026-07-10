import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShopClient } from "@/components/ShopClient";

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense>
          <ShopClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
