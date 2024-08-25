"use client";

import React from "react";
import {
  Edit,
  Ellipsis,
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
import { Task } from "@prisma/client";
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
import { deleteTask } from "../action";
import { usePathname } from "next/navigation";

type Props = {
  task: Task;
};

const MoreOptions = ({ task }: Props) => {
  const pathname = usePathname();
  const handleDeleteTask = async () => {
    await deleteTask({ taskId: task.id, pathname });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis size={16} className="text-gray-400 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="sm:max-w-[250px]">
        <div className="flex flex-col divide-y divide-slate-300 mt-5 gap-2 w-full">
          <div className="flex flex-col gap-2">
            <ActionRow Icon={Edit} title="Edit" endInfo="Ctrl E" />
            <ActionRow
              Icon={List}
              title="Go to project"
              EndInfoIcon={MoveUp}
              endInfo="G"
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
