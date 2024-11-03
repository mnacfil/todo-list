"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createComment = async ({
  taskId,
  userId,
  data,
}: {
  taskId: string;
  userId: string;
  data: Prisma.CommentCreateInput;
}) => {
  if (!taskId || !userId) return;
  try {
    const comment = await prisma.comment.create({
      data: {
        ...data,
      },
    });
    return {
      status: 201,
      data: comment,
      message: "Success",
    };
  } catch (error) {
    return {
      status: 494,
      data: null,
      message: "Something went wrong",
    };
  }
};
