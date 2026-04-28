"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleWishlist } from "@/lib/actions/wishlist";
import { toast } from "sonner";
import { Game } from "@/types";

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (game: Game) => toggleWishlist(game),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(
        `${data ? `${data?.gameName} added to wishlist` : "Game removed from wishlist"}`,
      );
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message || "Failed to toggle wishlist");
    },
  });
};
