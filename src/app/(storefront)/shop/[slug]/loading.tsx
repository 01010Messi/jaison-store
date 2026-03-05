import Skeleton from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-surface-warm">
        <div className="container-brand py-3">
          <Skeleton className="h-3 w-48" />
        </div>
      </div>

      {/* Product Section */}
      <section className="container-brand py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Image */}
          <Skeleton className="aspect-square w-full rounded-sm" />

          {/* Info */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-28 mt-2" />
            <div className="flex gap-3 mt-4">
              <Skeleton className="h-11 w-28" />
              <Skeleton className="h-11 flex-1" />
            </div>
            <Skeleton className="h-11 w-full mt-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
