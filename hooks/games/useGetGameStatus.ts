"use client";

import { useQuery } from "@tanstack/react-query";
import { getGameStatus } from "@/lib/games/games.mutations";

export const useGetGameStatus = (gameId: string) => {
  return useQuery({
    queryKey: ["game-status", gameId],
    queryFn: () => getGameStatus(gameId),
  });
};
