"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getUserTasks = async (id: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        author: {
          clerkId: id,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: true,
        subTasks: true,
        comments: true,
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
  taskId,
  userId,
  data,
}: {
  taskId: string;
  userId: string;
  data: Prisma.SubTaskCreateInput;
}) => {
  try {
    const subTask = await prisma.subTask.create({
      data: {
        ...data,
        author: {
          connect: {
            clerkId: userId,
          },
        },
        task: {
          connect: {
            id: taskId,
          },
        },
      },
    });
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
  data,
  userId,
}: {
  data: Prisma.TaskCreateInput;
  userId: string;
}) => {
  try {
    const task = await prisma.task.create({
      data: {
        ...data,
        author: {
          connect: {
            clerkId: userId,
          },
        },
      },
    });

    if (task) {
      return {
        status: 201,
        data: task,
        message: "Task added on your list.",
      };
    } else {
      return {
        status: 400,
        data: null,
        message: "Task could not be created.",
      };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        data: null,
        message: error.message,
      };
    }
    return {
      status: 400,
      data: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};

export const deleteTask = async (id: string) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return {
      status: 200,
      data: task,
      message: "1 Task completed.",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        data: null,
        message: error.message,
      };
    }
    return {
      status: 404,
      message: "Task has been removed succesfully.",
    };
  }
};

export const updateTask = async ({
  id,
  data,
}: {
  id: string;
  data: Prisma.TaskCreateInput;
}) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { ...data },
    });
    return {
      status: 200,
      data: updatedTask,
      message: "Task has been updated successfully.",
    };
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        data: null,
        message: error.message,
      };
    }
    return {
      status: 400,
      data: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};

export const getCurrentUser = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: "mnacfil@gmail.com",
    },
  });
  return user;
};
