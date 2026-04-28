"use server";

import prisma from "../prisma";
import { Status } from "@/app/generated/prisma/enums";
import { getCurrentUser } from "../actions/user";

export const AddGameStatus = async (
  gameId: string,
  gameName: string,
  gameImage: string,
  status: Status,
) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");
    const gameStatus = await prisma.gameStatus.upsert({
      where: {
        userId_gameId: {
          userId: user.id,
          gameId,
        },
      },
      update: {
        status,
      },
      create: {
        gameId,
        gameName,
        gameImage,
        status,
        userId: user.id,
      },
    });
    return gameStatus;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGameStatus = async (gameId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");
    const gameStatus = await prisma.gameStatus.findUnique({
      where: {
        userId_gameId: {
          userId: user.id,
          gameId,
        },
      },
    });
    return gameStatus;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStatus = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");
    const gameStatus = await prisma.gameStatus.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
      },
    });
    return gameStatus;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
