"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, Edit2, Inbox, InboxIcon, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import AddTaskForm from "@/components/form/add-task";
import MoreOptions from "./more-options";
import { useTask } from "@/hooks/task";
import TaskOverviewForm from "@/components/form/task-overview";
import { Separator } from "@radix-ui/react-separator";
import TaskOverview from "./task-overview";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  task: any;
  userId: string;
};

const Task = ({ task, userId }: Props) => {
  const { deleteMutate } = useTask(userId);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const onCancelTask = () => setIsEditing(false);
  const onEditTask = () => setIsEditing(true);

  return (
    <>
      {isEditing ? (
        <AddTaskForm
          userId={userId}
          currentTask={task}
          isEditing={isEditing}
          onCancel={onCancelTask}
        />
      ) : (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <div className="p-2 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Label htmlFor="taskCheckbox">
                  <Checkbox
                    id="taskCheckbox"
                    className="rounded-full text-gray-500!"
                    onCheckedChange={() => deleteMutate(task?.id as string)}
                    color="red"
                  />
                </Label>
                <DialogTrigger
                  asChild
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div
                    className="flex flex-col gap-[0.5px]"
                    onClick={() => setShowDialog(true)}
                  >
                    <h4 className="text-sm font-light">{task.title}</h4>
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
          <DialogContent className="w-full flex flex-col sm:max-w-4xl p-0 min-h-[80%] max-h-[80%] gap-0">
            <DialogHeader className="flex px-4 py-2 flex-row items-center justify-between ">
              <div className="flex items-center space-x-2">
                <Inbox className="w-4 h-4 opacity-50" />
                <DialogTitle>Inbox</DialogTitle>
              </div>
              {/* <div className="text-sm font-light">more actions</div> */}
            </DialogHeader>
            <Separator className="h-[1px] bg-gray-200" />
            <div className="flex flex-row flex-1">
              <TaskOverview
                userId={userId}
                task={task}
                onOpenChange={setShowDialog}
              />
              <div className="bg-orange-100/50 min-w-[300px]">Side</div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Task;
