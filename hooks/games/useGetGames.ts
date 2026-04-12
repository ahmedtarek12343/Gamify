"use client";

import { useQuery } from "@tanstack/react-query";
import { getGames } from "@/lib/query-actions/getGames";

export const useGetGames = (
  search?: string,
  page: number = 1,
  platforms?: string[],
  tags?: string[],
  parentPlatforms?: string,
) => {
  return useQuery({
    queryKey: ["games", search, page, platforms, tags, parentPlatforms],
    queryFn: () => getGames(search, page, platforms, tags, parentPlatforms),
  });
};
