'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export type ReelData = {
  handle: string;
  location: string;
  shortcode: string;
  url: string;
};

export type ReelProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  slug: string;
  image: string | null;
};

export default function InstagramReelCard({
  reel,
  product,
}: {
  reel: ReelData;
  product: ReelProduct;
}) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex-shrink-0 w-[260px] md:w-full rounded-2xl overflow-hidden flex flex-col">
      {/* Instagram embed — 9:16 aspect ratio, header clipped via negative margin-top */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '9/16' }}>
        <iframe
          src={`https://www.instagram.com/reel/${reel.shortcode}/embed/`}
          title={`${reel.handle} collab reel`}
          loading="lazy"
          scrolling="no"
          style={{
            width: '100%',
            height: 'calc(100% + 56px)',
            border: 'none',
            marginTop: '-56px',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
        {/* Fade into footer colour */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bark))' }}
        />
        <Link
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={`Watch ${reel.handle}'s reel on Instagram`}
        />
      </div>

      {/* Product footer */}
      <div
        className="px-4 pt-2.5 pb-3 flex flex-col gap-2.5"
        style={{ backgroundColor: 'var(--color-bark)' }}
      >
        <p
          className="font-accent text-[9px] uppercase tracking-[0.22em]"
          style={{ color: 'rgba(255,248,225,0.50)' }}
        >
          — Buy the product
        </p>
        <div className="flex items-center gap-3">
        {/* Thumbnail */}
        {product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
            style={{ backgroundColor: 'var(--color-parchment)' }}
          />
        )}

        {/* Name + price + handle */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[11px] font-accent uppercase tracking-wider truncate"
            style={{ color: 'rgba(255,248,225,0.90)' }}
          >
            {product.name}
          </p>
          <p
            className="font-heading text-sm mt-0.5"
            style={{ color: 'rgba(255,248,225,0.72)', fontWeight: 300 }}
          >
            ₹{product.price}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Instagram className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,248,225,0.45)' }} />
            <span
              className="text-[9px] font-accent tracking-wide truncate"
              style={{ color: 'rgba(255,248,225,0.45)' }}
            >
              {reel.handle}
            </span>
          </div>
        </div>

        {/* Add to Potli */}
        <button
          onClick={handleAdd}
          className="flex-shrink-0 rounded-full font-accent text-[9px] uppercase tracking-wider transition-all duration-200"
          style={{
            padding: '7px 12px',
            backgroundColor: added ? 'rgba(255,248,225,0.22)' : 'rgba(255,248,225,0.10)',
            color: 'rgba(255,248,225,0.90)',
            border: '1px solid rgba(255,248,225,0.22)',
          }}
        >
          {added ? 'Added ✓' : '+ Potli'}
        </button>
        </div>{/* end flex row */}
      </div>
    </div>
  );
}
