"use server";

import { prisma } from "@/lib/db";
import { SubTask } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { AddTaskParams, DeleteTaskParams, UpdateTaskParams } from "./types";

export const getAllTasks = async (id: string) => {
  try {
    const tasks = await prisma.task.findMany({
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

export const createSubTask = async ({
  data,
  pathname,
}: {
  data: Pick<SubTask, "authorId" | "taskId" | "title" | "description">;
  pathname: string;
}) => {
  try {
    const subTask = await prisma.subTask.create({
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

export const createTask = async ({
  title,
  userId,
  priority,
  description,
  pathname,
}: AddTaskParams) => {
  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
  revalidatePath(pathname);
  return task;
};

export const deleteTask = async ({ taskId, pathname }: DeleteTaskParams) => {
  const task = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  revalidatePath(pathname);
  return task;
};

export const updateTask = async ({
  taskId,
  newTask,
  pathname,
}: UpdateTaskParams) => {
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { ...newTask },
  });
  revalidatePath(pathname);
  return updatedTask;
};

export const getCurrentUser = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: "mnacfil@gmail.com",
    },
  });
  return user;
};
