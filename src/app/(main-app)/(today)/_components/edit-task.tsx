"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Prisma, Task, User } from "@prisma/client";
import { DiscIcon, Edit2, Ellipsis, InboxIcon, TableIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { addTask, deleteTask } from "../action";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type Props = {
  task: Task;
  user: User;
};

const EditTask = ({ task, user }: Props) => {
  const pathname = usePathname();

  const handleCheckTask = async () => {
    const deletedTask = await deleteTask({ taskId: task.id, pathname });
    toast({
      title: "1 task completed",
      action: (
        <ToastAction
          altText="Goto today to undo"
          onClick={async () =>
            await addTask({ title: deletedTask.title, user, pathname })
          }
        >
          Undo
        </ToastAction>
      ),
    });
  };

  return (
    <Dialog>
      {/* <DialogTrigger className="cursor-pointer"> */}
      <div className="p-2 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              id="task"
              className="rounded-full"
              onCheckedChange={handleCheckTask}
            />
            <Label htmlFor="task" className="text-sm font-light">
              {task.title}
            </Label>
          </div>
          <div className="flex items-center gap-1">
            <Edit2 className="text-gray-400" size={18} />
            <DiscIcon className="text-gray-400" size={18} />
            <DiscIcon className="text-gray-400" size={18} />
            <Ellipsis className="text-gray-400" size={18} />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-1">
          <p className="ml-auto text-xs">inbox</p>
          <InboxIcon className="text-gray-500" size={12} />
        </div>
      </div>
      {/* </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>blah blah blag blah</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
