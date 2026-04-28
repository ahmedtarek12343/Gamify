"use client";

import { useMutation } from "@tanstack/react-query";
import { AddGameStatus } from "@/lib/games/games.mutations";
import { Status } from "@/app/generated/prisma/enums";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useChangeGameStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      gameId,
      gameName,
      gameImage,
      status,
    }: {
      gameId: string;
      gameName: string;
      gameImage: string;
      status: Status;
    }) => AddGameStatus(gameId, gameName, gameImage, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["game-status", variables.gameId],
      });
      toast.success("Game status changed successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to change game status");
    },
  });
};
