import Link from "next/link";
import GoldRule from "@/components/decorative/GoldRule";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-warm flex flex-col items-center justify-center px-4 text-center">
      <p className="font-heading text-8xl text-bark/10">404</p>
      <h1 className="font-heading text-2xl md:text-3xl text-bark mt-4">
        Page Not Found
      </h1>
      <div className="flex justify-center mt-3">
        <GoldRule variant="leaf" width="w-24" />
      </div>
      <p className="text-sm text-bark/50 font-body mt-4 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3 mt-8">
        <Link
          href="/"
          className="px-6 py-2.5 bg-bark text-cream rounded-sm font-accent text-sm uppercase tracking-wider hover:bg-bark/90 transition-all"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="px-6 py-2.5 border border-border text-bark rounded-sm font-accent text-sm uppercase tracking-wider hover:border-bark transition-all"
        >
          Shop Products
        </Link>
      </div>
    </div>
  );
}
