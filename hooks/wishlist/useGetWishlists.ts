"use client";

import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "@/lib/actions/wishlist";

export const useGetWishlists = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });
};
