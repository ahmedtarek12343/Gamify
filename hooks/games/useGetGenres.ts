"use client";

import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/lib/query-actions/getGenres";

export const useGetGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
};
