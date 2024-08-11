"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Params = {
  title: string;
  user: User;
  pathname: string;
};

export const addTask = async ({ title, user, pathname }: Params) => {
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
