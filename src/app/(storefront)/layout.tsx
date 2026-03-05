import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen pt-16 md:pt-20 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppButton />
    </>
  );
}
