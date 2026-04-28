"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/lib/actions/comments";
import { toast } from "sonner";

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ content, gameId }: { content: string; gameId: string }) =>
      addComment(content, gameId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.gameId],
      });
      toast.success("Comment added successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
