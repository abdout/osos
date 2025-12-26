import { Skeleton } from "@/components/ui/skeleton"

export default function TrackingLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Title Skeleton */}
          <div className="text-center">
            <Skeleton className="mx-auto h-9 w-64" />
            <Skeleton className="mx-auto mt-2 h-5 w-48" />
          </div>

          {/* Header Card Skeleton */}
          <div className="rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="mt-1 h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-9 w-32" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-1 h-6 w-28" />
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Skeleton */}
          <div className="rounded-lg border p-6">
            <Skeleton className="mb-6 h-7 w-40" />
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                  <div className="flex-1 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="mt-2 h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
