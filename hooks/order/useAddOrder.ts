"use client";

import { useMutation } from "@tanstack/react-query";
import { addOrder } from "@/lib/actions/order";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart.store";
import { useQueryClient } from "@tanstack/react-query";

export const useAddOrder = () => {
  const queryclient = useQueryClient();
  const { clearCart } = useCartStore();
  return useMutation({
    mutationFn: (order: any) => addOrder(order),
    onSuccess: () => {
      toast.success("Order added successfully");
      queryclient.invalidateQueries({ queryKey: ["orders"] });
      clearCart();
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message || "Failed to add order");
    },
  });
};
