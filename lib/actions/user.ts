"use server";

import prisma from "../prisma";
import { auth } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
