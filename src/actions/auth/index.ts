"use server";

import { prisma } from "@/lib/db";
import { CreateUserParams } from "./types";
import { Prisma } from "@prisma/client";

export const createUser = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });
    if (user) {
      return {
        status: 201,
        data: user,
        message: "User successfully created",
      };
    }
    return {
      status: 400,
      message: "User could not be created! Try again",
      id: null,
    };
  } catch (error) {
    return {
      status: 400,
      message: "User could not be created! Try again",
      id: null,
    };
  }
};

export const authenticateUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: id },
    });
    if (user) {
      return {
        status: 200,
        data: user,
        message: "Successfull",
      };
    }
    return {
      status: 404,
      data: null,
      message: "No User found",
    };
  } catch (error) {
    return {
      status: 404,
      data: null,
      message: "No User found",
    };
  }
};
