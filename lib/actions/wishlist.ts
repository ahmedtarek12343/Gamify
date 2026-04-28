"use server";
import { Game } from "@/types";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";

export const toggleWishlist = async (game: Game) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const existingWishlist = await prisma.wishlist.findUnique({
      where: {
        userId_gameId: {
          userId: user.id,
          gameId: game.id.toString(),
        },
      },
    });
    if (existingWishlist) {
      await prisma.wishlist.delete({
        where: {
          userId_gameId: {
            userId: user.id,
            gameId: game.id.toString(),
          },
        },
      });
      revalidatePath("/games");
      return;
    }
    const data = await prisma.wishlist.create({
      data: {
        gameId: game.id.toString(),
        gameName: game.name,
        gameImage: game.background_image,
        userId: user.id,
      },
    });
    revalidatePath("/games");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWishlist = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: user.id,
      },
    });
    return wishlist;
  } catch (error) {
    console.log(error);
  }
};

export const isGameInWishlist = async (gameId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId_gameId: {
          userId: user.id,
          gameId,
        },
      },
    });
    return wishlist ? true : false;
  } catch (error) {
    console.log(error);
  }
};
