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
import {
  Calendar,
  DiscIcon,
  Edit2,
  Ellipsis,
  InboxIcon,
  MessageSquare,
  TableIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { addTask, deleteTask, updateTask } from "../action";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AddTask from "@/components/form/add-task";
import MoreOptions from "./more-options";

type Props = {
  task: Task;
  user: User;
};

const EditTask = ({ task, user }: Props) => {
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleCancelEdit = () => setIsEditing(false);
  const handleShowAddTaskForm = () => setIsEditing(true);

  return (
    <>
      {isEditing ? (
        <AddTask
          user={user}
          currentTask={task}
          isEditing={isEditing}
          onCancel={handleCancelEdit}
        />
      ) : (
        <Dialog>
          {/* <DialogTrigger className="cursor-pointer"> */}
          <div className="p-2 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Checkbox
                  id="task"
                  className="rounded-full text-gray-500!"
                  onCheckedChange={handleCheckTask}
                  color="red"
                />
                <div className="flex flex-col gap-[0.5px]">
                  <Label htmlFor="task" className="text-sm font-light">
                    {task.title}
                  </Label>
                  <p className="p-0 text-sm font-light text-gray-500">
                    {task.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Edit2
                  className="text-gray-400 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-950"
                  size={16}
                  onClick={handleShowAddTaskForm}
                />
                <Calendar className="text-gray-400" size={16} />
                <MessageSquare className="text-gray-400" size={16} />
                <MoreOptions task={task} user={user} />
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
      )}
    </>
  );
};

export default EditTask;
