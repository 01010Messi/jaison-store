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
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-accent",
  display: "swap",
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
        url: "/images/og/og-default.jpg",
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
    images: ["/images/og/og-default.jpg"],
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
              background: "#ede8d6",
              color: "#1a3c34",
              border: "1px solid #cfc7ad",
              borderRadius: "2px",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#7A9E7E",
                secondary: "#ede8d6",
              },
            },
            error: {
              iconTheme: {
                primary: "#006241",
                secondary: "#ede8d6",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
