import { type ReactNode } from "react";

interface ApiStateProps<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  empty?: ReactNode;
  loadingRows?: number;
  children: (data: T) => ReactNode;
}

export function ApiState<T>({
  data,
  isLoading,
  isError,
  onRetry,
  empty,
  loadingRows = 3,
  children,
}: ApiStateProps<T>) {
  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-4 animate-pulse"
        aria-busy="true"
        aria-label="Loading"
      >
        {Array.from({ length: loadingRows }).map((_, i) => (
          <div key={i} className="h-8 rounded-lg bg-white/5" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-muted-foreground text-sm">
          Failed to load data.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 text-sm font-medium border border-border/50 rounded-full hover:bg-white/10 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  const isEmpty =
    data === undefined ||
    data === null ||
    (Array.isArray(data) && data.length === 0);

  if (isEmpty) {
    return (
      <>
        {empty ?? (
          <div className="py-16 text-center text-muted-foreground text-sm">
            No data available.
          </div>
        )}
      </>
    );
  }

  return <>{children(data as T)}</>;
}
