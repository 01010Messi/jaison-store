import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background — hero image, softly overlaid so it never fights the form */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero-group.webp"
          alt=""
          fill
          className="object-cover object-center scale-105"
          style={{ filter: "blur(3px)" }}
          priority
          sizes="100vw"
        />
        {/* Parchment wash — 84% opacity keeps the warmth, kills the noise */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(239,228,197,0.84)" }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Logo header */}
        <header className="pt-10 pb-6 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="Jaison Skincare"
              width={220}
              height={80}
              className="h-14 w-auto mx-auto"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </Link>
        </header>

        {/* Auth form */}
        <main className="flex-1 flex items-center justify-center px-4 pb-14">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
