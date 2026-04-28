"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleLike } from "@/lib/actions/comments";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/actions/user";
import { useQuery } from "@tanstack/react-query";

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  const user = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });
  return useMutation({
    mutationFn: ({ commentId }: { commentId: string }) => ToggleLike(commentId),

    onError: (err) => {
      toast.error(err.message || "Failed to like comment");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
