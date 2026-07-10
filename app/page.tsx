import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollCanvas, type LookbookItem } from "@/components/ScrollCanvas";
import { ParallaxSection } from "@/components/ParallaxSection";
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

const LOOKBOOK: LookbookItem[] = [
  {
    src: "/images/lookbook-blue-halter-gown.jpg",
    name: "Adriatico Halter Gown",
    color: "Adriatico · Sky satin",
    price: "₺4,200",
    slug: "adriatico-slip-dress",
  },
  {
    src: "/images/lookbook-yellow-tiered-skirt.jpg",
    name: "Burro Tiered Skirt",
    color: "Burro · Sunlit chiffon",
    price: "₺2,800",
    slug: "cipria-wrap-skirt",
  },
  {
    src: "/images/lookbook-yellow-corset-top.jpg",
    name: "Burro Corset Top",
    color: "Burro · Ruffle cotton",
    price: "₺1,900",
    slug: "cipria-wrap-top",
  },
];

export default function Home() {
  const newIn = PRODUCTS.slice(0, 4);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ── Fixed hero: pinned to viewport; content slides over it on scroll ── */}
        <section className="fixed top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-riad-arch.jpg"
            alt="Woman in white lace dress standing beneath a carved Moroccan arch, lush riad courtyard behind"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] hero-zoom"
          />
          {/* Bottom gradient — text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/15 to-transparent" />
          {/* Top gradient — nav always readable regardless of hero image content */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-espresso/60 to-transparent" />

          {/* Text block anchored to bottom-left */}
          <div className="absolute inset-0 flex flex-col justify-end px-8 pb-16 md:px-16 md:pb-20">
            <div className="max-w-[580px]">
              <span
                className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-marble/80 font-medium"
                style={{ animation: "zoom-in-up 0.5s ease-out 0.2s both" }}
              >
                <BowIcon className="w-5 h-3 text-cipria" />
                Resort Edit, Vol. 1
              </span>
              <h1
                className="font-display text-5xl md:text-7xl text-marble leading-[1.05] mt-3"
                style={{ animation: "zoom-in-up 0.6s ease-out 0.4s both" }}
              >
                Tied in ribbon,{" "}
                <em className="italic text-cipria">worn like skin.</em>
              </h1>
              <p
                className="mt-4 text-marble/70 max-w-md text-base"
                style={{ animation: "zoom-in-up 0.6s ease-out 0.55s both" }}
              >
                Slips, corset tops and lace sets stitched for the mornings you
                take slow — from a kitchen table in Bodrum to your own.
              </p>
              <div style={{ animation: "zoom-in-up 0.6s ease-out 0.7s both" }}>
                <Link
                  href="/shop"
                  className="group inline-block mt-6 bg-marble text-espresso text-sm tracking-wide uppercase rounded-full relative overflow-hidden"
                >
                  <span className="block px-6 py-3 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-full">
                    Shop New In
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0"
                    aria-hidden="true"
                  >
                    Shop New In
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator — running line */}
          <div className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-3">
            <span className="text-marble/40 text-[9px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">
              Scroll
            </span>
            <div className="w-px h-14 bg-marble/20 overflow-hidden relative">
              <div
                className="absolute inset-x-0 top-0 h-full bg-marble/60"
                style={{ animation: "scroll-line 1.8s ease-in-out infinite" }}
              />
            </div>
          </div>
        </section>

        {/* Spacer — pushes the sliding content below the hero on initial load */}
        <div className="h-[100dvh]" aria-hidden="true" />

        {/* Sliding content layer — covers the fixed hero as user scrolls */}
        <div className="relative z-10 bg-marble shadow-[0_-8px_40px_rgba(42,35,32,0.18)] rounded-t-[2px]">

        {/* Canvas lookbook — garments float on dark bg, scroll crossfades between them */}
        <ScrollCanvas items={LOOKBOOK} />

        <section className="mx-auto max-w-[1320px] px-5 py-10 md:py-16">
          <ScrollReveal className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
              <BowIcon className="w-5 h-3" />
              New In — This Week&rsquo;s Stitching
            </span>
            <h2 className="font-display text-3xl mt-3">
              Four colours, held all the way through
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {newIn.map((product, i) => (
              <ScrollReveal key={product.slug} delay={i * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 md:py-20">
          <ScrollReveal className="text-center mb-10 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
              <BowIcon className="w-5 h-3" />
              The Riad Edit
            </span>
            <h2 className="font-display text-3xl mt-3">Every arch led to the same pool</h2>
            <p className="mt-3 text-espresso/70">
              Three new pieces, shot over one afternoon in a Marrakech
              courtyard — checkerboard tile, a pool nobody stayed out of.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RIAD_EDIT.map((shot, i) => (
              <ScrollReveal key={shot.src} delay={i * 130} variant="scale">
                <figure>
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
              </ScrollReveal>
            ))}
          </div>
        </section>

        <ParallaxSection
          src="/images/mood-arch-bathroom.webp"
          alt="Blush pink tiled archway with a brass Moroccan lantern, potted palms and a pink marble tub."
          quote={
            <p className="font-display italic text-2xl md:text-4xl text-marble text-center max-w-lg">
              One colour, held all the way through — that&rsquo;s the whole idea.
            </p>
          }
        />

        <section className="mx-auto max-w-[1320px] px-5 py-16 md:py-20">
          <ScrollReveal className="text-center mb-10 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-rosewood font-medium">
              <BowIcon className="w-5 h-3" />
              A Borrowed Apartment
            </span>
            <h2 className="font-display text-3xl mt-3">Same rule, a different room</h2>
            <p className="mt-3 text-espresso/70">
              Cipria, Adriatico and Panna, shot together one afternoon in a
              gilded Paris apartment — rabbits included.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BORROWED_APARTMENT.map((shot, i) => (
              <ScrollReveal key={shot.src} delay={i * 130} variant="scale">
                <figure>
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
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <ScrollReveal variant="left">
            <div className="relative aspect-[4/5] arch overflow-hidden">
              <Image
                src="/images/campaign-reading-corner.jpg"
                alt="Woman seated on a pink tiled bench beside a brass lantern, reading a book in the ribbed knit dress."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={150}>
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
              <Link href="/shop" className="group inline-flex mt-5 text-sm text-rosewood relative overflow-hidden">
                <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-full underline">See the Shop</span>
                <span className="absolute top-0 left-0 translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 underline" aria-hidden>See the Shop</span>
              </Link>
            </div>
          </ScrollReveal>
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

          <Footer />
        </div>{/* end sliding content layer */}
      </main>
    </>
  );
}
