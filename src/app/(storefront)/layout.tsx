import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";

// Lazy-loaded client-only: framer-motion is only in this component's bundle.
// Deferring it with ssr:false removes ~120 KB of framer-motion JS from the
// critical path — the popup only appears at 40% scroll depth anyway.
const LeadMagnetPopup = dynamic(
  () => import("@/components/home/LeadMagnetPopup"),
  { ssr: false }
);

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <CartDrawer />
      <LeadMagnetPopup />
      <main className="min-h-screen pt-[138px] md:pt-[168px]">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppButton />
    </>
  );
}
