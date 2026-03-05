import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-warm flex flex-col">
      {/* Simple header */}
      <header className="py-6 text-center">
        <Link href="/" className="inline-block">
          <h1 className="font-heading text-2xl text-bark tracking-wider">
            jaison
          </h1>
          <p className="text-[10px] font-accent uppercase tracking-[0.2em] text-bark/40 mt-0.5">
            Natural Herbals
          </p>
        </Link>
      </header>

      {/* Auth content */}
      <main className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
