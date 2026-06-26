import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/providers/SessionProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/JsonLd";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "optional",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "optional",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-accent",
  display: "optional",
});

export const metadata: Metadata = {
  title: {
    default: "jaison | Natural Ayurvedic Beauty — Herbal Skincare & Haircare",
    template: "%s | jaison",
  },
  description:
    "Shop 100% natural Ayurvedic herbal powders for skin & hair care. Ubtan, Amla, Neem, Multani Mitti, Shikakai & more — handcrafted in Nashik, India. Free from chemicals. Buy online at Jaison Herbals.",
  keywords: [
    "ayurvedic skincare",
    "natural beauty products",
    "herbal powder for skin",
    "herbal powder for hair",
    "ubtan powder",
    "amla powder for hair",
    "neem powder for face",
    "multani mitti face pack",
    "shikakai powder",
    "orange peel powder",
    "reetha powder",
    "mehendi powder",
    "nagarmotha powder",
    "jaison herbals",
    "indian skincare",
    "ayurvedic hair care",
    "natural face pack",
    "chemical free skincare",
    "buy herbal products online India",
    "ayurvedic beauty products online",
  ],
  authors: [{ name: "Jaison Herbals" }],
  creator: "Jaison Herbals",
  publisher: "Jaison Herbals",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jaisonskincare.com",
    siteName: "jaison",
    title: "jaison | Natural Ayurvedic Beauty — Herbal Skincare & Haircare",
    description:
      "Shop 100% natural Ayurvedic herbal powders for skin & hair. Ubtan, Amla, Neem, Multani Mitti & more — handcrafted in India.",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — Natural Ayurvedic Beauty Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "jaison | Natural Ayurvedic Beauty",
    description:
      "Shop 100% natural Ayurvedic herbal powders for skin & hair care. Handcrafted in India.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
  alternates: {
    canonical: "https://jaisonskincare.com",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/images/logo.png",
  },
  manifest: "/manifest.json",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  verification: {
    google: "mU8vVHJA27GXJPoYXaC0cVlNS8XT_3idnqLk6Eue9n0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${inter.variable}`}
    >
      <head>
        {/* Hero poster — preloaded in <head> so the browser scanner discovers it
            immediately, before any render-blocking CSS or JS runs */}
        <link rel="preload" as="image" href="/images/hero-poster.webp" fetchPriority="high" />
        {/* Early DNS + connection for analytics (loads afterInteractive but pre-warming helps) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <MetaPixel />
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--color-cream)",
              color: "var(--color-bark)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              boxShadow: "0 8px 40px rgba(26, 60, 52, 0.12)",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "var(--color-bark)",
                secondary: "var(--color-cream)",
              },
            },
            error: {
              iconTheme: {
                primary: "#C1714F",
                secondary: "var(--color-cream)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
