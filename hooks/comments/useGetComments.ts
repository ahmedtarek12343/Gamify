"use client";

import { getComments } from "@/lib/actions/comments";
import { useQuery } from "@tanstack/react-query";

export const useGetComments = (gameId: string) => {
  return useQuery({
    queryKey: ["comments", gameId],
    queryFn: () => getComments(gameId),
  });
};
