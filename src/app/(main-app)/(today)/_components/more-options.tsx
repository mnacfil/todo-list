"use client";

import React from "react";
import {
  CopyPlus,
  Edit,
  Ellipsis,
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
import { Task, User } from "@prisma/client";
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
import { addTask, deleteTask, getCurrentUser } from "../action";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

type Props = {
  task: Task;
  user: User;
};

const MoreOptions = ({ task, user }: Props) => {
  const pathname = usePathname();
  const handleDeleteTask = async () => {
    await deleteTask({ taskId: task.id, pathname });
  };

  const handleDuplicateTask = async () => {
    try {
      const res = await addTask({
        title: task.title,
        description: task?.description ? task.description : "",
        pathname,
        user,
      });
      if (res.id) {
        toast({
          title: "Task duplicated",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis size={16} className="text-gray-400 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="sm:max-w-[250px]">
        <div className="flex flex-col divide-y divide-slate-300 mt-5 gap-3 w-full">
          <div className="flex flex-col gap-2">
            <ActionRow Icon={Edit} title="Edit" endInfo="Ctrl E" />
            <ActionRow
              Icon={List}
              title="Go to project"
              EndInfoIcon={MoveUp}
              endInfo="G"
            />
          </div>
          <div className="flex flex-col gap-1">
            <ActionRow Icon={Grip} title="Move to..." endInfo="V" />
            <ActionRow
              Icon={CopyPlus}
              title="Duplicate"
              onClick={handleDuplicateTask}
            />
            <ActionRow
              Icon={Link}
              title="Copy link to task"
              endInfo="Ctrl C"
              EndInfoIcon={MoveUp}
            />
          </div>
          <div className="flex flex-col gap-2">
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
                    onClick={handleDeleteTask}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptions;
