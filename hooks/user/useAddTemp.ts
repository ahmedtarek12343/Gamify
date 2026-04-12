"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddUserTemp } from "@/lib/actions/user";
import { toast } from "sonner";

export const useAddTemp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddUserTemp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
