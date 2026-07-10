export type Category = "Tops" | "Skirts" | "Dresses";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  color: string;
  colorHex: string;
  price: number;
  image: string;
  alt: string;
  tagline: string;
  description: string;
  details: string[];
  gallery: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "cipria-wrap-top",
    name: "Cipria Wrap Top",
    category: "Tops",
    color: "Blush",
    colorHex: "#f1d6d2",
    price: 1450,
    image: "/images/product-blush-top.jpeg",
    alt: "Blush pink draped wrap top with a covered back zip.",
    tagline: "Blush cotton-silk, cowl drape front",
    description:
      "Cut from a cotton-silk blend in the same blush we used for the very first Misesha sample. The draped front sits soft against the collarbone; the back closes with a covered zip so nothing catches on your hair.",
    details: [
      "70% cotton, 30% silk",
      "Covered back zip",
      "Hand wash cold, dry flat",
      "Made in small batches in Bodrum",
    ],
    gallery: [
      "/images/product-blush-top.jpeg",
      "/images/campaign2-cipria-candelabra.jpeg",
      "/images/campaign2-cipria-wallpaper.jpeg",
    ],
  },
  {
    slug: "cipria-wrap-skirt",
    name: "Cipria Wrap Skirt",
    category: "Skirts",
    color: "Blush",
    colorHex: "#f1d6d2",
    price: 1690,
    image: "/images/product-blush-skirt.jpeg",
    alt: "Blush pink A-line maxi skirt with an elastic waistband.",
    tagline: "Blush cotton-silk, elastic waist",
    description:
      "The matching skirt to the Cipria Wrap Top, cut long and full so it moves when you walk. The elastic waist means you can wear it with or without a top tucked in.",
    details: [
      "70% cotton, 30% silk",
      "Elastic waistband",
      "Hand wash cold, dry flat",
      "Made in small batches in Bodrum",
    ],
    gallery: [
      "/images/product-blush-skirt.jpeg",
      "/images/campaign2-cipria-candelabra.jpeg",
      "/images/campaign2-cipria-wallpaper.jpeg",
    ],
  },
  {
    slug: "adriatico-slip-dress",
    name: "Adriatico Slip Dress",
    category: "Dresses",
    color: "Sky",
    colorHex: "#aecbdd",
    price: 2290,
    image: "/images/product-sky-slip.jpeg",
    alt: "Powder blue satin halter slip dress with ivory lace trim.",
    tagline: "Sky satin, lace-trimmed neckline, tie halter",
    description:
      "A bias-cut satin slip in the sky blue we couldn't find anywhere else, finished with a scalloped lace neckline and a halter tie you knot yourself. Falls to a clean, floor-length line.",
    details: [
      "100% satin-finish polyester, lace trim",
      "Adjustable halter tie",
      "Dry clean only",
      "Made in small batches in Bodrum",
    ],
    gallery: [
      "/images/product-sky-slip.jpeg",
      "/images/campaign2-adriatico-wallpaper.jpeg",
      "/images/campaign2-adriatico-vanity.jpeg",
    ],
  },
  {
    slug: "panna-ribbed-gown",
    name: "Panna Ribbed Gown",
    category: "Dresses",
    color: "Ivory",
    colorHex: "#efe6d8",
    price: 2690,
    image: "/images/product-cream-gown.jpeg",
    alt: "Cream ribbed knit column gown with a square neckline and a cut-out waist.",
    tagline: "Ivory ribbed knit, cut-out waist, belt buckle detail",
    description:
      "The dress that started Misesha. Ribbed knit in a single held-through ivory, a square neckline, and a cut-out waist finished with a small belt buckle instead of a seam. Shot the whole way through an afternoon in a pink-tiled room in Bodrum.",
    details: [
      "88% viscose, 12% elastane rib knit",
      "Cut-out waist with belt-buckle trim",
      "Hand wash cold, dry flat",
      "Made in small batches in Bodrum",
    ],
    gallery: [
      "/images/product-cream-gown.jpeg",
      "/images/campaign3-riad-palms-gown.jpg",
      "/images/campaign-back-view.jpg",
      "/images/campaign-reading-tub.jpg",
      "/images/campaign-reading-corner.jpg",
      "/images/campaign-overhead-tub.jpg",
      "/images/campaign2-panna-salon-rabbits.jpeg",
      "/images/campaign2-panna-vanity.jpeg",
    ],
  },
  {
    slug: "burro-corset-top",
    name: "Burro Corset Top",
    category: "Tops",
    color: "Buttercream",
    colorHex: "#f5ead6",
    price: 1690,
    image: "/images/product-butter-corset.jpeg",
    alt: "Buttercream ruffled corset top with lace stripes and a tied front.",
    tagline: "Buttercream lace, tie-front, ruffle hem",
    description:
      "A corset-inspired top in soft buttercream cotton, boned lightly at the front and finished with a hand-tied ribbon and a ruffled hem. Wears just as well over jeans as it does with the Burro Tiered Skirt.",
    details: [
      "100% cotton with lace insets",
      "Front lacing, light boning",
      "Hand wash cold, dry flat",
      "Made in small batches in Bodrum",
    ],
    gallery: [
      "/images/product-butter-corset.jpeg",
      "/images/campaign2-burro-salon-rabbits.jpeg",
    ],
  },
  {
    slug: "burro-tiered-skirt",
    name: "Burro Tiered Skirt",
    category: "Skirts",
    color: "Buttercream",
    colorHex: "#f5ead6",
    price: 1890,
    image: "/images/product-butter-skirt.jpeg",
    alt: "Buttercream tiered ruffle maxi skirt with a smocked waistband.",
    tagline: "Buttercream cotton, smocked waist, three ruffled tiers",
    description:
      "Three ruffled tiers in the same buttercream as the Burro Corset Top, with a smocked waistband that stretches to fit. The kind of skirt that does the work of an outfit on its own.",
    details: [
      "100% cotton",
      "Smocked, stretch waistband",
      "Hand wash cold, dry flat",
      "Made in small batches in Bodrum",
    ],
    gallery: [
      "/images/product-butter-skirt.jpeg",
      "/images/campaign2-burro-salon-rabbits.jpeg",
    ],
  },
  {
    slug: "pois-dress",
    name: "Pois Dress",
    category: "Dresses",
    color: "Cream",
    colorHex: "#f3ece0",
    price: 2150,
    image: "/images/product-pois-dress.jpeg",
    alt: "Cream polka-dot midi dress with a black lace-trimmed neckline.",
    tagline: "Cream polka-dot, black lace trim, puff sleeves",
    description:
      "Our one printed piece this season — cream with a scattered black polka dot, a black lace-trimmed neckline, and puff sleeves that stay put. Cut on the bias so it moves with you.",
    details: [
      "100% viscose",
      "Black lace neckline trim",
      "Dry clean only",
      "Made in small batches in Bodrum",
    ],
    gallery: ["/images/product-pois-dress.jpeg"],
  },
  {
    slug: "moka-cutout-gown",
    name: "Moka Cut-Out Gown",
    category: "Dresses",
    color: "Espresso",
    colorHex: "#4a2e23",
    price: 2890,
    image: "/images/product-moka-gown.jpeg",
    alt: "Espresso brown satin column gown with waist cut-outs.",
    tagline: "Espresso satin, twin waist cut-outs, column silhouette",
    description:
      "The one Misesha piece built for after dark. Espresso satin, cut close through the body, with twin cut-outs at the waist and a covered back zip. Part of the Night edit — same small-batch rule, different hour.",
    details: [
      "100% satin-finish polyester",
      "Covered back zip",
      "Dry clean only",
      "Made in small batches in Bodrum",
    ],
    gallery: ["/images/product-moka-gown.jpeg"],
  },
];

export function money(n: number): string {
  return "₺" + n.toLocaleString("tr-TR", { minimumFractionDigits: 0 });
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelated(product: Product, max = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  );
  const pool = sameCategory.length > 0
    ? sameCategory
    : PRODUCTS.filter((p) => p.slug !== product.slug);
  return pool.slice(0, max);
}
