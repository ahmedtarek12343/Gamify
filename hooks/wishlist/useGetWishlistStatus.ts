"use client";

import { useQuery } from "@tanstack/react-query";
import { isGameInWishlist } from "@/lib/actions/wishlist";

export const useGetWishlistStatus = (gameId: string) => {
  return useQuery({
    queryKey: ["wishlist", gameId],
    queryFn: () => isGameInWishlist(gameId),
  });
};
