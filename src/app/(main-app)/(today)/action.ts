"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AddTaskParams, DeleteTaskParams, UpdateTaskParams } from "./type";

export const addTask = async ({
  title,
  user,
  description,
  pathname,
}: AddTaskParams) => {
  const task = await db.task.create({
    data: {
      title,
      description,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  revalidatePath(pathname);
  return task;
};

export const deleteTask = async ({ taskId, pathname }: DeleteTaskParams) => {
  const task = await db.task.delete({
    where: {
      id: taskId,
    },
  });
  revalidatePath(pathname);
  return task;
};

export const getAllTasks = async () => {
  const tasks = await db.task.findMany();
  return tasks;
};

export const updateTask = async ({
  taskId,
  newTask,
  pathname,
}: UpdateTaskParams) => {
  const updatedTask = await db.task.update({
    where: { id: taskId },
    data: { ...newTask },
  });
  revalidatePath(pathname);
  return updatedTask;
};

export const createUser = async () => {
  await db.user.create({
    data: {
      name: "Melvs",
      email: "mnacfil@gmail.com",
    },
  });
};

export const getCurrentUser = async () => {
  const user = await db.user.findUnique({
    where: {
      email: "mnacfil@gmail.com",
    },
  });
  return user;
};
