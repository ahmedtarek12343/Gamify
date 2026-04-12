"use client";

import { useQuery } from "@tanstack/react-query";
import { getGame } from "@/lib/query-actions/getGame";

export const useGetGame = (id: string) => {
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => getGame(id),
  });
};
