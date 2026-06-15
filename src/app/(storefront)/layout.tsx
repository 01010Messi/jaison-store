import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";
import LeadMagnetPopup from "@/components/home/LeadMagnetPopup";

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
      <main className="min-h-screen pt-[130px] md:pt-[160px] pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppButton />
    </>
  );
}
