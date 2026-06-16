export interface FaqItem {
  id: string;
  title: string;
  content: string;
}

export interface FaqGroup {
  id: string;
  label: string;
  faqs: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "products",
    label: "About Our Products",
    faqs: [
      {
        id: "p1",
        title: "Are your products 100% natural?",
        content:
          "Yes. Every Jaison Herbals product is made from 100% natural, plant-derived ingredients with no added chemicals, preservatives, synthetic fragrances, or artificial additives. What you see on the label is exactly what's inside.",
      },
      {
        id: "p2",
        title: "Do your products contain any preservatives or chemicals?",
        content:
          "No. Our herbal powders are dried and processed — a format that doesn't require chemical preservatives. As long as you keep the pouch sealed and dry, no preservatives are needed to maintain freshness and potency.",
      },
      {
        id: "p3",
        title: "What is the shelf life of your products?",
        content:
          "Our herbal powders have a shelf life of 12–18 months from the date of manufacture, printed on the packaging. Proper storage — sealed, away from moisture and direct sunlight — helps maintain full potency throughout the shelf life.",
      },
      {
        id: "p4",
        title: "How do I know if the powder is still fresh?",
        content:
          "Fresh herbal powders have a vibrant colour and a distinct natural aroma. If the powder has lost its colour, smells musty, or has visible clumping due to moisture exposure, it's best to replace it. Always seal the pouch tightly after use.",
      },
      {
        id: "p5",
        title: "Are your products tested for purity and quality?",
        content:
          "Yes. Each batch undergoes quality checks before dispatch. We source our herbs from trusted suppliers and process them in hygienic, controlled conditions. We are committed to providing products that are safe, pure, and effective.",
      },
    ],
  },
  {
    id: "how-to-use",
    label: "How to Use",
    faqs: [
      {
        id: "h1",
        title: "How much powder should I use per application?",
        content:
          "For face masks, 1–2 tablespoons is typically sufficient to cover the face and neck. For hair applications, use 2–4 tablespoons depending on hair length. Start with a smaller amount and adjust — a little goes a long way.",
      },
      {
        id: "h2",
        title: "What should I mix the powder with?",
        content:
          "The most common mixing liquids are rose water (adds a soothing, toning effect), plain water (simplest, always works), curd or yoghurt (hydrating, good for dry skin), aloe vera gel (calming, great for sensitive skin), and milk (brightening, nourishing). The consistency should be a smooth, spreadable paste — neither too runny nor too thick.",
      },
      {
        id: "h3",
        title: "How long should I leave the paste on my skin?",
        content:
          "15–20 minutes is ideal for most face applications. For hair, 20–30 minutes works well. Don't leave it on until it's bone dry and cracking — rinse while it still feels slightly damp for best results and to avoid pulling at the skin.",
      },
      {
        id: "h4",
        title: "How often should I use herbal powder face masks?",
        content:
          "2–3 times per week is ideal for most people. Daily use of gentle powders like Multani Mitti or Neem is fine for oily skin types. If you have dry or sensitive skin, once or twice a week is usually enough. Listen to your skin — if it feels tight or dry after application, reduce frequency.",
      },
      {
        id: "h5",
        title: "Can I use herbal powders as a daily cleanser?",
        content:
          "Yes, several of our powders work beautifully as daily cleansers, particularly Shikakai (for hair) and Neem or Multani Mitti in small amounts for face cleansing. Mix a small quantity into a thin paste, massage gently, and rinse. It's a chemical-free alternative to synthetic face washes.",
      },
      {
        id: "h6",
        title: "What water temperature is best for mixing?",
        content:
          "Room temperature or lukewarm water works best for most powders. Avoid hot water — it can degrade certain active compounds. For Multani Mitti specifically, cold or room temperature rose water gives the best paste consistency.",
      },
    ],
  },
  {
    id: "safety",
    label: "Safety & Skin Type",
    faqs: [
      {
        id: "s1",
        title: "Are your products suitable for sensitive skin?",
        content:
          "Our powders are made from gentle, naturally derived ingredients that are generally well-tolerated by sensitive skin. That said, individual reactions vary. We always recommend a patch test before your first use: apply a small amount to the inner forearm, leave for 15 minutes, and check for any reaction before applying to the face.",
      },
      {
        id: "s2",
        title: "Can I use these products during pregnancy?",
        content:
          "Most of our single-ingredient herbal powders are safe for external use during pregnancy. However, we recommend consulting your doctor or Ayurvedic practitioner before starting any new skincare routine during pregnancy, particularly for products with active botanicals like Neem or Mehendi.",
      },
      {
        id: "s3",
        title: "Can children use these products?",
        content:
          "Our powders are made from natural ingredients and are gentle enough for children above the age of 5 for skin applications. For scalp applications (Shikakai, Aamla, Reetha), they are safe for children of all ages. Always do a patch test first and avoid contact with eyes.",
      },
      {
        id: "s4",
        title: "What should I do if I experience irritation?",
        content:
          "Rinse the area thoroughly with cool water immediately. If irritation persists, apply aloe vera gel to soothe. Discontinue use of that specific product. Most reactions with natural products are mild and temporary. If swelling or severe reactions occur, consult a dermatologist. Always do a patch test before trying a new product.",
      },
      {
        id: "s5",
        title: "Are your products safe for all skin types?",
        content:
          "Yes, with some guidance. Multani Mitti and Neem work especially well for oily and combination skin. Ubtan and Rose Petal Powder are great for normal to dry skin. Mixing your powder with curd or honey instead of water will make any formula more hydrating for dry skin types. We recommend exploring the 'How to Use' guide on each product page for skin-type specific tips.",
      },
    ],
  },
  {
    id: "mixing",
    label: "Mixing & Combining Powders",
    faqs: [
      {
        id: "m1",
        title: "Can I mix Aamla, Reetha, and Shikakai together?",
        content:
          "Absolutely — this is one of the most popular traditional hair wash combinations in Ayurveda. Mix equal parts of all three with warm water to form a paste, apply to the scalp and hair, leave for 20–30 minutes, and rinse thoroughly. It cleanses, conditions, and strengthens in one step.",
      },
      {
        id: "m2",
        title: "Can I mix Neem powder with Multani Mitti?",
        content:
          "Yes, this is a fantastic combination for oily and acne-prone skin. Neem provides antibacterial action while Multani Mitti absorbs excess sebum and purifies pores. Mix 1 tablespoon of each with rose water, apply for 15 minutes, and rinse with cool water.",
      },
      {
        id: "m3",
        title: "What can I add to enhance the effect of Ubtan Powder?",
        content:
          "Ubtan is already a multi-herb blend. To enhance it: add a pinch of turmeric for brightening, mix with raw milk for extra nourishment, or add a few drops of rose water for fragrance and toning. For body scrub use, mix with a coarser base like oats or chickpea flour.",
      },
      {
        id: "m4",
        title: "Can I mix herbal powders with honey, curd, or aloe vera?",
        content:
          "Yes — these are among the best natural mixing agents. Honey adds antibacterial and humectant properties (great for acne-prone skin). Curd provides lactic acid for gentle exfoliation and hydration. Aloe vera gel soothes and calms, ideal for sensitive or irritated skin. Experiment to find what works best for your skin's needs.",
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping & Orders",
    faqs: [
      {
        id: "sh1",
        title: "What is your shipping policy?",
        content:
          "We offer free shipping on all orders above ₹499. For orders below ₹499, a flat shipping fee of ₹49 applies. We ship across India via trusted courier partners. Standard delivery takes 5–7 business days. Express delivery options may be available at checkout depending on your PIN code.",
      },
      {
        id: "sh2",
        title: "Do you offer Cash on Delivery (COD)?",
        content:
          "Yes, we offer Cash on Delivery at a nominal fee of ₹40. COD is available for all serviceable PIN codes. You can also pay online via UPI, credit/debit card, or net banking — these options have no additional charges.",
      },
      {
        id: "sh3",
        title: "How do I track my order?",
        content:
          "Once your order is dispatched, you will receive a tracking number via email. You can use this to track your shipment on our courier partner's website. You can also check your order status from the 'My Orders' section in your account page.",
      },
      {
        id: "sh4",
        title: "What is your return and exchange policy?",
        content:
          "We accept returns within 7 days of delivery if the product is unused and in its original, sealed packaging. For quality issues or damaged products, we offer a full replacement at no cost — just send us a photo of the product and your order number via the Contact page. We process replacements within 3–5 business days.",
      },
    ],
  },
  {
    id: "results",
    label: "Results & Expectations",
    faqs: [
      {
        id: "r1",
        title: "How long before I see visible results?",
        content:
          "Most customers notice a difference within 2–3 weeks of consistent use. Natural ingredients work gradually and in harmony with your skin — they strengthen and nourish rather than produce sudden surface-level changes. For best results, use consistently for at least 4–6 weeks before making a judgement.",
      },
      {
        id: "r2",
        title: "Why do natural products take longer than chemical ones?",
        content:
          "Chemical-based products often produce fast results by stripping or bleaching the skin — effects that wear off (and sometimes cause harm) over time. Natural Ayurvedic ingredients work at the cellular level to gradually improve skin health, texture, and tone. The results take longer but are more sustainable and without side effects.",
      },
      {
        id: "r3",
        title: "Can I use your products alongside my regular skincare routine?",
        content:
          "Yes. Our herbal powders complement rather than compete with your existing routine. Use them as a weekly face mask or hair treatment, then continue with your regular moisturiser or serum. Avoid applying heavy synthetic products immediately after a herbal mask — give your skin 30 minutes to breathe and absorb first.",
      },
      {
        id: "r4",
        title: "How many applications are in one pack?",
        content:
          "Our 100g packs typically yield 20–30 face mask applications (using 1–2 tablespoons per use). For hair applications (2–4 tablespoons), expect 12–20 uses per pack. Exact yield depends on hair length and how thick you mix the paste.",
      },
    ],
  },
  {
    id: "sourcing",
    label: "Sourcing & Quality",
    faqs: [
      {
        id: "q1",
        title: "Where do you source your herbs from?",
        content:
          "We source our herbs from established, trusted agricultural suppliers across India. Each herb is sourced from regions where it grows naturally and abundantly — for example, amla from central India, neem from Maharashtra and Andhra Pradesh, and rose petals from Rajasthan. We prioritise freshness and traceable supply chains.",
      },
      {
        id: "q2",
        title: "How are the powders processed and packaged?",
        content:
          "Our herbs are dried under controlled conditions to preserve their active compounds, then ground into fine powder using clean, food-grade machinery. The powders are packed in moisture-resistant, resealable pouches to maintain freshness from our facility to your doorstep.",
      },
      {
        id: "q3",
        title: "Do you test for heavy metals or contaminants?",
        content:
          "Quality and purity testing is part of our manufacturing process. We work with suppliers who maintain hygiene and quality standards, and we conduct checks on incoming raw material and finished products. If you need specific test reports for a product, you can contact us directly.",
      },
      {
        id: "q4",
        title: "Do you have AYUSH or GMP certification?",
        content:
          "We are actively working towards obtaining formal AYUSH and GMP certifications. Our manufacturing and quality control processes are already aligned with these standards. We will display all certifications prominently on the website as soon as they are in place. In the meantime, our commitment to using 100% natural ingredients and clean manufacturing practices remains unchanged.",
      },
    ],
  },
];
