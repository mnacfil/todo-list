import { Task, User } from "@prisma/client";

export type AddTaskParams = {
  title: string;
  description?: string;
  priority?: string;
  dueDate?: Date;
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
