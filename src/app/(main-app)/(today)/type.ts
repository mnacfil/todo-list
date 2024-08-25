import { Task, User } from "@prisma/client";

export type AddTaskParams = {
  title: string;
  description?: string;
  user: User;
  pathname: string;
};

export type DeleteTaskParams = {
  taskId: string;
  pathname: string;
};

export type UpdateTaskParams = {
  taskId: string;
  newTask: Task;
  pathname: string;
};
