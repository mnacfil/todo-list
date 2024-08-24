import { User } from "@prisma/client";

export type AddTaskParams = {
  title: string;
  user: User;
  pathname: string;
};

export type DeleteTaskParams = {
  taskId: string;
  pathname: string;
};
