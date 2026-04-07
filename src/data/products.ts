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
    image: "/images/categories/skin-care.png",
  },
  {
    name: "Hair Care",
    slug: "hair-care",
    description:
      "Traditional hair care powders and treatments to nourish, strengthen, and revitalize your hair naturally.",
    image: "/images/categories/hair-care.png",
  },
  {
    name: "Face Care",
    slug: "face-care",
    description:
      "Holistic face care solutions made from earth's finest herbs for complete wellness.",
    image: "/images/categories/face-care.png",
  },
  {
    name: "Combos",
    slug: "combos",
    description:
      "Curated herbal powder combos at unbeatable prices. Save more with our specially bundled Ayurvedic care sets.",
    image: "/images/products/combo-jaison-special.png",
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
      "/images/products/ubtan-essence.png",
      "/images/products/ubtan-herbs.png",
      "/images/products/ubtan-benefits.png",
      "/images/products/ubtan-how-to-use.png",
      "/images/products/ubtan-radiant.png",
      "/images/products/ubtan-styled2.jpg",
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
      "/images/products/amla-vitamin-c.png",
      "/images/products/amla-benefits.png",
      "/images/products/amla-how-to-use.png",
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
      "Includes: Aamla Powder (100g) — 100% Pure Amla (Phyllanthus emblica)\nReetha Powder (100g) — 100% Pure Reetha (Sapindus mukorossi)\nShikakai Powder (100g) — 100% Pure Shikakai (Acacia concinna)",
    howToUse:
      "For a Natural Hair Wash:\nMix equal parts of all three powders (1 tbsp each) with warm water to form a paste.\nApply evenly to wet hair and scalp.\nGently massage for 2-3 minutes.\nLeave on for 10-15 minutes.\nRinse thoroughly with water. No shampoo needed!\n\nFor a Hair Mask:\nMix 2 tbsp of the combined powders with curd or coconut milk.\nApply to hair from root to tip.\nLeave for 30-45 minutes.\nWash off with plain water for silky, nourished hair.",
    benefits:
      "Complete herbal hair wash — replaces chemical shampoos.\nAamla strengthens roots and prevents premature greying.\nReetha naturally cleanses without stripping oils.\nShikakai conditions and detangles for smooth, manageable hair.\nFights dandruff and soothes itchy scalp.\nPromotes healthy hair growth with regular use.\nSave 35% compared to individual purchases.",
    image: "/images/products/combo-hair-trio.png",
    images: [
      "/images/products/combo-hair-trio.png",
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
      "Includes: Aamla Powder (100g) — 100% Pure Amla (Phyllanthus emblica)\nReetha Powder (100g) — 100% Pure Reetha (Sapindus mukorossi)\nShikakai Powder (100g) — 100% Pure Shikakai (Acacia concinna)\nNagarmotha Powder (100g) — 100% Pure Nagarmotha (Cyperus rotundus)\nMehendi Powder (100g) — 100% Pure Mehendi (Lawsonia inermis)",
    howToUse:
      "For Natural Hair Wash: Mix Aamla + Reetha + Shikakai in equal parts with warm water. Apply to scalp, massage gently, leave for 10-15 minutes, and rinse.\n\nFor Dandruff Treatment: Mix Nagarmotha powder with coconut oil, apply to scalp, leave overnight, and wash 2-3 times a week.\n\nFor Hair Colour & Conditioning: Mix Mehendi with warm water and a few drops of lemon juice. Apply to hair, leave for 1-2 hours, and rinse for rich colour and deep conditioning.\n\nFor Complete Care: Alternate between the hair wash (2-3x/week) and Mehendi treatment (1-2x/month) for best results.",
    benefits:
      "Complete 5-in-1 Ayurvedic hair care system.\nReplaces shampoo, conditioner, anti-dandruff treatment, hair colour, and scalp therapy.\nAamla strengthens and prevents greying.\nReetha gently cleanses without chemicals.\nShikakai conditions and adds natural shine.\nNagarmotha purifies scalp and fights dandruff.\nMehendi colours naturally and deeply conditions.\nSave 35% compared to individual purchases.",
    image: "/images/products/combo-premium-hair-2.png",
    images: [
      "/images/products/combo-premium-hair-2.png",
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
      "Includes: Aamla Powder (100g) — 100% Pure Amla (Phyllanthus emblica)\nNagarmotha Powder (100g) — 100% Pure Nagarmotha (Cyperus rotundus)\nNeem Powder (100g) — 100% Pure Neem (Azadirachta indica)",
    howToUse:
      "For Scalp Detox Mask:\nMix 1 tbsp each of Neem and Nagarmotha powder with curd to form a paste.\nApply directly to the scalp, parting hair in sections.\nLeave for 20-30 minutes.\nRinse with an Aamla wash (1 tbsp Aamla + water).\n\nFor Anti-Dandruff Oil Treatment:\nMix Nagarmotha and Neem powder with warm coconut oil.\nApply to scalp, leave overnight.\nWash 2-3 times a week for best results.\n\nFor Hair Strengthening Rinse:\nMix Aamla powder with warm water, apply after washing hair as a final rinse for added strength and shine.",
    benefits:
      "Targets the root cause of dandruff — scalp bacteria and fungus.\nNeem's antibacterial properties soothe itchy, irritated scalp.\nNagarmotha purifies scalp buildup and regulates oil.\nAamla strengthens follicles and promotes regrowth.\nReduces hair fall caused by scalp issues.\nNatural alternative to medicated anti-dandruff shampoos.\nSave 35% compared to individual purchases.",
    image: "/images/products/combo-scalp-care.png",
    images: [
      "/images/products/combo-scalp-care.png",
    ],
    tags: ["combo", "scalp-care", "anti-dandruff", "hair-fall", "value-pack"],
    isFeatured: false,
  },
  {
    name: "Jaison Special Combo",
    slug: "jaison-special-combo",
    sku: "JAIS-COMBO-SPECIAL",
    price: 859,
    compareAtPrice: 1565,
    weight: 500,
    category: "Combos",
    categorySlug: "combos",
    shortDescription:
      "Our best value bundle — hair care meets skin care. Shikakai, Aamla, Neem, Multani Mitti & Ubtan — 45% off.",
    description:
      "The ultimate Jaison experience — five of our best products bundled together at our biggest discount. Shikakai and Aamla deliver complete hair nourishment, Neem purifies both skin and scalp, Multani Mitti deep-cleanses and tightens pores, and our signature Ubtan (powered by 18 Ayurvedic herbs) gives you visible glow from the very first use. One combo for head-to-toe herbal care. Save a massive 45% compared to buying individually.",
    ingredients:
      "Includes: Shikakai Powder (100g) — 100% Pure Shikakai (Acacia concinna)\nAamla Powder (100g) — 100% Pure Amla (Phyllanthus emblica)\nNeem Powder (100g) — 100% Pure Neem (Azadirachta indica)\nMultani Mitti (100g) — 100% Pure Fuller's Earth\nUbtan (50g jar) — Turmeric, Sandalwood, Gram Flour, Almond, Rose Petal, Saffron & more",
    howToUse:
      "For Hair (2-3x/week): Mix Shikakai + Aamla with warm water, apply to hair and scalp, leave 10-15 minutes, rinse.\n\nFor Scalp Treatment: Mix Neem powder with coconut oil, apply to scalp, leave overnight, wash off.\n\nFor Skin Cleansing: Mix Multani Mitti with rose water, apply to face, let dry 10-15 minutes, rinse for clean, tight pores.\n\nFor Glowing Skin: Mix Ubtan with rose water or milk, apply to face and neck, scrub gently, rinse after 10-15 minutes for radiant skin.\n\nFor best results, use the hair care routine 2-3 times a week and the skin care routine 3-4 times a week.",
    benefits:
      "Complete head-to-toe herbal care in one bundle.\nShikakai conditions hair naturally without chemicals.\nAamla strengthens roots and prevents premature greying.\nNeem fights dandruff, acne, and skin infections.\nMultani Mitti deep-cleanses pores and controls oil.\nUbtan brightens skin, reduces tan, and gives instant glow.\nOur biggest discount — save 45% on 5 premium products.\nPerfect gift for someone starting their Ayurvedic journey.",
    image: "/images/products/combo-jaison-special.png",
    images: [
      "/images/products/combo-jaison-special.png",
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
