"use client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface InfiniteScrollProps {
  isManual?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const IntersectionLoader = ({
  isManual = false,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: InfiniteScrollProps) => {
  const { observerRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [
    isIntersecting,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isManual,
  ]);
  return (
    <div className="flex flex-col p-4 gap-4">
      <div
        ref={observerRef as React.RefObject<HTMLDivElement>}
        className="h-6"
      />
      {hasNextPage ? (
        <div className="flex justify-center">
          {isFetchingNextPage ? <Loader2 className="animate-spin" /> : null}
        </div>
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          No more videos
        </p>
      )}
    </div>
  );
};

export default IntersectionLoader;
