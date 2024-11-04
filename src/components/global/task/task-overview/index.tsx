"use client";

import { Prisma, SubTask } from "@prisma/client";
import React, { RefObject, SetStateAction, useRef, useState } from "react";
import { ChevronDown, Paperclip, Plus } from "lucide-react";
import AddTaskForm from "@/components/form/add-task";
import { Card } from "@/components/ui/card";
import ToggleAddTask from "../../toggle-add-task";
import TaskOverviewForm from "@/components/form/task-overview";
import HideAndShow from "../../hide-and-show";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentForm from "@/components/form/comment";

type Props = {
  userId: string;
  task: any;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
};

const TaskOverview = ({ userId, task, onOpenChange }: Props) => {
  // const [isChecked, isChecked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);

  const onAddSubTask = () => {
    setIsAddingSubTask(true);
  };

  const onCancelSubTask = () => {
    setIsAddingSubTask(false);
  };

  return (
    <>
      <div className="flex gap-1">
        <Label htmlFor="taskCheckbox">
          <Checkbox
            id="taskCheckbox"
            className="rounded-full w-4 h-4 opacity-50 mt-[18px]"
            onClick={(e) => e.stopPropagation()}
          />
        </Label>
        <div className="flex-1 flex-col">
          <TaskOverviewForm
            onOpenChange={onOpenChange}
            task={task}
            userId={userId}
          />
          {task?.subTasks?.length > 0 ? (
            <>
              <HideAndShow
                label="Sub tasks"
                total={task?.subTasks.length}
                count={0}
              >
                <div className="divide-y flex flex-col overflow-y-auto max-h-44">
                  {task.subTasks.map((subTask: SubTask) => (
                    <div
                      key={subTask.id}
                      className="flex items-center gap-2 py-2"
                    >
                      <Label htmlFor="subtaskCheckbox">
                        <Checkbox
                          id="subtaskCheckbox"
                          className="rounded-full w-4 h-4 opacity-50"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Label>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm">{subTask.title}</h4>
                        <p className="text-muted-foreground text-xs">
                          {subTask.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Separator className="mb-2" />
                </div>
                <ToggleAddTask
                  userId={userId}
                  isAddingSubTask={true}
                  currentTask={task}
                />
              </HideAndShow>
            </>
          ) : isAddingSubTask ? (
            <AddTaskForm
              userId={userId}
              onCancel={onCancelSubTask}
              isAddingSubTask={isAddingSubTask}
              currentTask={task}
            />
          ) : (
            <>
              <div
                className="flex items-center space-x-1 rounded-sm p-1 hover:bg-gray-50 w-max"
                onClick={onAddSubTask}
              >
                <Plus className="w-4 h-4 opacity-50" />
                <span className="text-xs text-gray-500">Add sub-task</span>
              </div>
              <Separator className="my-3" />
            </>
          )}
          {task?.comments?.length > 0 ? (
            <HideAndShow label="Comments" total={task?.comments?.length}>
              <div className="divide-y flex flex-col overflow-y-auto max-h-44">
                {task.comments.map((comment: Prisma.CommentCreateInput) => (
                  <div
                    key={comment.id}
                    className="flex items-center gap-2 py-2"
                  >
                    <p className="text-muted-foreground text-xs">
                      {comment.content}
                    </p>
                  </div>
                ))}
                <Separator className="mb-2" />
              </div>
            </HideAndShow>
          ) : isComment ? (
            <CommentForm
              userId={userId}
              taskId={task.id}
              onCancel={() => setIsComment(false)}
            />
          ) : (
            <div className="flex items-center space-x-2 my-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MN</AvatarFallback>
              </Avatar>
              <div
                className="rounded-full flex-1 border border-gray-100 px-4 py-1 flex justify-between items-center cursor-pointer hover:bg-orange-50/50"
                onClick={() => setIsComment(true)}
              >
                <span className="text-sm">Comment</span>
                <Paperclip className="w-4 h-4 opacity-50" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskOverview;
