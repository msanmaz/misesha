import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderConfirmationClient } from "@/components/OrderConfirmationClient";

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-[1000px] w-full px-5">
        <Suspense>
          <OrderConfirmationClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
