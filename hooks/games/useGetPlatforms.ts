"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatforms } from "@/lib/query-actions/getPlatforms";

export const useGetPlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: getPlatforms,
  });
};
