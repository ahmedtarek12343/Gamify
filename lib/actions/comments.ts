"use server";

import prisma from "../prisma";
import { getCurrentUser } from "./user";

export const addComment = async (content: string, gameId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("You must be logged in to add a comment");
    await prisma.comment.create({
      data: {
        comment: content,
        gameId,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to add comment");
  }
};

export const getComments = async (gameId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("You must be logged in to comment");
    }
    const comments = await prisma.comment.findMany({
      where: {
        gameId,
      },
      include: {
        user: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return comments;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to get comments");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("You must be logged in to delete a comment");
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new Error("Comment not found");
    if (comment.userId !== user.id) throw new Error("Unauthorized");
    await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to delete comment");
  }
};

export const ToggleLike = async (commentId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("You must be logged in to like a comment");
    const existingLike = await prisma.commentLikes.findUnique({
      where: {
        userId_commentId: {
          userId: user.id,
          commentId,
        },
      },
    });
    if (existingLike) {
      await prisma.commentLikes.delete({
        where: {
          userId_commentId: {
            userId: user.id,
            commentId,
          },
        },
      });
    } else {
      await prisma.commentLikes.create({
        data: {
          userId: user.id,
          commentId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || "Failed to toggle like");
  }
};
