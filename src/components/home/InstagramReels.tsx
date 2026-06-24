'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const REELS = [
  'https://www.instagram.com/reel/DBv5wqmsQIZ/',
  'https://www.instagram.com/reel/DBzM4sOqX_f/',
  'https://www.instagram.com/reel/DBse3TQNS72/',
];

export default function InstagramReels() {
  // Re-process if embed.js was already loaded before this component mounted
  useEffect(() => {
    window.instgrm?.Embeds.process();
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-14 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        {REELS.map((url) => (
          <blockquote
            key={url}
            className="instagram-media w-full"
            data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: 0,
              borderRadius: '12px',
              boxShadow: '0 2px 16px rgba(26,60,52,0.08)',
              margin: 0,
              maxWidth: '540px',
              minWidth: '326px',
              padding: 0,
            }}
          />
        ))}
      </div>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </div>
  );
}
