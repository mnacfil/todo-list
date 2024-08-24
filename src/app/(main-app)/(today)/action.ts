"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AddTaskParams, DeleteTaskParams } from "./type";

export const addTask = async ({ title, user, pathname }: AddTaskParams) => {
  const task = await db.task.create({
    data: {
      title,
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
  await db.task.delete({
    where: {
      id: taskId,
    },
  });
  revalidatePath(pathname);
};

export const getAllTasks = async () => {
  const tasks = await db.task.findMany();
  return tasks;
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
