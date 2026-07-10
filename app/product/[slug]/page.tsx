import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, getRelated } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const related = getRelated(product);

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProductDetail product={product} related={related} />
      </main>
      <Footer />
    </>
  );
}
