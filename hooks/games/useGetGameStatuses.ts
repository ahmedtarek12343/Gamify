"use client";

import { useQuery } from "@tanstack/react-query";
import { getStatus } from "@/lib/games/games.mutations";

export const useGetGameStatuses = () => {
  return useQuery({
    queryKey: ["game-statuses"],
    queryFn: getStatus,
  });
};
