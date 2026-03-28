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
    name: "Ubtan Powder",
    slug: "ubtan-powder",
    sku: "JAIS-UBTAN-001",
    price: 440,
    compareAtPrice: 565,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "An ancient ritual, a modern skin essential. A generational legacy of timeless beauty.",
    description:
      "Ubtan Powder by Jaison Herbals is your 100% natural skincare remedy, cherished and trusted across generations, for healthy, luminous skin. Bakuchi promotes collagen and evens skin tone, while Haritaki\u2019s natural AHAs provide gentle exfoliation for a brighter, smoother complexion. Exfoliating that regularly increases cellular turnover, flattens fine lines and wrinkles, and reduces hyperpigmentation. This is the perfect Ayurvedic formula for your timeless radiant skin.",
    ingredients:
      "Turmeric (Curcuma longa), Sandalwood Powder (Santalum album), Gram Flour (Cicer arietinum), Almond Powder (Prunus dulcis), Rose Petal Powder (Rosa centifolia), Saffron Extract (Crocus sativus), Milk Powder, Camphor (trace)",
    howToUse:
      "Step 1: For best results, mix our ubtan powder with rose water, milk or warm water.\nStep 2: Mix it well and apply on your skin and/or body.\nStep 3: Scrub well to clean out your pores.\nStep 4: Rinse well with warm water to discover the secret to petal-like soft and bright skin.",
    benefits:
      "This clarifying scrub eliminates dirt and impurities that block pores and cause outbreaks.\nIt gently exfoliates and revitalizes the skin, giving you a glowing look.\nBrightens your skin by reducing pigmentation, dark spots, and blemishes.\nThe power of Ayurveda reduces fine lines and visibly diminishes signs of aging.\nIts anti-inflammatory properties soothe and protect the skin, providing antioxidants for rejuvenation.",
    image: "/images/products/ubtan.jpg",
    images: [
      "/images/products/ubtan.jpg",
      "/images/products/ubtan-styled.jpg",
      "/images/products/ubtan-styled2.jpg",
      "/images/products/ubtan-styled3.jpg",
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
      "Your one-stop natural dandruff solution. Rich in essential fatty acids, proteins, and flavonoids for natural shine and bounce.",
    description:
      "Packed with pure Aamla goodness, Jaison\u2019s Aamla Powder can be your one-stop natural dandruff solution. This essential fatty acid, protein, and flavonoid rich powder gives your hair a natural shine and bounce. Made from fresh crops and zero chemicals, this age old remedy is key to giving you long, thick, and beautiful hair.\n\nKeep dandruff and hairfall at bay with this Vitamin C rich excellent hair tonic minimising hair loss and greying of hair and stimulates natural strong and healthy volume of hair. This powder wonder does not only fight hair problems, it promotes gorgeous and healthy hair. Whether you are battling annoying damaged hair or just want to double up on the TLC of your hair, this Aamla powder is your best bet!",
    ingredients: "100% Pure Amla (Phyllanthus emblica) powder",
    howToUse:
      "For Hair:\nMix 2 tablespoons of Aamla powder with 5 tablespoons of water and mix properly.\nApply this paste to your hair and leave it for 20-30 minutes.\nRinse your hair with water. For best results use it 3-4 times a week.\n\nFor Skin:\nMix Aamla powder with some rose water (for toning) OR curd & honey (for hydration) and prepare a smooth paste.\nApply it to your face. Keep it for 10-15 minutes.\nWash it off with water. For best results use it 3-4 times a week.",
    benefits:
      "Promotes healthy hair growth.\nImproves the tone of henna hair dyes.\nTreats head lice.\nHelps in preventing premature greying of the hair.\nRich in Vitamin C and antioxidants for hair strength.\nHelps combat dandruff and soothes dry, itchy scalp.\nAdds natural shine and improves hair texture.",
    image: "/images/products/amla-front.jpg",
    images: [
      "/images/products/amla-front.jpg",
      "/images/products/amla-back.jpg",
      "/images/products/amla-styled.jpg",
    ],
    tags: ["hair-growth", "anti-greying", "vitamin-c", "natural-conditioner"],
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
      "A gentle, natural way to achieve radiant, clear and healthy skin. Packed with antibacterial goodness for a youthful glow.",
    description:
      "Neem Powder is a gentle, natural way to achieve radiant, clear and healthy skin. Packed with antibacterial goodness, it soothes acne, blackheads, and eczema while keeping your skin hydrated and balanced. Doubles as a refreshing toner, it pampers your skin with a burst of softness and smoothness, unveiling a youthful charm and radiant glow with every use.\n\nOur Neem Powder is a potent natural remedy packed with antibacterial properties, making it an excellent choice for addressing common skin concerns such as acne, blackheads, eczema, and psoriasis. Its nourishing qualities deeply hydrate the skin, helping to combat dryness while restoring the natural pH balance. This versatile powder serves as an incredible toner and revitalises your skin and enhances its youthful appearance. Perfect for all skin types, our Neem Powder is your go-to for vibrant, refreshed skin!",
    ingredients: "100% Pure Neem Leaf (Azadirachta indica) powder",
    howToUse:
      "In a clean bowl, take 2-3 spoons of Neem Powder and mix it with rose water to create a smooth, semi-thick paste.\nEvenly apply the paste to your face, covering all areas.\nLet it sit for 10-15 minutes.\nRinse off with water and enjoy the refreshed, clean feeling.\nFor added nourishment, you can also mix Neem Powder with aloe vera gel, yogurt, or honey.\n\nFor the best results, use this treatment twice a week.",
    benefits:
      "Purifying and Healing: Rich in antibacterial properties to combat acne, blackheads and skin irritation.\nDeep Nourishment: Hydrates and restores the skin\u2019s natural moisture and pH levels for a healthy glow.\nProtective and Soothing: Shields against environmental damage while calming inflamed and sensitive skin.\nVersatile skincare essential: Can be used as a toner, face mask, or skincare booster for all skin types.\nYouthful Radiance: Helps reduce signs of premature aging, promoting a smooth and even complexion.",
    image: "/images/products/neem-front.jpg",
    images: [
      "/images/products/neem-front.jpg",
      "/images/products/neem-back.jpg",
      "/images/products/neem-styled.jpg",
    ],
    tags: ["anti-acne", "antibacterial", "skin-purifying", "face-pack"],
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
      "Find the secret to bouncy locks with Jaison\u2019s Shikakai Powder. Packed with natural vitamins and antioxidants, our pure Shikakai formula nourishes your hair from its roots to the very tip. With regular use of the powder, you can part ways with split ends, premature greying, and dandruff, and get used to healthy, lustrous hair the herbal way!\n\nShikakai, known as the \u201Cfruit for hair,\u201D has been a staple in Ayurvedic hair care for centuries. Our Shikakai Powder is rich in vitamins C, D, and antioxidants that nourish and protect your hair. Infused with micro-nutrients that strengthen hair from within. Suitable for all hair types for men, women, and children equally. Anti-bacterial and anti-fungal properties combat scalp issues like dandruff and lice. Reach dark, thick and shiny hair with regular use.",
    ingredients: "100% Pure Shikakai (Acacia concinna) pod powder",
    howToUse:
      "In a bowl, mix 2-3 tablespoons of Shikakai Powder with warm water to create a smooth paste.\nApply the paste evenly to your hair, working it in from the roots to the tips.\nGently massage your scalp to stimulate blood flow, and wet your hair for 10 minutes to allow the nutrients to seep in.\nRinse thoroughly with normal water and follow with a mild shampoo if desired.\nFor best results, use once or twice a week as part of your regular hair care routine.",
    benefits:
      "Purifies and Protects Scalp: Its antibacterial properties keep dandruff, lice, and infections at bay.\nStimulates Hair Growth: Strengthens roots and revitalizes the scalp for thicker, fuller hair.\nPacked with Hair-Loving Antioxidants: Prevents damage, split ends, and premature greying for healthier hair.\nNaturally Smooth & Tangle-Free: Softens hair, reducing frizz and making detangling effortless.\nPure & Chemical-Free Care: A safe, natural alternative to harsh hair products.",
    image: "/images/products/shikakai-front.jpg",
    images: [
      "/images/products/shikakai-front.jpg",
      "/images/products/shikakai-back.jpg",
      "/images/products/shikakai-styled.jpg",
      "/images/products/shikakai-styled2.jpg",
    ],
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
    price: 199,
    compareAtPrice: 250,
    weight: 100,
    category: "Skin Care",
    categorySlug: "skin-care",
    shortDescription:
      "Purify your skin with our triple filtered multani mitti for skin and hair nourishment. 100% natural, ayurvedic formula free from harsh chemicals.",
    description:
      "Seek out the natural radiance from your skin with Jaison Herbals. Our triple-filtered microfine multani mitti cleanses and purifies your skin and gives the nourishment to your hair that they deserve. Packed with natural goodness, welcome clearer skin and healthier hair \u2013 the ayurvedic way!\n\nThis Multani Mitti acts as a wonder clay cleaning out excess oil and keeping acne at bay! With regular use of the product you can guard your skin from unwanted acne and adapt to a natural way of glowing up. When used as a scrub, multani mitti can sweep away dead skin cells and reveal a radiant glow hiding underneath. For hair, this multani mitti also doubles up as a hair nourishment and washes away impurities, allows better circulation, conditions your hair, and keeps your scalp toxin free.",
    ingredients:
      "100% Pure Fuller's Earth (Multani Mitti / Calcium Bentonite clay)",
    howToUse:
      "For Skin:\nAdd 2-3 tablespoons of our multani mitti powder with a few drops of rose water and form a thick paste that can be applied evenly on the skin.\nApply the paste on your skin and let the paste dry naturally for about 15 minutes.\nRinse off the paste gently with just water.\nFor improved results, you can mix it with aloe vera gel, yoghourt, or honey.\n\nFor Hair:\nCreate a runny paste with the multani mitti, tap water and a few drops of rose water.\nMassage the paste gently into your scalp and hair.\nWait for 15 to 20 minutes.\nRinse out the paste from the scalp and hair thoroughly and see the results!",
    benefits:
      "Triple-filtered microfine powder for maximum effectiveness.\nNatural cleanser and purifier for both skin and hair.\nAbsorbs excess oil and helps combat acne.\nGently exfoliates to reveal radiant, glowing skin.\nRemoves dead skin cells, blackheads, and whiteheads.\nImproves scalp circulation and removes impurities from hair.\nActs as a natural hair conditioner for smoother, healthier locks.\n100% natural, ayurvedic formula free from harsh chemicals.",
    image: "/images/products/multani-front.jpg",
    images: [
      "/images/products/multani-front.jpg",
      "/images/products/multani-back.jpg",
      "/images/products/multani-styled.jpg",
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
    image: "/images/products/orange-front.jpg",
    images: [
      "/images/products/orange-front.jpg",
      "/images/products/orange-back.jpg",
      "/images/products/orange-styled.jpg",
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
      "A natural beauty ingredient from Henna leaves for deep conditioning, dandruff prevention, and scalp health.",
    description:
      "Mehendi powder is a natural beauty ingredient made from Henna leaves that deeply conditions hair, prevents dandruff and supports scalp health. It also has soothing effects to help brighten the skin and reduce irritation.",
    ingredients:
      "100% Pure Henna Leaf (Lawsonia inermis) powder — no PPD, no metallic salts, no chemicals",
    howToUse:
      "For Natural Hair Color: Mix Mehendi powder with water or tea, apply to hair, leave for 2-3 hours, then rinse for rich color and shine.\nFor a Healthy Scalp: Blend with coconut oil or curd, massage onto the scalp, leave for 1 hour, and wash for a nourished, dandruff-free scalp.\nFor Beautiful Hand Designs: Prepare a smooth paste, let it sit for a few hours, then apply designs for deep, long-lasting color.",
    benefits:
      "Multipurpose Beauty Essential: Easily transforms into a smooth paste for hand designs and natural beauty treatment.\nCool and Calming Effect: Soothes the scalp and skin, providing a refreshing and relaxing sensation.\nColor-Enhancing Formula: Boosts natural hair color while adding depth and long-lasting shine.\nNatural Hair Protector: Forms a protective layer to shield from environmental damage.",
    image: "/images/products/mhendi-front.jpg",
    images: [
      "/images/products/mhendi-front.jpg",
      "/images/products/mhendi-back.jpg",
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
      "Reetha powder is a natural cleanser that leaves your hair feeling soft, fresh, and healthy. Known for its ability to reduce dandruff and soothe the scalp, it also promotes silky, shiny hair. Paired with ingredients like Shikakai or Amla for a nourishing boost\u2014or even use it to gently clean your favourite gold and silver jewellery!\n\nReetha Powder is a natural treasure for hair care, brimming with nutrients and antioxidants that nourish the scalp and protect hair from damage. Suitable for all hair types, it works wonders for addressing split ends, hair fall, dandruff, and greying. Beyond controlling excess oil, Reetha actively promotes hair growth, leaving your hair feeling soft, shiny, and full of vitality. Enriched with vitamins A, D, E, and K, it helps smooth and manage hair, enhancing its natural shine.",
    ingredients: "100% Pure Reetha (Sapindus mukorossi) powder",
    howToUse:
      "Take the desired amount of Reetha Powder in a bowl.\nAdd lukewarm water and mix until it forms a smooth, thick paste.\nApply the paste evenly to your hair and scalp.\nLet it sit for 45 minutes to an hour.\nRinse thoroughly with water for soft, shiny hair.",
    benefits:
      "Gentle and Natural Cleanser: Effectively removes impurities while restoring scalp health.\nFights Dandruff and Hairfall: Antifungal and antimicrobial properties to reduce split ends, dandruff and hairfall.\nVitamin-Powered Care: Enriched with vitamins A, D, E, and K to nourish the scalp and strengthen hair.\nBalances Scalp Oil: Regulates excess oil production for a fresh, non-greasy feel.\nStrengthens & Thickens: Nourishes hair follicles for stronger, fuller, and bouncier hair.",
    image: "/images/products/reetha-front.jpg",
    images: [
      "/images/products/reetha-front.jpg",
      "/images/products/reetha-back.jpg",
      "/images/products/reetha-styled.jpg",
      "/images/products/reetha-styled2.jpg",
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
      "With Jaison\u2019s multipurpose Nagarmotha wonder powder that fights dandruff causing bacteria and provides a clean and healthy scalp. Packed with potent astringent properties, our pure Nagarmotha formula also fixes unwanted dark spots and balances the natural tone of your skin.",
    ingredients: "100% Pure Nagarmotha (Cyperus rotundus) rhizome powder",
    howToUse:
      "For Glowing Skin: Mix Nagarmotha powder with rose water, apply to the face, let dry, and rinse for a radiant glow.\nFor Dark Spot Reduction: Blend with coconut oil, apply to spots, leave for 20-30 minutes, then wash gently.\nFor Dandruff & Hair Fall: Mix with hair oil, apply to the scalp, leave overnight, and wash 2-3 times a week.\nFor Strong, Healthy Hair: Combine with amla powder, apply for 1-2 hours, then rinse for nourished hair.",
    benefits:
      "Ayurvedic Detox: Purifies scalp buildup and deeply cleanses skin for a balanced look.\npH Balancer: Regulates scalp oil, creating the ideal environment for healthy hair growth.\nStrengthens Hair: Fortifies roots, prevents breakage and promotes stronger hair.\nNatural Skin Enhancer: Tightens pores, evens skin tone and boosts radiance naturally.",
    image: "/images/products/nagmotha-front.jpg",
    images: [
      "/images/products/nagmotha-front.jpg",
      "/images/products/nagmotha-back.jpg",
      "/images/products/nagmotha-styled.jpg",
      "/images/products/nagmotha-styled2.jpg",
    ],
    tags: ["skin-lightening", "anti-ageing", "aromatic", "rare-herb"],
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
