"use server";
import prisma from "../prisma";
import { getCurrentUser } from "./user";

export const addOrder = async (order: any) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const ord = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: Number(order.totalAmount),
        orderItems: {
          create: order.orderItems.map((item: any) => ({
            gameId: String(item.gameId),
            gameName: item.gameName,
            gameImage: item.gameImage,
            gamePrice: Number(item.gamePrice),
            gameQuantity: Number(item.gameQuantity),
          })),
        },
      },
    });
    return ord;
  } catch (error) {
    console.log("Order not created:", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  } catch (error) {
    console.log("Orders not found:", error);
    throw error;
  }
};
