"use server";

import { db } from "@/lib/db";
import { SubTask } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getAllTasks = async (id: string) => {
  try {
    const tasks = await db.task.findMany({
      where: {
        authorId: id,
      },
      include: {
        author: true,
        subTasks: true,
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

export const addSubTask = async ({
  data,
  pathname,
}: {
  data: Pick<SubTask, "authorId" | "taskId" | "title" | "description">;
  pathname: string;
}) => {
  try {
    const subTask = await db.subTask.create({
      data: {
        title: data.title,
        description: data.description,
        taskId: data.taskId,
        authorId: data.authorId,
      },
    });
    revalidatePath(pathname);
    return {
      status: 201,
      data: subTask,
      message: "Sub task added.",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};
