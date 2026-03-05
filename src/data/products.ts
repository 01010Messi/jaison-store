// All product data for jaison store
// Used by shop pages (static rendering) and seed script

export type Product = ProductData;

export interface ProductData {
  name: string;
  slug: string;
  sku: string;
  price: number;
  weight: number;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  howToUse: string;
  benefits: string;
  image: string;
  tags: string[];
  isFeatured: boolean;
}

export const categories = [
  {
    name: "Skin Care",
    slug: "skin-care",
    description:
      "Natural, herbal skin care products crafted from pure ayurvedic ingredients for radiant, healthy skin.",
    image: "/images/categories/skin-care.jpg",
  },
  {
    name: "Hair Care",
    slug: "hair-care",
    description:
      "Traditional hair care powders and treatments to nourish, strengthen, and revitalize your hair naturally.",
    image: "/images/categories/hair-care.jpg",
  },
  {
    name: "Body Care",
    slug: "body-care",
    description:
      "Holistic body care solutions made from earth's finest herbs for complete wellness.",
    image: "/images/categories/body-care.jpg",
  },
];

export const products: ProductData[] = [
  {
    name: "Ubtan Face Pack",
    slug: "ubtan",
    sku: "JAIS-UBTAN-001",
    price: 550,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "A luxurious blend of turmeric, sandalwood, and gram flour for glowing skin.",
    description:
      "Our Ubtan Face Pack is a time-tested ayurvedic formulation that has been used for centuries to achieve naturally glowing, blemish-free skin. This premium blend combines the brightening power of turmeric with the cooling properties of sandalwood, the cleansing action of gram flour, and the nourishing benefits of almond powder.\n\nUnlike chemical-laden products, this ubtan works gently with your skin's natural processes. It removes dead skin cells, unclogs pores, evens out skin tone, and leaves your face feeling soft, smooth, and luminous. The traditional recipe has been refined to ensure the finest grain size for comfortable application and maximum effectiveness.\n\nPacked in a jar to preserve freshness and potency, our Ubtan Face Pack is your daily gateway to the radiant complexion that generations of women have cherished.",
    ingredients:
      "Turmeric (Curcuma longa), Sandalwood Powder (Santalum album), Gram Flour (Cicer arietinum), Almond Powder (Prunus dulcis), Rose Petal Powder (Rosa centifolia), Saffron Extract (Crocus sativus), Milk Powder, Camphor (trace)",
    howToUse:
      "Mix 2 tablespoons of Ubtan with rose water, milk, or curd to form a smooth paste. Apply evenly on face and neck, avoiding the eye area. Leave on for 15-20 minutes until semi-dry. Gently scrub in circular motions while washing off with lukewarm water. Use 2-3 times a week for best results. For bridal glow, mix with raw milk and a pinch of saffron.",
    benefits:
      "Brightens complexion naturally\nReduces tan and pigmentation\nExfoliates dead skin cells gently\nUnclogs pores and prevents acne\nImproves skin texture and elasticity\nAnti-inflammatory and antibacterial\nSuitable for all skin types",
    image: "/images/products/ubtan.jpg",
    tags: ["bestseller", "skin-brightening", "anti-tan", "face-pack"],
    isFeatured: true,
  },
  {
    name: "Amla Powder",
    slug: "amla-powder",
    sku: "JAIS-AMLA-001",
    price: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "Pure Indian gooseberry powder for stronger, thicker, and healthier hair.",
    description:
      "jaison Amla Powder is sourced from premium Indian gooseberries (Phyllanthus emblica), sun-dried and stone-ground to preserve their rich vitamin C content and natural potency. Amla has been the cornerstone of ayurvedic hair care for millennia — revered as the single most effective herb for hair health.\n\nThis versatile powder strengthens hair from root to tip, reduces premature greying, promotes new growth, and adds a natural shine that no synthetic product can match. Rich in antioxidants, tannins, and gallic acid, it conditions the scalp, fights dandruff, and creates the ideal environment for healthy hair growth.\n\nOur Amla Powder is 100% pure with no additives, fillers, or preservatives. Each pouch is sealed fresh to lock in the tangy aroma and potent nutrients.",
    ingredients: "100% Pure Amla (Phyllanthus emblica) powder",
    howToUse:
      "For hair mask: Mix 3-4 tablespoons with warm water or coconut oil to form a paste. Apply to scalp and hair. Leave for 30-45 minutes, then wash with mild shampoo. For hair rinse: Soak 2 tablespoons in water overnight, strain, and use as a final rinse after washing. For consumption: Mix 1 teaspoon in warm water with honey. Use 2-3 times a week for best results.",
    benefits:
      "Strengthens hair follicles and reduces hair fall\nPrevents premature greying\nPromotes hair growth and thickness\nNatural conditioner for soft, shiny hair\nRich in Vitamin C and antioxidants\nFights dandruff and scalp infections\nCan be used on skin for brightening",
    image: "/images/products/amla.jpg",
    tags: ["hair-growth", "anti-greying", "vitamin-c", "natural-conditioner"],
    isFeatured: true,
  },
  {
    name: "Neem Powder",
    slug: "neem-powder",
    sku: "JAIS-NEEM-001",
    price: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Pure neem leaf powder — nature's most powerful antibacterial for clear skin.",
    description:
      "jaison Neem Powder is made from shade-dried neem leaves (Azadirachta indica), carefully ground to a fine consistency that's perfect for face packs and skin treatments. Known as the \"village pharmacy\" in India, neem has been the go-to remedy for skin problems for thousands of years.\n\nThis potent antibacterial, antifungal, and anti-inflammatory powder works wonders on acne-prone skin, helping to clear breakouts, reduce redness, and prevent future blemishes. It purifies the blood, detoxifies the skin, and promotes a clear, healthy complexion without any harsh chemicals.\n\nOur Neem Powder is ethically sourced from mature neem trees and processed without heat to retain maximum bioactive compounds including nimbin, nimbidin, and azadirachtin.",
    ingredients: "100% Pure Neem Leaf (Azadirachta indica) powder",
    howToUse:
      "For face pack: Mix 2 tablespoons with rose water or yogurt. Apply on face, leave for 15-20 minutes, wash off. For spot treatment: Make a thick paste with water and apply on pimples overnight. For hair: Mix with coconut oil and apply on scalp to fight dandruff. For bath: Add 2-3 tablespoons to bath water for antibacterial cleansing. Use 2-3 times a week.",
    benefits:
      "Powerful antibacterial and antifungal properties\nClears acne and prevents breakouts\nReduces inflammation and redness\nTreats dandruff and scalp infections\nPurifies and detoxifies skin\nHelps fade acne scars and dark spots\nSuitable for oily and combination skin",
    image: "/images/products/neem.jpg",
    tags: ["anti-acne", "antibacterial", "skin-purifying", "face-pack"],
    isFeatured: true,
  },
  {
    name: "Shikakai Powder",
    slug: "shikakai-powder",
    sku: "JAIS-SHIK-001",
    price: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "Nature's own shampoo — gentle, chemical-free cleansing for silky hair.",
    description:
      "jaison Shikakai Powder is the ultimate natural hair cleanser, made from the dried pods of the Acacia concinna tree. Known as \"fruit for hair\" in Sanskrit, Shikakai has been India's favourite hair wash for centuries — long before shampoos existed.\n\nUnlike commercial shampoos that strip your hair of natural oils, Shikakai cleanses gently while maintaining the scalp's natural pH balance. It creates a mild, natural lather that removes dirt and excess oil without the harshness of sulfates. The result is hair that's clean, soft, bouncy, and full of life.\n\nRich in vitamins A, C, D, E, and K, our Shikakai powder also acts as a natural detangler and strengthener, reducing breakage and promoting longer, healthier hair growth.",
    ingredients: "100% Pure Shikakai (Acacia concinna) pod powder",
    howToUse:
      "As natural shampoo: Mix 3-4 tablespoons with warm water to form a paste. Apply to wet hair and scalp, massage gently for 2-3 minutes, then rinse thoroughly. No additional shampoo needed. As hair pack: Mix with amla and reetha powder in equal parts for a complete hair treatment. Leave for 20 minutes, then wash off. Use 2-3 times a week for best results.",
    benefits:
      "Gentle, sulfate-free hair cleansing\nMaintains scalp's natural pH balance\nNatural detangler — reduces knots and breakage\nStrengthens hair roots and reduces hair fall\nAdds natural shine and volume\nFights dandruff without drying the scalp\nSafe for colour-treated hair",
    image: "/images/products/shikakai.jpg",
    tags: [
      "natural-shampoo",
      "hair-cleansing",
      "detangler",
      "sulfate-free",
    ],
    isFeatured: true,
  },
  {
    name: "Multani Mitti",
    slug: "multani-mitti",
    sku: "JAIS-MULT-001",
    price: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Premium fuller's earth — deep-cleansing clay for oil control and glowing skin.",
    description:
      "jaison Multani Mitti is premium-grade fuller's earth, finely ground to a silky, lump-free consistency that glides onto skin effortlessly. This mineral-rich clay has been a beauty staple across India for generations, prized for its unmatched ability to absorb excess oil, draw out impurities, and leave skin feeling clean, fresh, and tightened.\n\nOur Multani Mitti is sourced from the finest deposits, tested for purity, and processed to achieve the perfect texture — fine enough for smooth application yet potent enough for deep cleansing. It's rich in magnesium chloride and calcium bentonite, which work together to detoxify, tone, and rejuvenate your skin.\n\nWhether used alone or blended with rose water, turmeric, or neem, this versatile clay adapts to your skin's needs for a customized at-home facial experience.",
    ingredients:
      "100% Pure Fuller's Earth (Multani Mitti / Calcium Bentonite clay)",
    howToUse:
      "Mix 2-3 tablespoons with rose water, yogurt, or honey to form a smooth paste. Apply evenly on face and neck. Leave for 15-20 minutes until it dries. Wash off with lukewarm water using gentle circular motions. Follow with a light moisturizer. For oily skin, use 2-3 times a week. For dry skin, add honey or milk and use once a week.",
    benefits:
      "Deep cleanses pores and removes impurities\nControls excess oil and sebum production\nTightens and tones skin naturally\nReduces appearance of pores\nImproves blood circulation to the face\nNatural cooling effect — soothes irritated skin\nIdeal for oily and combination skin types",
    image: "/images/products/multani.jpg",
    tags: ["face-pack", "oil-control", "deep-cleansing", "clay-mask"],
    isFeatured: true,
  },
  {
    name: "Orange Peel Powder",
    slug: "orange-peel-powder",
    sku: "JAIS-ORNG-001",
    price: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Vitamin C-rich orange peel powder for bright, youthful, and even-toned skin.",
    description:
      "jaison Orange Peel Powder is made from sun-dried Nagpur orange peels, carefully dehydrated and ground to retain maximum vitamin C and citric acid content. This zesty, aromatic powder is a powerhouse of natural brightening agents that work to even out skin tone, reduce dark spots, and give you a fresh, radiant glow.\n\nOrange peel contains three times more vitamin C than the fruit's flesh, making it an exceptional ingredient for stimulating collagen production, fighting free radical damage, and reversing the signs of ageing. The natural citric acid acts as a gentle chemical exfoliant, removing dead cells to reveal brighter skin beneath.\n\nOur Orange Peel Powder has a pleasant citrus aroma that makes your skincare routine feel like an indulgent spa experience.",
    ingredients: "100% Pure Orange Peel (Citrus sinensis) powder",
    howToUse:
      "For face pack: Mix 2 tablespoons with yogurt or honey. Apply on face and neck, leave for 15-20 minutes, wash off. For scrub: Mix with a little water and gently exfoliate in circular motions. For tan removal: Mix with lemon juice and apply on tanned areas for 10 minutes. For lip care: Mix with honey and scrub lips gently. Use 2-3 times a week.",
    benefits:
      "Rich in Vitamin C for skin brightening\nNatural bleaching agent — reduces tan\nFades dark spots and pigmentation\nStimulates collagen production\nGentle exfoliation removes dead skin cells\nAnti-ageing — fights fine lines and wrinkles\nControls acne and blackheads",
    image: "/images/products/orange.jpg",
    tags: ["vitamin-c", "skin-brightening", "anti-tan", "exfoliating"],
    isFeatured: true,
  },
  {
    name: "Mhendi Powder",
    slug: "mhendi-powder",
    sku: "JAIS-MHND-001",
    price: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "Triple-sifted henna powder for rich colour, deep conditioning, and healthy hair.",
    description:
      "jaison Mhendi Powder is made from the finest Rajasthani henna leaves (Lawsonia inermis), triple-sifted to achieve an ultra-fine consistency that ensures smooth paste preparation and even colour distribution. This 100% natural hair dye has been trusted for centuries to deliver rich, vibrant colour without any of the damage caused by chemical dyes.\n\nBeyond colour, our Mhendi deeply conditions hair, strengthens each strand from within, and creates a protective coating that shields against environmental damage. The natural lawsone molecule binds with the hair's keratin to deliver long-lasting colour that doesn't fade into unnatural tones.\n\nEach pouch of our Mhendi Powder is sealed immediately after grinding to lock in the colour-releasing compounds and ensure you get the richest, most vibrant results every time.",
    ingredients:
      "100% Pure Henna Leaf (Lawsonia inermis) powder — no PPD, no metallic salts, no chemicals",
    howToUse:
      "Mix the desired amount with warm water (or black tea for richer colour) to form a yogurt-like paste. Let it sit for 6-8 hours or overnight for maximum colour release. Apply to clean, dry hair section by section. Cover with a shower cap and leave for 2-4 hours depending on desired intensity. Rinse thoroughly with plain water — do not shampoo for 24 hours. For conditioning without colour, mix with yogurt and apply for 30 minutes.",
    benefits:
      "100% natural hair colouring — no chemicals\nDeep conditions and softens hair\nStrengthens hair strands and reduces breakage\nCovers grey hair effectively\nAdds volume and body to fine hair\nCools the scalp and prevents dandruff\nSafe for regular use — no side effects",
    image: "/images/products/mhendi.jpg",
    tags: ["hair-colour", "natural-dye", "deep-conditioning", "henna"],
    isFeatured: false,
  },
  {
    name: "Reetha Powder",
    slug: "reetha-powder",
    sku: "JAIS-RETH-001",
    price: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "Natural soapnut powder — the gentle, eco-friendly hair cleanser with built-in conditioning.",
    description:
      "jaison Reetha Powder is made from premium-quality soapnut berries (Sapindus mukorossi), dried and ground to create a natural, plant-based cleanser that's gentle enough for daily use yet effective enough to replace your shampoo entirely.\n\nReetha contains natural saponins — plant-derived surfactants that produce a gentle lather to cleanse hair and scalp without stripping natural oils. This makes it the perfect choice for anyone looking to transition away from chemical shampoos. It cleanses, conditions, and adds shine in one simple step.\n\nOur Reetha is sourced from the foothills of the Himalayas, where the soapnut trees grow in their natural habitat, producing berries with the highest saponin content.",
    ingredients: "100% Pure Reetha (Sapindus mukorossi) powder",
    howToUse:
      "As natural shampoo: Soak 3-4 tablespoons in warm water for 30 minutes. Apply the soapy solution to wet hair, massage well, and rinse. As hair pack: Mix with shikakai and amla in equal parts. Add water to make a paste, apply on hair for 20 minutes, then wash off. For laundry/cleaning: Mix with warm water for a natural, eco-friendly cleanser. Use 2-3 times a week.",
    benefits:
      "Natural saponins provide gentle, chemical-free cleansing\nDoesn't strip hair of natural oils\nAdds natural shine and softness\nAnti-dandruff and anti-lice properties\nEnvironmentally friendly — 100% biodegradable\nSuitable for sensitive scalps\nCan be combined with shikakai and amla for complete hair care",
    image: "/images/products/reetha.jpg",
    tags: ["natural-cleanser", "soapnut", "eco-friendly", "gentle-shampoo"],
    isFeatured: false,
  },
  {
    name: "Nagmotha Powder",
    slug: "nagmotha-powder",
    sku: "JAIS-NAGM-001",
    price: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Rare ayurvedic herb for skin whitening, anti-ageing, and natural fragrance.",
    description:
      "jaison Nagmotha Powder is made from the dried rhizomes of Cyperus rotundus (Nagarmotha/Mustak), a prized herb in Ayurveda known for its remarkable skin-enhancing and aromatic properties. This lesser-known gem has been a closely guarded secret of traditional Indian beauty care.\n\nNagmotha is one of the few herbs that offers both cosmetic and therapeutic benefits. It naturally lightens skin tone, fights signs of ageing, and imparts a subtle, earthy fragrance that has made it a traditional ingredient in natural attars and body powders. Its anti-inflammatory and antioxidant properties soothe irritated skin while promoting cell regeneration.\n\nOur Nagmotha is carefully sourced, cleaned, and ground to a fine powder that blends easily into face packs, body scrubs, and bath powders.",
    ingredients: "100% Pure Nagarmotha (Cyperus rotundus) rhizome powder",
    howToUse:
      "For face pack: Mix 1-2 tablespoons with multani mitti and rose water. Apply for 15-20 minutes, wash off. For body powder: Mix with sandalwood and gram flour for a fragrant body powder. For bath: Add to bathing water for aromatic, skin-softening bath. For massage oil: Infuse in coconut oil for 2 weeks, strain, and use as body oil. Use 2-3 times a week.",
    benefits:
      "Natural skin lightening and brightening\nAnti-ageing — reduces fine lines and wrinkles\nPleasant, earthy natural fragrance\nAnti-inflammatory — soothes irritated skin\nAntioxidant protection against environmental damage\nPromotes even skin tone\nTraditional ingredient in natural perfumery",
    image: "/images/products/nagmotha.jpg",
    tags: ["skin-lightening", "anti-ageing", "aromatic", "rare-herb"],
    isFeatured: false,
  },
  {
    name: "Silkeshine Hair Serum",
    slug: "silkeshine",
    sku: "JAIS-SILK-001",
    price: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "Lightweight herbal hair serum for instant shine, smoothness, and frizz control.",
    description:
      "jaison Silkeshine is our signature hair serum formulated with a blend of precious ayurvedic oils and herbal extracts. This lightweight, non-greasy formula tames frizz, adds brilliant shine, and protects your hair from heat and environmental damage.\n\nUnlike silicone-based serums that merely coat the hair surface, Silkeshine uses natural plant oils that penetrate the hair shaft to nourish from within. The result is hair that's genuinely healthier — not just temporarily smoothed. Each application delivers deep conditioning, split-end repair, and a lustrous finish.\n\nThe unique blend includes cold-pressed argan oil, bhringraj extract, and jojoba oil — each chosen for their proven hair-transforming properties.",
    ingredients:
      "Argan Oil (Argania spinosa), Bhringraj Extract (Eclipta alba), Jojoba Oil (Simmondsia chinensis), Almond Oil (Prunus dulcis), Vitamin E (Tocopherol), Rose Essential Oil",
    howToUse:
      "Take 2-3 drops (more for longer hair) on palms. Rub palms together and apply through damp or dry hair, focusing on mid-lengths and ends. Do not apply to roots unless scalp is very dry. Can be used before heat styling for protection, or after styling for finishing shine. Use daily or as needed.",
    benefits:
      "Instant frizz control and smoothness\nAdds brilliant, natural shine\nProtects from heat styling damage\nRepairs split ends\nLightweight, non-greasy formula\nDeep nourishment with natural oils\nPleasant, subtle rose fragrance",
    image: "/images/products/ubtan.jpg", // Placeholder — no styled image for Silkeshine
    tags: ["hair-serum", "frizz-control", "shine", "heat-protection"],
    isFeatured: false,
  },
];

// Helper to get products by category
export function getProductsByCategory(categorySlug: string): ProductData[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

// Helper to get featured products
export function getFeaturedProducts(): ProductData[] {
  return products.filter((p) => p.isFeatured);
}

// Helper to get a single product by slug
export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug);
}
