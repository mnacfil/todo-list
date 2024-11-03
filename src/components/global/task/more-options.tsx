"use client";

import React from "react";
import {
  AlarmClock,
  Clock,
  CopyPlus,
  Edit,
  Ellipsis,
  Flag,
  Grip,
  Link,
  List,
  ListTodo,
  MoveUp,
  Trash,
  Upload,
} from "lucide-react";
import ActionRow from "@/components/global/action-row";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Prisma } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { dueDates, priorities } from "@/components/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTask } from "@/hooks/task";

type Props = {
  task: Prisma.TaskCreateInput;
  userId: string;
  onClickEdit: () => void;
};

const MoreOptions = ({ task, userId, onClickEdit }: Props) => {
  const { isDeleting, isPending, mutate, deleteMutate } = useTask(userId);

  const activePriority = "P4";

  const onDuplicateTask = async () => {
    mutate({
      title: task.title || "",
      description: task?.description || "",
      priority: task?.priority || "",
      author: {
        connect: {
          clerkId: userId,
        },
      },
    });
  };

  const handleSetPriority = async (priority: string) => {};

  const handleDueDate = async () => {};

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis size={16} className="text-gray-400 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="sm:max-w-[250px] p-0">
        <div className="mt-5 p-1 w-full">
          <div className="flex flex-col divide-y divide-slate-300 gap-1">
            <div className="flex flex-col gap-1">
              <ActionRow
                Icon={Edit}
                title="Edit"
                endInfo="Ctrl E"
                onClick={onClickEdit}
              />
              <ActionRow
                Icon={List}
                title="Go to project"
                EndInfoIcon={MoveUp}
                endInfo="G"
              />
            </div>
            <div className="flex flex-col pt-1">
              <ActionRow title="Due date" isLabel={true} endInfo="T">
                <div className="flex space-x-4">
                  {dueDates.map((dueDate) => (
                    <TooltipProvider key={dueDate.value}>
                      <Tooltip>
                        <TooltipTrigger>
                          <dueDate.Icon />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{dueDate.value}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </ActionRow>
              <ActionRow title="Priority" isLabel={true} endInfo="Y">
                <div className="flex items-center space-x-4">
                  {priorities.map((priority) => (
                    <TooltipProvider key={priority.label}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`p-1 rounded-sm hover:bg-gray-100 cursor-pointer ${
                              priority.label === activePriority
                                ? "border-b ring-1 ring-gray-200"
                                : "border-none"
                            }`}
                          >
                            <Flag
                              size={20}
                              color={priority.color}
                              onClick={() => handleSetPriority(priority.label)}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{priority.value}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </ActionRow>
            </div>
            <div className="flex flex-col pt-1">
              <ActionRow Icon={AlarmClock} title="Reminders" />
            </div>
            <div className="flex flex-col gap-1" aria-disabled={isPending}>
              <ActionRow Icon={Grip} title="Move to..." endInfo="V" />
              <ActionRow
                Icon={CopyPlus}
                title="Duplicate"
                onClick={onDuplicateTask}
              />
              <ActionRow
                Icon={Link}
                title="Copy link to task"
                endInfo="Ctrl C"
                EndInfoIcon={MoveUp}
              />
            </div>
            <div className="flex flex-col gap-2 py-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <ActionRow
                    Icon={Trash}
                    title="Delete"
                    EndInfoIcon={MoveUp}
                    endInfo="Delete"
                    color="text-red-500"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-sm">
                      Are you sure you want to delete{" "}
                      <strong>{task.title}</strong>?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                      This action cannot be undone. This will permanently delete
                      your task and remove your task from our database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-sm bg-gray-100 border-none hover:bg-gray-200 text-[12px] px-3">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600/85 text-white hover:bg-red-600 text-[12px] px-3"
                      onClick={() => deleteMutate(task?.id as string)}
                      disabled={isDeleting}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptions;
