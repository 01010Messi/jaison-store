// All product data for jaison store
// Used by shop pages (static rendering) and seed script

export type Product = ProductData;

export interface ProductData {
  name: string;
  slug: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  weight: number;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  howToUse: string;
  benefits: string;
  image: string;
  images: string[];
  tags: string[];
  isFeatured: boolean;
}

export const categories = [
  {
    name: "Skin Care",
    slug: "skin-care",
    description:
      "Natural, herbal skin care products crafted from pure ayurvedic ingredients for radiant, healthy skin.",
    image: "/images/categories/skin-care.webp",
  },
  {
    name: "Hair Care",
    slug: "hair-care",
    description:
      "Traditional hair care powders and treatments to nourish, strengthen, and revitalize your hair naturally.",
    image: "/images/categories/hair-care.webp",
  },
  {
    name: "Face Care",
    slug: "face-care",
    description:
      "Holistic face care solutions made from earth's finest herbs for complete wellness.",
    image: "/images/categories/face-care.webp",
  },
  {
    name: "Combos",
    slug: "combos",
    description:
      "Curated herbal powder combos at unbeatable prices. Save more with our specially bundled Ayurvedic care sets.",
    image: "/images/products/combo-jaison-special.webp",
  },
];

export const products: ProductData[] = [
  {
    name: "Ubtan Powder",
    slug: "ubtan-powder",
    sku: "JAIS-UBTAN-001",
    price: 440,
    compareAtPrice: 565,
    weight: 50,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "An ancient ritual, a modern skin essential. A generational legacy of timeless beauty.",
    description:
      "An ancient ritual, a modern skin essential. Discover your skin's inner glow.\n\nUbtan by Jaison Herbals is your 100% natural skincare remedy, cherished and trusted across generations, for healthy, luminous skin. Bakuchi promotes collagen and evens skin tone, while Haritaki's natural AHAs provide gentle exfoliation for a brighter, smoother complexion. Exfoliating on a regular basis helps speed up cellular turnover, softening fine lines and wrinkles and diminishing hyperpigmentation. This is the perfect Ayurvedic formula for timeless, radiant skin.\n\nNaturally sun-dried, our Ayurvedic Ubtan is made from fresh herbs, flowers, fruits, and seeds \u2014 100% natural with no synthetic colours or fragrances. One 50 g jar gives approx. 6-8 uses.",
    ingredients:
      "Kachora / White Turmeric (Curcuma zedoaria) 21%, Nagarmotha (Cyperus rotundus) 15%, Orange Peel (Citrus aurantium) 10%, Bakuchi / Babchi (Psoralea corylifolia) 10%, Multani Mitti (Fuller's Earth) 9%, Amba Haldi / Mango Ginger (Curcuma amada) 5%, Baheda / Bibhitaki (Terminalia bellerica) 5%, Lemon Peel (Citrus limon) 5%, Haritaki / Harad (Terminalia chebula) 4%, Haldi / Turmeric (Curcuma longa) 4%, Aloe vera (Aloe barbadensis) 3%, Khus (Andropogon muricatum) 2%, Neem Patta (Azadirachta indica) 2%, Tulsi (Ocimum sanctum) 2%, Gulab Kali (Rosa damascena) 1%, Amla (Emblica officinalis) 1%, Kapoor Kachri (Hedychium spicatum) 1%",
    howToUse:
      "Step 1: Scoop and mix a little magic \u2014 take a generous amount of the ubtan and add a few drops of rose water, milk, or plain water to make a smooth paste.\nStep 2: Massage to bliss \u2014 gently massage onto damp skin in circular motions for 2-3 minutes, letting the scrub work its herbal wonders.\nStep 3: Rinse and radiate \u2014 wash off with lukewarm water, pat dry, and reveal that soft, radiant glow.\nStep 4: Feel the magic \u2014 use 2-3 times a week for that natural radiance.",
    benefits:
      "This clarifying scrub eliminates dirt and impurities that block pores and cause outbreaks.\nIt gently exfoliates and revitalizes the skin, giving you a glowing look.\nBrightens your skin by reducing pigmentation, dark spots, and blemishes.\nThe power of Ayurveda reduces fine lines and visibly diminishes signs of aging.\nIts anti-inflammatory properties soothe and protect the skin, providing antioxidants for rejuvenation.\nNaturally sun-dried and made from fresh herbs, flowers, fruits and seeds \u2014 100% natural with no synthetic colours or fragrances.",
    image: "/images/products/ubtan.webp",
    images: [
      "/images/products/ubtan.webp",
      "/images/products/ubtan-essence.webp",
      "/images/products/ubtan-herbs.webp",
      "/images/products/ubtan-benefits.webp",
      "/images/products/ubtan-how-to-use.webp",
      "/images/products/ubtan-radiant.webp",
      "/images/products/ubtan-styled2.webp",
    ],
    tags: ["bestseller", "skin-brightening", "anti-tan", "face-pack"],
    isFeatured: true,
  },
  {
    name: "Aamla Powder",
    slug: "aamla-powder",
    sku: "JAIS-AMLA-001",
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "Strengthen and rejuvenate with our pure, finely-ground Amla Powder. This Ayurvedic, Vitamin C-rich essential fights hair fall and greying while brightening skin, with a 100% natural, chemical-free formula.",
    description:
      "Nourish and rejuvenate your hair and skin with Jaison's Ayurvedic Amla Powder. Made from sun-dried Indian gooseberries, finely ground into a potent powder, this Ayurvedic superfood is packed with natural Vitamin C and antioxidants renowned for strengthening hair from root to tip. It helps reduce hair fall, delays premature greying, and stimulates the scalp for thicker, healthier growth, while on skin its antioxidant-rich nature helps brighten complexion, fade dullness, and fight early signs of ageing. Free from chemicals, this 100% natural formula draws on centuries of Ayurvedic wisdom, where amla is revered as one of the most powerful rejuvenating herbs for hair and skin.",
    ingredients: "100% Pure Amla (Emblica officinalis) powder",
    howToUse:
      "For Hair:\n1. Mix 2-3 tablespoons of amla powder with water or curd to form a smooth paste.\n2. Apply to scalp and hair, ensuring even coverage from root to tip.\n3. Leave on for 30-40 minutes, then rinse thoroughly with a mild shampoo.\nCombine with reetha and shikakai powder for a traditional, complete hair-growth wash.\n\nFor Skin:\n1. Mix 1-2 teaspoons of amla powder with rose water or honey to form a smooth paste.\n2. Apply evenly onto clean face and neck.\n3. Leave on for 15 minutes, then rinse off with lukewarm water.\nFor extra brightening, mix with a few drops of lemon juice (patch test first).",
    benefits:
      "Rich in natural Vitamin C \u2014 one of nature's most concentrated sources of antioxidant protection for skin and hair.\nStrengthens hair and reduces hair fall by nourishing roots and follicles.\nDelays premature greying, traditionally used in Ayurveda to help maintain natural hair colour for longer.\nStimulates the scalp for thicker, fuller-looking hair over time.\nBrightens and evens skin tone, fading dullness for a more radiant complexion.\nFights signs of ageing by combating free-radical damage for firmer, younger-looking skin.\nImproves the tone of henna hair dyes.\n100% natural and chemical-free \u2014 a pure Ayurvedic superfood free from preservatives and additives.",
    image: "/images/products/amla-front.webp",
    images: [
      "/images/products/amla-front.webp",
      "/images/products/amla-vitamin-c.webp",
      "/images/products/amla-benefits.webp",
      "/images/products/amla-how-to-use.webp",
      "/images/products/amla-back.webp",
      "/images/products/amla-styled.webp",
    ],
    tags: ["bestseller", "hair-growth", "anti-greying", "vitamin-c", "natural-conditioner"],
    isFeatured: true,
  },
  {
    name: "Neem Powder",
    slug: "neem-powder",
    sku: "JAIS-NEEM-001",
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Purify and protect with our pure, finely-milled Neem Powder. This Ayurvedic skin and scalp essential fights acne, dandruff, and irritation with its 100% natural, antibacterial formula.",
    description:
      "Purify and protect your skin and hair with Jaison's Ayurvedic Neem Powder. Made from sun-dried, hand-picked neem leaves and finely milled into a potent powder, this trusted Ayurvedic remedy is prized for its powerful antibacterial and antifungal properties. It works deep to combat acne-causing bacteria, calm inflammation, and clear blemishes, revealing healthier, purified skin, while its cleansing action on the scalp helps control dandruff, itchiness, and hair fall. Free from chemicals, this 100% natural formula draws on neem's centuries-old reputation as Ayurveda's ultimate skin and scalp purifier.",
    ingredients: "100% Pure Neem Leaf (Azadirachta indica) powder",
    howToUse:
      "For Skin:\n1. Mix 1-2 tablespoons of neem powder with rose water or plain water to form a smooth paste.\n2. Apply as an all-over mask, or dab directly onto acne and blemishes as a spot treatment.\n3. Leave on for 15-20 minutes, then rinse off with lukewarm water.\nFor extra soothing on sensitive or acne-prone skin, mix with plain yogurt or aloe vera gel instead of water.\n\nFor Hair:\n1. Combine neem powder with water to form a smooth paste (add a pinch of fenugreek or amla powder for extra nourishment).\n2. Apply directly to the scalp and roots, massaging in gently.\n3. Leave on for 20-30 minutes, then rinse thoroughly with water.\nUse once or twice a week to keep dandruff, itchiness, and hair fall under control.",
    benefits:
      "Purifying and healing \u2014 rich in antibacterial and antifungal properties to combat acne, blackheads and skin irritation.\nDeep nourishment \u2014 hydrates and restores the skin's natural moisture and pH balance for a healthy glow.\nControls dandruff and scalp itchiness by cleansing the scalp of flakes and buildup.\nReduces hair fall by supporting a purified, healthy scalp environment.\nVersatile skincare essential \u2014 works as a toner, face mask, or spot treatment for acne-prone skin.\nYouthful radiance \u2014 helps reduce signs of premature ageing for a smooth, even complexion.",
    image: "/images/products/neem-front.webp",
    images: [
      "/images/products/neem-front.webp",
      "/images/products/neem-hero.webp",
      "/images/products/neem-benefits.webp",
      "/images/products/neem-how-to-use.webp",
      "/images/products/neem-back.webp",
      "/images/products/neem-styled.webp",
    ],
    tags: ["bestseller", "anti-acne", "antibacterial", "skin-purifying", "face-pack"],
    isFeatured: true,
  },
  {
    name: "Shikakai Powder",
    slug: "shikakai-powder",
    sku: "JAIS-SHIK-001",
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "The secret to bouncy locks. Packed with natural vitamins and antioxidants for healthy, lustrous hair the herbal way.",
    description:
      "Find the secret to bouncy locks with Jaison's Shikakai Powder. Made from sun-dried Shikakai pods and rich in natural saponins, our pure, sulphate-free formula gently cleanses the scalp and hair from root to tip without stripping natural moisture. With regular use, you can part ways with split ends, premature greying, and dandruff, and get used to healthy, lustrous hair the herbal way!\n\nShikakai, known as the \u201Cfruit for hair,\u201D has been a staple in Ayurvedic hair care for centuries. Our Shikakai Powder is rich in vitamins C, D, and antioxidants that nourish and protect your hair, with micro-nutrients that strengthen hair from within. Its mild, pH-balanced formula conditions as it cleans \u2014 suitable for all hair types, for men, women, and children alike. Anti-bacterial and anti-fungal properties combat scalp issues like dandruff, while regular use reveals dark, thick and shiny hair.",
    ingredients: "100% Pure Shikakai (Acacia concinna) pod powder",
    howToUse:
      "In a bowl, mix 2-3 tablespoons of Shikakai Powder with warm water to create a smooth paste.\nApply the paste evenly to your hair, working it in from the roots to the tips.\nGently massage your scalp to stimulate blood flow, and leave on for about 10 minutes to allow the nutrients to seep in.\nRinse thoroughly with normal water and follow with a mild shampoo if desired.\nCombine with reetha and amla powder for a complete, traditional herbal hair wash.\nFor best results, use once or twice a week as part of your regular hair care routine.",
    benefits:
      "Purifies and Protects Scalp: Its antibacterial properties keep dandruff, lice, and infections at bay.\nStimulates Hair Growth: Strengthens roots and revitalizes the scalp for thicker, fuller hair.\nPacked with Hair-Loving Antioxidants: Prevents damage, split ends, and premature greying for healthier hair.\nNaturally Smooth & Tangle-Free: Softens hair, reducing frizz and making detangling effortless.\nPure & Chemical-Free Care: A safe, natural alternative to harsh hair products.",
    image: "/images/products/shikakai-front.webp",
    images: [
      "/images/products/shikakai-front.webp",
      "/images/products/shikakai-back.webp",
      "/images/products/shikakai-styled.webp",
      "/images/products/shikakai-styled2.webp",
    ],
    tags: [
      "bestseller",
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
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Purify your skin with our triple filtered multani mitti for skin and hair nourishment. 100% natural, ayurvedic formula free from harsh chemicals.",
    description:
      "Detoxify and refresh your skin and hair with Jaison's Ayurvedic Multani Mitti Powder. Sourced from pure fuller's earth and finely sieved for a silky, lump-free texture, this mineral-rich clay is renowned for its powerful oil-absorbing and deep-cleansing properties. It draws out dirt, excess sebum, and toxins from deep within the pores, leaving skin feeling tight, clean, and refreshed, while its natural cooling effect calms irritated or sun-exposed skin \u2014 ideal for India's climate. On hair, it lifts oil and buildup from the scalp without stripping natural moisture, leaving strands light, voluminous, and grease-free. Free from chemicals, this 100% natural clay powder has been trusted for centuries in Ayurveda to purify skin and hair the traditional way.",
    ingredients:
      "100% Pure Fuller's Earth (Multani Mitti), finely sieved",
    howToUse:
      "For Skin:\n1. Mix 2-3 tablespoons of Multani Mitti powder with rose water or plain water to form a smooth, lump-free paste.\n2. Apply an even layer over face and neck, avoiding the delicate under-eye area.\n3. Leave on until it starts to dry and feel slightly tight (about 10-15 minutes), then rinse off with lukewarm water using gentle circular motions.\nFor dry or sensitive skin, mix with milk, honey, or aloe vera gel instead of water to prevent over-drying.\n\nFor Hair:\n1. Combine Multani Mitti powder with water or diluted curd to form a thin, spreadable paste.\n2. Apply directly to the scalp and roots, focusing on oily areas, and gently massage in.\n3. Leave on for 15-20 minutes, then rinse thoroughly with water (avoid harsh shampoo immediately after, as the clay itself cleanses).\nUse once or twice a week for a naturally oil-free scalp and fresher-looking hair.",
    benefits:
      "Triple-filtered microfine powder for maximum effectiveness.\nNatural cleanser and purifier for both skin and hair.\nAbsorbs excess oil and helps combat acne.\nGently exfoliates to reveal radiant, glowing skin.\nRemoves dead skin cells, blackheads, and whiteheads.\nNaturally cooling \u2014 soothes overheated or sun-exposed skin, ideal for India's climate.\nImproves scalp circulation and removes impurities from hair.\nActs as a natural hair conditioner for smoother, healthier locks.\n100% natural, ayurvedic formula free from harsh chemicals.",
    image: "/images/products/multani-front.webp",
    images: [
      "/images/products/multani-front.webp",
      "/images/products/multani-hero.webp",
      "/images/products/multani-benefits.webp",
      "/images/products/multani-how-to-use.webp",
      "/images/products/multani-back.webp",
      "/images/products/multani-styled.webp",
    ],
    tags: ["face-pack", "oil-control", "deep-cleansing", "clay-mask"],
    isFeatured: true,
  },
  {
    name: "Orange Peel Powder",
    slug: "orange-peel-powder",
    sku: "JAIS-ORNG-001",
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Awaken your skin\u2019s natural glow with our pure, triple-filtered Orange Peel Powder. Brightens, exfoliates, and rejuvenates both skin and hair.",
    description:
      "Revitalize your skin and hair with Jaison Herbals Ayurvedic Orange Peel Powder. Carefully crafted from sun-dried orange peels and finely milled, this natural powerhouse is rich in Vitamin C and antioxidants, delivering brightening and rejuvenating effects to both skin and hair. Its gentle exfoliating action clears dead skin cells, unclogs pores, and reveals a radiant complexion, while its nourishing properties help improve hair texture and boost shine. Free from chemicals, this 100% natural formula restores your skin\u2019s youthful glow and leaves your hair soft, vibrant, and full of life.\n\nJaison Herbals Ayurvedic Orange Peel Powder is a natural exfoliant and brightening agent. It helps reduce pigmentation, dark spots, and blemishes while imparting a youthful glow. For hair, the powder helps improve scalp health, stimulates circulation, and leaves hair feeling soft and refreshed. Packed with antioxidants, it naturally tightens skin, reduces acne, and gives your hair a vibrant shine.",
    ingredients: "100% Pure Orange Peel (Citrus sinensis) powder",
    howToUse:
      "For Skin:\nMix 2-3 tablespoons of orange peel powder with a few drops of water or rose water to form a smooth paste.\nApply evenly on your skin and leave it on for about 15 minutes.\nRinse off gently with water.\nFor enhanced results, mix with honey, yogurt, or aloe vera gel for extra hydration.\n\nFor Hair:\nCombine the orange peel powder with water to create a thin paste.\nMassage into your scalp and hair, ensuring even coverage.\nLeave it on for 15-20 minutes before rinsing thoroughly.",
    benefits:
      "Triple-Filtered Microfine Powder ensures maximum absorption and effectiveness.\nGently Exfoliates and Renews: Removes dead skin cells and clears clogged pores.\nCalms and Soothes: Anti-inflammatory properties help alleviate skin irritation.\nRich in Antioxidants: Packed with Vitamin C, combats free radicals and boosts natural radiance.\nFights Acne-Causing Bacteria: Naturally antibacterial for clearer skin.\nEvens Out Skin Tone: Reduces the appearance of uneven pigmentation.\nActs as a Natural Toner: Cleanses and minimizes the appearance of pores.",
    image: "/images/products/orange-front.webp",
    images: [
      "/images/products/orange-front.webp",
      "/images/products/orange-hero.webp",
      "/images/products/orange-benefits.webp",
      "/images/products/orange-ingredients.webp",
      "/images/products/orange-back.webp",
      "/images/products/orange-styled.webp",
    ],
    tags: ["vitamin-c", "skin-brightening", "anti-tan", "exfoliating"],
    isFeatured: true,
  },
  {
    name: "Mehendi Powder",
    slug: "mehendi-powder",
    sku: "JAIS-MHND-001",
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "Condition and revitalize with our pure, finely-ground Mehendi Powder. This Ayurvedic essential strengthens hair, adds natural shine, and imparts a subtle reddish tint with a 100% natural, chemical-free formula.",
    description:
      "Condition and revitalize your hair naturally with Jaison's Ayurvedic Mehendi (Henna) Powder. Made from sun-dried henna leaves, finely ground into a smooth powder, this time-honoured Ayurvedic herb naturally conditions and strengthens hair while imparting a subtle, warm reddish tint. It coats each strand to add body, shine, and softness, while its cooling properties soothe the scalp and help reduce excess oiliness. Free from chemicals and synthetic dyes, this 100% natural formula has been trusted for centuries as Ayurveda's original hair conditioner and colourant.",
    ingredients:
      "100% Pure Henna Leaf (Lawsonia inermis) powder — no PPD, no metallic salts, no chemicals",
    howToUse:
      "For Hair:\n1. Mix Mehendi powder with water (or brewed tea/coffee for a deeper tint) to form a smooth, lump-free paste, and let it rest for 2-4 hours.\n2. Apply evenly to scalp and hair, ensuring full coverage from root to tip.\n3. Leave on for 1-2 hours (longer for a deeper tint), then rinse thoroughly with water until it runs clear.\nAvoid shampooing for 24-48 hours after application to let the colour and conditioning fully set.",
    benefits:
      "Naturally conditions and strengthens hair — coats each strand to add body, softness, and resilience.\nImparts a natural reddish tint, a gentle, chemical-free way to add warmth and depth to hair colour.\nRestores shine and smoothness, leaving hair looking naturally glossy and healthy.\nControls excess oiliness — its cooling, absorbent nature helps balance an oily scalp.\nReduces frizz by smoothing the hair cuticle for more manageable strands.\nFree from synthetic dyes — a safe, traditional alternative to chemical hair colourants.",
    image: "/images/products/mhendi-front.webp",
    images: [
      "/images/products/mhendi-front.webp",
      "/images/products/mhendi-back.webp",
    ],
    tags: ["hair-colour", "natural-dye", "deep-conditioning", "henna"],
    isFeatured: false,
  },
  {
    name: "Reetha Powder",
    slug: "reetha-powder",
    sku: "JAIS-RETH-001",
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Hair Care",
    categorySlug: "hair-care",
    shortDescription:
      "A natural cleanser for soft, fresh, and healthy hair. Reduces dandruff, soothes the scalp, and promotes silky, shiny hair.",
    description:
      "Reetha powder is a natural cleanser rich in saponins that leaves your hair feeling soft, fresh, and healthy \u2014 nature's own gentle, sulphate-free alternative to chemical shampoo. Known for its ability to reduce dandruff and soothe the scalp, it also promotes silky, shiny hair. Pair it with Shikakai or Amla for a nourishing boost\u2014or even use it to gently clean your favourite gold and silver jewellery!\n\nReetha Powder is a natural treasure for hair care, brimming with nutrients and antioxidants that nourish the scalp and protect hair from damage. Suitable for all hair types, it works wonders for addressing split ends, hair fall, dandruff, and greying. Beyond controlling excess oil, Reetha actively promotes hair growth, leaving your hair feeling soft, shiny, and full of vitality. Enriched with vitamins A, D, E, and K, it helps smooth and manage hair, enhancing its natural shine.",
    ingredients: "100% Pure Reetha (Sapindus mukorossi) powder",
    howToUse:
      "Take the desired amount of Reetha Powder in a bowl.\nAdd lukewarm water and mix until it forms a smooth, thick paste.\nApply the paste evenly to your hair and scalp.\nLet it sit for 45 minutes to an hour.\nRinse thoroughly with water for soft, shiny hair.\nCombine with shikakai and amla powder for a complete, traditional herbal hair wash.",
    benefits:
      "Gentle and Natural Cleanser: Effectively removes impurities while restoring scalp health.\nFights Dandruff and Hairfall: Antifungal and antimicrobial properties to reduce split ends, dandruff and hairfall.\nVitamin-Powered Care: Enriched with vitamins A, D, E, and K to nourish the scalp and strengthen hair.\nBalances Scalp Oil: Regulates excess oil production for a fresh, non-greasy feel.\nStrengthens & Thickens: Nourishes hair follicles for stronger, fuller, and bouncier hair.",
    image: "/images/products/reetha-front.webp",
    images: [
      "/images/products/reetha-front.webp",
      "/images/products/reetha-hero.webp",
      "/images/products/reetha-product.webp",
      "/images/products/reetha-lifestyle.webp",
      "/images/products/reetha-benefits.webp",
      "/images/products/reetha-back.webp",
      "/images/products/reetha-styled.webp",
      "/images/products/reetha-styled2.webp",
    ],
    tags: ["natural-cleanser", "soapnut", "eco-friendly", "gentle-shampoo"],
    isFeatured: false,
  },
  {
    name: "Nagarmotha Powder",
    slug: "nagarmotha-powder",
    sku: "JAIS-NAGM-001",
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Nagarmotha powder is an Ayurvedic remedy known for reducing dandruff, strengthening roots and promoting a healthier scalp. Packed with astringent properties, it also brightens skin and fixes unwanted dark spots.",
    description:
      "Purify and refresh your skin and scalp with Jaison's Ayurvedic Nagarmotha Powder. Made from sun-dried Nagarmotha roots, finely ground into a potent powder, this Ayurvedic herb is prized for its natural cooling and cleansing properties. It works deep to clear dandruff and flaky buildup from the scalp, soothes irritation, and restores a fresh, balanced scalp environment for healthier hair growth. On skin, its astringent properties help brighten the complexion and fade unwanted dark spots. Free from chemicals, this 100% natural formula draws on Nagarmotha's traditional Ayurvedic reputation as a purifying, cooling herb.",
    ingredients: "100% Pure Nagarmotha (Cyperus rotundus) rhizome powder",
    howToUse:
      "For Face & Skin:\nFor glowing skin: mix Nagarmotha powder with rose water to form a smooth paste, apply to the face, let it dry and rinse off.\nFor dark spots: blend with coconut oil, apply to the spots, leave for 20-30 minutes, then wash gently.\n\nFor Hair:\n1. Mix 2-3 tablespoons of Nagarmotha powder with water to form a smooth paste.\n2. Apply directly to the scalp, focusing on areas with dandruff or buildup, and massage gently.\n3. Leave on for 20-30 minutes, then rinse thoroughly with water.\nCombine with reetha or shikakai powder for a complete scalp-clarifying wash, or with amla powder for stronger, nourished hair.",
    benefits:
      "Ayurvedic Detox: Purifies scalp buildup and deeply cleanses skin for a balanced look.\npH Balancer: Regulates scalp oil, creating the ideal environment for healthy hair growth.\nStrengthens Hair: Fortifies roots, prevents breakage and promotes stronger hair.\nNatural Skin Enhancer: Tightens pores, evens skin tone and boosts radiance naturally.",
    image: "/images/products/nagmotha-front.webp",
    images: [
      "/images/products/nagmotha-front.webp",
      "/images/products/nagmotha-hero.webp",
      "/images/products/nagmotha-benefits.webp",
      "/images/products/nagmotha-ingredients.webp",
      "/images/products/nagmotha-back.webp",
      "/images/products/nagmotha-styled.webp",
      "/images/products/nagmotha-styled2.webp",
    ],
    tags: ["skin-lightening", "anti-ageing", "aromatic", "rare-herb"],
    isFeatured: false,
  },

  // ── Combos ──────────────────────────────────────────────────────────
  {
    name: "Hair Care Trio",
    slug: "hair-care-trio",
    sku: "JAIS-COMBO-HAIRTRIO",
    price: 489,
    compareAtPrice: 750,
    weight: 300,
    category: "Combos",
    categorySlug: "combos",
    shortDescription:
      "The essential trio for stronger, shinier hair. Aamla, Reetha & Shikakai — together at 35% off.",
    description:
      "Give your hair the complete herbal treatment it deserves. This curated trio brings together three time-tested Ayurvedic powders — Aamla for strength and shine, Reetha for gentle cleansing, and Shikakai for natural conditioning. Used together, they form a powerful hair care ritual that reduces hair fall, fights dandruff, and adds natural bounce without any chemicals. Save 35% compared to buying individually.",
    ingredients:
      "Includes: Aamla Powder (100g) — 100% Pure Amla (Emblica officinalis)\nReetha Powder (100g) — 100% Pure Reetha (Sapindus mukorossi)\nShikakai Powder (100g) — 100% Pure Shikakai (Acacia concinna)",
    howToUse:
      "For a Natural Hair Wash:\nMix equal parts of all three powders (1 tbsp each) with warm water to form a paste.\nApply evenly to wet hair and scalp.\nGently massage for 2-3 minutes.\nLeave on for 10-15 minutes.\nRinse thoroughly with water. No shampoo needed!\n\nFor a Hair Mask:\nMix 2 tbsp of the combined powders with curd or coconut milk.\nApply to hair from root to tip.\nLeave for 30-45 minutes.\nWash off with plain water for silky, nourished hair.",
    benefits:
      "Complete herbal hair wash — replaces chemical shampoos.\nAamla strengthens roots and prevents premature greying.\nReetha naturally cleanses without stripping oils.\nShikakai conditions and detangles for smooth, manageable hair.\nFights dandruff and soothes itchy scalp.\nPromotes healthy hair growth with regular use.\nSave 35% compared to individual purchases.",
    image: "/images/products/combo-hair-trio.webp",
    images: [
      "/images/products/combo-hair-trio.webp",
    ],
    tags: ["combo", "hair-care", "natural-shampoo", "anti-dandruff", "value-pack"],
    isFeatured: false,
  },
  {
    name: "Premium Herbal Hair Care Combo",
    slug: "premium-hair-care-combo",
    sku: "JAIS-COMBO-PREMHAIR",
    price: 815,
    compareAtPrice: 1250,
    weight: 500,
    category: "Combos",
    categorySlug: "combos",
    shortDescription:
      "The ultimate 5-powder hair care ritual. Aamla, Reetha, Shikakai, Nagarmotha & Mehendi — 35% off.",
    description:
      "Our most comprehensive hair care bundle — five premium herbal powders for every hair need. Aamla and Reetha cleanse and strengthen, Shikakai conditions naturally, Nagarmotha fights dandruff at the root, and Mehendi adds rich colour and deep conditioning. Together, they form a complete Ayurvedic hair care system that replaces multiple chemical products. Save 35% on this premium bundle.",
    ingredients:
      "Includes: Aamla Powder (100g) — 100% Pure Amla (Emblica officinalis)\nReetha Powder (100g) — 100% Pure Reetha (Sapindus mukorossi)\nShikakai Powder (100g) — 100% Pure Shikakai (Acacia concinna)\nNagarmotha Powder (100g) — 100% Pure Nagarmotha (Cyperus rotundus)\nMehendi Powder (100g) — 100% Pure Mehendi (Lawsonia inermis)",
    howToUse:
      "For Natural Hair Wash: Mix Aamla + Reetha + Shikakai in equal parts with warm water. Apply to scalp, massage gently, leave for 10-15 minutes, and rinse.\n\nFor Dandruff Treatment: Mix Nagarmotha powder with coconut oil, apply to scalp, leave overnight, and wash 2-3 times a week.\n\nFor Hair Colour & Conditioning: Mix Mehendi with warm water and a few drops of lemon juice. Apply to hair, leave for 1-2 hours, and rinse for rich colour and deep conditioning.\n\nFor Complete Care: Alternate between the hair wash (2-3x/week) and Mehendi treatment (1-2x/month) for best results.",
    benefits:
      "Complete 5-in-1 Ayurvedic hair care system.\nReplaces shampoo, conditioner, anti-dandruff treatment, hair colour, and scalp therapy.\nAamla strengthens and prevents greying.\nReetha gently cleanses without chemicals.\nShikakai conditions and adds natural shine.\nNagarmotha purifies scalp and fights dandruff.\nMehendi colours naturally and deeply conditions.\nSave 35% compared to individual purchases.",
    image: "/images/products/combo-premium-hair-2.webp",
    images: [
      "/images/products/combo-premium-hair-2.webp",
    ],
    tags: ["combo", "hair-care", "premium", "complete-care", "value-pack", "bestseller"],
    isFeatured: true,
  },
  {
    name: "Scalp Care Combo",
    slug: "scalp-care-combo",
    sku: "JAIS-COMBO-SCALP",
    price: 489,
    compareAtPrice: 750,
    weight: 300,
    category: "Combos",
    categorySlug: "combos",
    shortDescription:
      "Target dandruff, itchiness & hair fall at the root. Aamla, Nagarmotha & Neem — 35% off.",
    description:
      "A focused trio for anyone battling scalp issues. Neem's powerful antibacterial properties tackle dandruff and infections, Nagarmotha's astringent action purifies and detoxifies the scalp, and Aamla nourishes follicles for stronger regrowth. This combo addresses the root cause of hair fall — an unhealthy scalp. Save 35% compared to buying individually.",
    ingredients:
      "Includes: Aamla Powder (100g) — 100% Pure Amla (Emblica officinalis)\nNagarmotha Powder (100g) — 100% Pure Nagarmotha (Cyperus rotundus)\nNeem Powder (100g) — 100% Pure Neem (Azadirachta indica)",
    howToUse:
      "For Scalp Detox Mask:\nMix 1 tbsp each of Neem and Nagarmotha powder with curd to form a paste.\nApply directly to the scalp, parting hair in sections.\nLeave for 20-30 minutes.\nRinse with an Aamla wash (1 tbsp Aamla + water).\n\nFor Anti-Dandruff Oil Treatment:\nMix Nagarmotha and Neem powder with warm coconut oil.\nApply to scalp, leave overnight.\nWash 2-3 times a week for best results.\n\nFor Hair Strengthening Rinse:\nMix Aamla powder with warm water, apply after washing hair as a final rinse for added strength and shine.",
    benefits:
      "Targets the root cause of dandruff — scalp bacteria and fungus.\nNeem's antibacterial properties soothe itchy, irritated scalp.\nNagarmotha purifies scalp buildup and regulates oil.\nAamla strengthens follicles and promotes regrowth.\nReduces hair fall caused by scalp issues.\nNatural alternative to medicated anti-dandruff shampoos.\nSave 35% compared to individual purchases.",
    image: "/images/products/combo-scalp-care.webp",
    images: [
      "/images/products/combo-scalp-care.webp",
    ],
    tags: ["combo", "scalp-care", "anti-dandruff", "hair-fall", "value-pack"],
    isFeatured: false,
  },
  {
    name: "Complete Head-to-Toe Ritual Kit",
    slug: "jaison-special-combo",
    sku: "JAIS-COMBO-SPECIAL",
    price: 859,
    compareAtPrice: 1565,
    weight: 450,
    category: "Combos",
    categorySlug: "combos",
    shortDescription:
      "5 bestselling powders — hair care + skin care in one kit. Shikakai, Aamla, Neem, Multani Mitti & Ubtan. Save ₹706.",
    description:
      "Everything you need to replace five chemical products with one Ayurvedic kit. Shikakai and Aamla cleanse and strengthen hair naturally, Neem purifies both scalp and skin, Multani Mitti deep-cleanses and tightens pores, and our signature Ubtan — crafted from Kachora, Nagarmotha, Bakuchi, Orange Peel, Multani Mitti and more herbs — gives visible glow from the very first use. One kit, head to toe, 45% off individual prices.",
    ingredients:
      "Includes: Shikakai Powder (100g) — 100% Pure Shikakai (Acacia concinna)\nAamla Powder (100g) — 100% Pure Amla (Emblica officinalis)\nNeem Powder (100g) — 100% Pure Neem (Azadirachta indica)\nMultani Mitti (100g) — 100% Pure Fuller's Earth\nUbtan (50g jar) — Kachora, Nagarmotha, Bakuchi, Orange Peel, Multani Mitti & more",
    howToUse:
      "For Hair (2-3x/week): Mix Shikakai + Aamla with warm water, apply to hair and scalp, leave 10-15 minutes, rinse.\n\nFor Scalp Treatment: Mix Neem powder with coconut oil, apply to scalp, leave overnight, wash off.\n\nFor Skin Cleansing: Mix Multani Mitti with rose water, apply to face, let dry 10-15 minutes, rinse for clean, tight pores.\n\nFor Glowing Skin: Mix Ubtan with rose water or milk, apply to face and neck, scrub gently, rinse after 10-15 minutes for radiant skin.\n\nFor best results, use the hair care routine 2-3 times a week and the skin care routine 3-4 times a week.",
    benefits:
      "Complete head-to-toe herbal care in one bundle.\nShikakai conditions hair naturally without chemicals.\nAamla strengthens roots and prevents premature greying.\nNeem fights dandruff, acne, and skin infections.\nMultani Mitti deep-cleanses pores and controls oil.\nUbtan brightens skin, reduces tan, and gives instant glow.\nOur biggest discount — save 45% on 5 premium products.\nPerfect gift for someone starting their Ayurvedic journey.",
    image: "/images/products/combo-jaison-special.webp",
    images: [
      "/images/products/combo-jaison-special.webp",
    ],
    tags: ["combo", "special", "hair-care", "skin-care", "complete-care", "value-pack", "bestseller"],
    isFeatured: true,
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
