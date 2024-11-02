"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, Edit2, InboxIcon, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AddTask from "@/components/form/add-task";
import { CheckedState } from "@radix-ui/react-checkbox";
import MoreOptions from "./more-options";
import TaskDialog from "./task-dialog";
import { useTask } from "@/hooks/task";

type Props = {
  task: any;
  userId: string;
};

const Task = ({ task, userId }: Props) => {
  const { deleteMutate } = useTask(userId);
  const [isEditing, setIsEditing] = useState(false);

  const onCancelTask = () => setIsEditing(false);
  const onEditTask = () => setIsEditing(true);

  return (
    <>
      {isEditing ? (
        <AddTask
          userId={userId}
          currentTask={task}
          isEditing={isEditing}
          onCancel={onCancelTask}
        />
      ) : (
        <Dialog>
          <div className="p-2 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Checkbox
                  id="task"
                  className="rounded-full text-gray-500!"
                  onCheckedChange={() => deleteMutate(task.id)}
                  color="red"
                />
                <DialogTrigger asChild className="cursor-pointer">
                  <div className="flex flex-col gap-[0.5px]">
                    <Label htmlFor="task" className="text-sm font-light">
                      {task.title}
                    </Label>
                    <p className="p-0 text-sm font-light text-gray-500">
                      {task.description}
                    </p>
                  </div>
                </DialogTrigger>
              </div>
              <div className="flex items-center gap-1">
                <Edit2
                  className="text-gray-400 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-950"
                  size={16}
                  onClick={onEditTask}
                />
                <Calendar className="text-gray-400" size={16} />
                <MessageSquare className="text-gray-400" size={16} />
                <MoreOptions
                  task={task}
                  userId={userId}
                  onClickEdit={onEditTask}
                />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-1">
              <p className="ml-auto text-xs">inbox</p>
              <InboxIcon className="text-gray-500" size={12} />
            </div>
          </div>
          <DialogContent className="w-full flex flex-col sm:max-w-4xl p-0 min-h-[80%] gap-0">
            <TaskDialog userId={userId} task={task} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Task;
