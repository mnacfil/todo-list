"use server";

import { db } from "@/lib/db";

export const getAllTasks = async (id: string) => {
  try {
    const tasks = await db.task.findMany({
      where: {
        authorId: id,
      },
    });
    if (tasks && tasks.length > 0) {
      return {
        status: 200,
        data: tasks,
        message: "Successfully get the tasks.",
      };
    }
    return {
      status: 200,
      data: [],
      message: "Empty tasks.",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};
