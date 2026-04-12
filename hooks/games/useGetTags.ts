"use client";

import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/query-actions/getTags";

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};
