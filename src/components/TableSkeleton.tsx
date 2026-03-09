export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 items-center px-4 py-3"
        >
          <div className="h-4 w-8 rounded bg-muted animate-skeleton-pulse" />
          <div className="h-4 flex-1 rounded bg-muted animate-skeleton-pulse" />
          <div className="h-4 flex-[1.5] rounded bg-muted animate-skeleton-pulse" />
          <div className="h-4 w-12 rounded bg-muted animate-skeleton-pulse" />
          <div className="h-4 w-20 rounded bg-muted animate-skeleton-pulse" />
        </div>
      ))}
    </div>
  );
}
