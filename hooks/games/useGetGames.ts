"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getGames } from "@/lib/query-actions/getGames";

export const useGetGames = (
  search?: string,
  platforms?: string[],
  tags?: string[],
  parentPlatforms?: string,
  genres?: string[],
  ordering?: string,
) => {
  return useInfiniteQuery({
    queryKey: [
      "games",
      search ?? "",
      platforms?.join(",") ?? "",
      tags?.join(",") ?? "",
      parentPlatforms ?? "",
      genres?.join(",") ?? "",
      ordering ?? "",
    ],
    queryFn: ({ pageParam = 1 }) =>
      getGames(
        search,
        pageParam,
        platforms,
        tags,
        parentPlatforms,
        genres,
        ordering,
      ),
    getNextPageParam: (lastPage: any) => {
      if (!lastPage.next) return undefined;

      try {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");

        if (!page) return undefined;

        return Number(page);
      } catch {
        return undefined;
      }
    },
    initialPageParam: 1,
  });
};
