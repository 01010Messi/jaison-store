/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Inline above-the-fold CSS into the HTML response (via critters).
    // Eliminates the 600ms render-blocking CSS round-trips on slow 4G.
    optimizeCss: true,
    // Tree-shake large icon/animation packages to only include used exports.
    // Reduces the 219 KiB of unused JS flagged by PSI.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    // Only the widths your layouts actually need
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      // Old Shopify product URLs → new Next.js /shop/ paths
      { source: "/products/nagarmotha-powder", destination: "/shop/nagarmotha-powder", permanent: true },
      { source: "/products/reetha-powder-1",   destination: "/shop/reetha-powder",     permanent: true },
      { source: "/products/ubtan-powder",       destination: "/shop/ubtan-powder",       permanent: true },
      { source: "/products/orange-peel-powder", destination: "/shop/orange-peel-powder", permanent: true },
      // Catch-all for any remaining old /products/* slugs
      { source: "/products/:slug",              destination: "/shop/:slug",              permanent: true },
      // Old Shopify blog and page routes
      { source: "/blogs/news",                  destination: "/blog",                    permanent: true },
      { source: "/blogs/:path*",                destination: "/blog",                    permanent: true },
      { source: "/pages/contact",               destination: "/contact",                 permanent: true },
      { source: "/pages/:slug",                 destination: "/:slug",                   permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Security headers applied to every route
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
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
