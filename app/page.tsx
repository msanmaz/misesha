import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { BowIcon } from "@/components/BowIcon";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PRODUCTS } from "@/lib/products";

const RIAD_EDIT = [
  {
    src: "/images/campaign3-riad-archway.jpg",
    alt: "Woman in a white lace-trimmed dress standing beneath a carved Moroccan archway, overlooking a black-and-white tiled courtyard with a teal pool.",
    caption: "She stood under that arch for one frame. We used all of them.",
  },
  {
    src: "/images/campaign3-riad-poolside-yellow.jpg",
    alt: "Woman in a pale yellow off-shoulder corset dress sitting at the edge of a teal-tiled pool with her feet in the water.",
    caption: "Feet in the pool, dress and all — nobody told her to wait.",
  },
  {
    src: "/images/campaign3-riad-overhead-tile.jpg",
    alt: "Overhead shot of a woman in a white lace-trimmed dress lying across black-and-white checkerboard tile beside a pool.",
    caption: "Flat on the tile because the light was better down there.",
  },
];

const BORROWED_APARTMENT = [
  {
    src: "/images/campaign2-panna-salon-rabbits.jpeg",
    alt: "Woman in the ivory ribbed knit column gown standing before a pink silk settee in a gilded French salon, with white rabbits jumping around her and gilt-framed portraits behind.",
    caption: "Somebody's rabbits got into the shoot. We kept them in every frame after that.",
  },
  {
    src: "/images/campaign2-adriatico-vanity.jpeg",
    alt: "Woman in the sky blue satin slip dress seated at an antique dressing table, applying lip gloss with a hand mirror.",
    caption: "The sky slip, five minutes before we had to give the room back.",
  },
  {
    src: "/images/campaign2-cipria-candelabra.jpeg",
    alt: "Woman in the blush cowl-neck wrap top beside a gilt candelabra in a French period room.",
    caption: "Cipria under someone else's chandelier, one afternoon in a borrowed apartment.",
  },
];

export default function Home() {
  const newIn = PRODUCTS.slice(0, 4);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-[1320px] px-5 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
              <BowIcon className="w-5 h-3" />
              Resort Edit, Vol. 1
            </span>
            <h1 className="font-display text-4xl md:text-5xl leading-tight mt-4">
              Tied in ribbon, <em className="italic text-rosewood">worn like skin.</em>
            </h1>
            <p className="mt-4 text-espresso/75 max-w-md">
              Slips, corset tops and lace sets stitched for the mornings you
              take slow — from a kitchen table in Bodrum to your own.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-6 bg-rosewood text-marble text-sm tracking-wide uppercase px-6 py-3 rounded-full hover:bg-rosewood/90"
            >
              Shop New In
            </Link>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/5] arch overflow-hidden">
            <Image
              src="/images/hero-garden-sundress.jpeg"
              alt="Woman in a buttercream ruffled sundress seated at a garden table"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-10 md:py-16">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
              <BowIcon className="w-5 h-3" />
              New In — This Week&rsquo;s Stitching
            </span>
            <h2 className="font-display text-3xl mt-3">
              Four colours, held all the way through
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {newIn.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 md:py-20">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
              <BowIcon className="w-5 h-3" />
              The Riad Edit
            </span>
            <h2 className="font-display text-3xl mt-3">Every arch led to the same pool</h2>
            <p className="mt-3 text-espresso/70">
              Three new pieces, shot over one afternoon in a Marrakech
              courtyard — checkerboard tile, a pool nobody stayed out of.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RIAD_EDIT.map((shot) => (
              <figure key={shot.src}>
                <div className="relative aspect-[3/4] arch-sm overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-espresso/70">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="relative h-[420px] md:h-[520px]">
          <Image
            src="/images/mood-arch-bathroom.webp"
            alt="Blush pink tiled archway with a brass Moroccan lantern, potted palms and a pink marble tub."
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-espresso/35 flex items-center justify-center px-6">
            <p className="font-display italic text-2xl md:text-4xl text-marble text-center max-w-lg">
              One colour, held all the way through — that&rsquo;s the whole idea.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 md:py-20">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
              <BowIcon className="w-5 h-3" />
              A Borrowed Apartment
            </span>
            <h2 className="font-display text-3xl mt-3">Same rule, a different room</h2>
            <p className="mt-3 text-espresso/70">
              Cipria, Adriatico and Panna, shot together one afternoon in a
              gilded Paris apartment — rabbits included.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BORROWED_APARTMENT.map((shot) => (
              <figure key={shot.src}>
                <div className="relative aspect-[3/4] arch-sm overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-espresso/70">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] arch overflow-hidden">
            <Image
              src="/images/campaign-reading-corner.jpg"
              alt="Woman seated on a pink tiled bench beside a brass lantern, reading a book in the ribbed knit dress."
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
              <BowIcon className="w-5 h-3" />
              The Idea Behind Misesha
            </span>
            <h2 className="font-display text-3xl mt-3">
              Started with one dress we couldn&rsquo;t re-order
            </h2>
            <p className="mt-4 text-espresso/75">
              Misesha started with a bedsheet colour we couldn&rsquo;t find
              anywhere else. Every piece since has followed the same rule:
              soft fabric, a ribbon that actually ties, and a shade you&rsquo;d
              repaint a room in. We cut small runs, finish every edge by
              hand, and stop when the batch runs out.
            </p>
            <Link href="/shop" className="inline-block mt-5 text-sm underline text-rosewood">
              See the Shop
            </Link>
          </div>
        </section>

        <section className="bg-espresso">
          <div className="mx-auto max-w-[1320px] px-5 py-14 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-cipria font-medium">
              <BowIcon className="w-5 h-3" />
              Join the List
            </span>
            <h2 className="font-display text-3xl text-marble mt-3">Get the Thursday drop</h2>
            <p className="mt-2 text-marble/70 max-w-sm">
              One email a week. New colours before they sell out, and
              nothing else.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
