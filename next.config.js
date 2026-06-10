/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Only the widths your layouts actually need
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
    formats: ["image/webp"],
  },
  async headers() {
    return [
      {
        // Immutable cache for hashed static assets
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Long cache for public images (versioned by filename in practice)
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
