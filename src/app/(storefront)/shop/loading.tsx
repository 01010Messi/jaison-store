import Skeleton from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <div className="min-h-screen">
      {/* Header area */}
      <div className="bg-surface-warm py-12 md:py-16">
        <div className="container-brand text-center">
          <Skeleton className="h-4 w-20 mx-auto mb-3" />
          <Skeleton className="h-8 w-48 mx-auto mb-3" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>

      {/* Filters */}
      <div className="container-brand py-6">
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
