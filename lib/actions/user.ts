"use server";

import prisma from "../prisma";

export const AddUserTemp = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId: "123",
        firstName: "John",
        lastName: "Doe",
        email: "[EMAIL_ADDRESS]",
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetUsers = async () => {
  try {
    const user = await prisma.user.findMany();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
