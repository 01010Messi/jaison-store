import prisma from '@/lib/prisma';
import InstagramReelCard from './InstagramReelCard';
import type { ReelProduct } from './InstagramReelCard';

const REELS = [
  {
    handle: '@nashikinanutshell',
    location: 'Nashik',
    shortcode: 'DBv5wqmsQIZ',
    url: 'https://www.instagram.com/reel/DBv5wqmsQIZ/',
  },
  {
    handle: '@tanyathevar',
    location: 'TT × Jaison',
    shortcode: 'DBzM4sOqX_f',
    url: 'https://www.instagram.com/reel/DBzM4sOqX_f/',
  },
  {
    handle: '@loveena_thevar',
    location: 'Gifted',
    shortcode: 'DBse3TQNS72',
    url: 'https://www.instagram.com/reel/DBse3TQNS72/',
  },
];

// Static fallback used when DATABASE_URL is not available (local dev without .env.local).
// In production (Vercel) the real DB record is fetched below.
const UBTAN_FALLBACK: ReelProduct = {
  id: 'ubtan-powder',
  name: 'Ubtan Powder',
  price: 440,
  stock: 100,
  slug: 'ubtan-powder',
  image: '/images/products/ubtan.webp',
};

export default async function InstagramReels() {
  let product: ReelProduct = UBTAN_FALLBACK;

  try {
    const raw = await prisma.product.findUnique({
      where: { slug: 'ubtan-powder' },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        slug: true,
        images: { take: 1, select: { url: true } },
      },
    });

    if (raw) {
      product = {
        id: raw.id,
        name: raw.name,
        price: Number(raw.price),
        stock: raw.stock,
        slug: raw.slug,
        image: raw.images[0]?.url ?? UBTAN_FALLBACK.image,
      };
    }
  } catch {
    // DATABASE_URL not set — use static fallback
  }

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible">
      {REELS.map((reel) => (
        <InstagramReelCard key={reel.url} reel={reel} product={product} />
      ))}
    </div>
  );
}
