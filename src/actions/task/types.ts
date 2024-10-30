import { Task } from "@prisma/client";

export type AddTaskParams = {
  title: string;
  description?: string;
  priority?: string;
  dueDate?: Date;
  userId: string;
  pathname: string;
};

export type DeleteTaskParams = {
  taskId: string;
  pathname: string;
};

export type UpdateTaskParams = {
  taskId: string;
  newTask: Partial<Task>;
  pathname: string;
};
