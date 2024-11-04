import { createComment } from "@/actions/comment";
import { appKeys } from "@/lib/react-query";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useComment = (userId: string) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({
      userId,
      taskId,
      data,
    }: {
      userId: string;
      taskId: string;
      data: Prisma.CommentCreateInput;
    }) => {
      return await createComment({ data, taskId, userId });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getUserTask(userId),
      });
      const previousTasks = await queryClient.getQueryData<
        Prisma.TaskCreateInput[]
      >(appKeys.getUserTask(userId));
      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getUserTask(userId),
        (old: any) => ({
          ...old,
          ["data"]: old.data.map((task: Prisma.TaskCreateInput) =>
            task.id === payload.taskId
              ? {
                  ...task,
                  ["comments"]: [
                    ...(task?.comments as Prisma.CommentCreateNestedManyWithoutTaskInput[]),
                    payload.data,
                  ],
                }
              : task
          ),
        })
      );
      return { previousTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getUserTask(userId),
        context?.previousTasks
      );
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: appKeys.getUserTask(userId) });
    },
  });

  return {
    isPending,
    mutate,
  };
};
