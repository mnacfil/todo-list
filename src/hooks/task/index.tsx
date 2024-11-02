import {
  createSubTask,
  createTask,
  deleteTask,
  updateTask,
} from "@/actions/task";
import { appKeys } from "@/lib/react-query";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTask = (userId: string) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: async (params: Prisma.TaskCreateInput) => {
      return await createTask({
        userId,
        data: {
          ...params,
        },
      });
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getUserTask(userId),
      });
      const previousTask = await queryClient.getQueryData<
        Prisma.TaskCreateInput[]
      >(appKeys.getUserTask(userId));
      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getUserTask(userId),
        (old: any) => ({ ...old, ["data"]: [...old.data, newTask] })
      );
      return { previousTask };
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData(
        appKeys.getUserTask(userId),
        context?.previousTask
      );
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 201) {
        toast("Success", {
          description: res?.message || "Succesfully added on your list.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({ queryKey: appKeys.getUserTask(userId) });
    },
  });

  const { isPending: isDeleting, mutate: deleteMutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteTask(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getUserTask(userId),
      });

      const previousTask = queryClient.getQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getUserTask(userId)
      );

      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getUserTask(userId),
        (old: any) => ({
          ...old,
          ["data"]: old.data.filter(
            (task: Prisma.TaskCreateInput) => task.id !== id
          ),
        })
      );
      return { previousTask };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(
        appKeys.getUserTask(userId),
        context?.previousTask
      );
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 200) {
        toast("Success", {
          description: res?.message || "Task deleted.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({ queryKey: appKeys.getUserTask(userId) });
    },
  });

  const { isPending: isUpdating, mutate: updateMutate } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Prisma.TaskCreateInput;
    }) => {
      return await updateTask({ id, data });
    },
    onMutate: ({ id, data }) => {
      queryClient.cancelQueries({ queryKey: appKeys.getUserTask(userId) });

      const previousTasks = queryClient.getQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getUserTask(userId)
      );

      queryClient.setQueryData(appKeys.getUserTask(userId), (old: any) => ({
        ...old,
        ["data"]: old.data.map((task: Prisma.TaskCreateInput) =>
          task.id === id ? data : task
        ),
      }));

      return { previousTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getUserTask(userId),
        context?.previousTasks
      );
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 200) {
        toast("Success", {
          description: res?.message || "Task has been updated succesfully.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({ queryKey: appKeys.getUserTask(userId) });
    },
  });

  return {
    isPending,
    isDeleting,
    isUpdating,
    mutate,
    deleteMutate,
    updateMutate,
  };
};

export const useSubTask = (userId: string) => {
  const queryClient = useQueryClient();
  const { isPending: isCreatingSubtask, mutate: createSubTaskMutate } =
    useMutation({
      mutationFn: async ({
        userId,
        taskId,
        data,
      }: {
        userId: string;
        taskId: string;
        data: Prisma.SubTaskCreateInput;
      }) => {
        return await createSubTask({ userId, taskId, data });
      },
      onMutate: (payload) => {
        queryClient.cancelQueries({ queryKey: appKeys.getUserTask(userId) });

        const previousTasks = queryClient.getQueryData<
          Prisma.TaskCreateInput[]
        >(appKeys.getUserTask(userId));

        queryClient.setQueryData(appKeys.getUserTask(userId), (old: any) => ({
          ...old,
          ["data"]: old.data.map((task: Prisma.TaskCreateInput) =>
            task.id === payload.taskId
              ? {
                  ...task,
                  subTasks: [
                    ...(task?.subTasks as Prisma.SubTaskCreateNestedManyWithoutTaskInput[]),
                    payload.data,
                  ],
                }
              : task
          ),
        }));

        return { previousTasks };
      },
      onError: (error, payload, context) => {
        queryClient.setQueryData(
          appKeys.getUserTask(userId),
          context?.previousTasks
        );
        console.log(error);
      },
      onSettled: (res) => {
        if (res?.status === 201) {
          toast("Success", {
            description: res?.message || "Sub task add succesfully.",
          });
        } else {
          toast("Error", {
            description: res?.message || "Something went wrong.",
          });
        }
        queryClient.invalidateQueries({
          queryKey: appKeys.getUserTask(userId),
        });
      },
    });

  return {
    isCreatingSubtask,
    createSubTaskMutate,
  };
};
