export default function CartLoading() {
  return (
    <div className="min-h-screen bg-background" aria-busy="true" aria-label="Loading cart">
      <main className="mx-auto max-w-[1180px] px-5 pb-28 pt-7 sm:px-6 md:pt-9 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <div className="h-3 w-28 animate-pulse rounded-sm bg-primary-light" />
          <div className="h-10 w-48 animate-pulse rounded-sm bg-primary-light" />
          <div className="h-5 w-72 max-w-full animate-pulse rounded-sm bg-primary-light" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="overflow-hidden rounded-card border border-border bg-surface">
            <div className="h-36 animate-pulse border-b border-border bg-primary-light/60" />
            <div className="h-36 animate-pulse border-b border-border bg-primary-light/40" />
            <div className="h-36 animate-pulse bg-primary-light/60" />
          </div>
          <div className="h-72 animate-pulse rounded-card border border-border bg-surface" />
        </div>
      </main>
    </div>
  );
}
