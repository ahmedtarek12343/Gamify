"use client";

import { useQuery } from "@tanstack/react-query";
import { getParentPlatforms } from "@/lib/query-actions/getParentTags";

export const useGetParentPlatforms = () => {
  return useQuery({
    queryKey: ["parent-platforms"],
    queryFn: getParentPlatforms,
  });
};
