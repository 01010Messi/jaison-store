import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/providers/SessionProvider";
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
    default: "jaison | Natural Ayurvedic Beauty",
    template: "%s | jaison",
  },
  description:
    "Discover the ancient wisdom of Ayurvedic beauty care. 100% natural herbal powders for skin and hair — handcrafted with love in India.",
  keywords: [
    "ayurvedic skincare",
    "natural beauty",
    "herbal powder",
    "ubtan",
    "amla powder",
    "neem powder",
    "multani mitti",
    "jaison herbals",
    "indian skincare",
  ],
  authors: [{ name: "Jaison Herbals" }],
  creator: "Jaison Herbals",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jaisonskincare.com",
    siteName: "jaison",
    title: "jaison | Natural Ayurvedic Beauty",
    description:
      "Discover the ancient wisdom of Ayurvedic beauty care. 100% natural herbal powders for skin and hair.",
  },
  twitter: {
    card: "summary_large_image",
    title: "jaison | Natural Ayurvedic Beauty",
    description:
      "Discover the ancient wisdom of Ayurvedic beauty care. 100% natural herbal powders for skin and hair.",
  },
  manifest: "/manifest.json",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
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
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#FDFAF5",
              color: "#3D2B1F",
              border: "1px solid #E8D5B7",
              borderRadius: "2px",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#7A9E7E",
                secondary: "#FDFAF5",
              },
            },
            error: {
              iconTheme: {
                primary: "#C1714F",
                secondary: "#FDFAF5",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
