export default function OrdersLoading() {
  return (
    <div className="min-h-screen bg-background" aria-busy="true" aria-label="Loading orders">
      <main className="mx-auto max-w-[1180px] px-5 pb-28 pt-7 sm:px-6 md:pt-9 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <div className="h-3 w-28 animate-pulse rounded-sm bg-primary-light" />
          <div className="h-10 w-56 animate-pulse rounded-sm bg-primary-light" />
          <div className="h-5 w-80 max-w-full animate-pulse rounded-sm bg-primary-light" />
        </div>
        <div className="mt-8 h-96 animate-pulse rounded-card border border-border bg-surface" />
        <div className="mt-8 space-y-3">
          <div className="h-24 animate-pulse rounded-card border border-border bg-surface" />
          <div className="h-24 animate-pulse rounded-card border border-border bg-surface" />
        </div>
      </main>
    </div>
  );
}
