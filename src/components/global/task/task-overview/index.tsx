"use client";

import { Prisma, SubTask } from "@prisma/client";
import React, { RefObject, SetStateAction, useRef, useState } from "react";
import {
  ChevronDown,
  EllipsisIcon,
  Paperclip,
  Plus,
  Smile,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  console.log(task?.comments);

  return (
    <div className="flex-1 p-4">
      <div className="w-full flex flex-col">
        <ScrollArea className="h-[550px] whitespace-nowrap">
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
              <div className="flex flex-col gap-4 w-full">
                {task?.subTasks?.length > 0 ? (
                  <>
                    <HideAndShow
                      label="Sub tasks"
                      subLabel={`${0}/${task?.subTasks.length}`}
                    >
                      <div className="divide-y flex flex-col">
                        {task.subTasks.map((subTask: SubTask) => (
                          <div key={subTask.id} className="flex gap-2 py-2">
                            <Label htmlFor="subtaskCheckbox">
                              <Checkbox
                                id="subtaskCheckbox"
                                className="rounded-full w-4 h-4 opacity-50 mt-[2px]"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </Label>
                            <div className="flex flex-col gap-1">
                              <h4 className="text-xs">{subTask.title}</h4>
                              <p className="text-muted-foreground text-[10px]">
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
                      <span className="text-xs text-gray-500">
                        Add sub-task
                      </span>
                    </div>
                    <Separator className="my-3" />
                  </>
                )}
                {task?.comments?.length > 0 ? (
                  <>
                    <HideAndShow
                      label="Comments"
                      subLabel={task?.comments?.length}
                    >
                      <div className="flex flex-col overflow-y-auto">
                        {task.comments.map((comment: any) => (
                          <div key={comment.id} className="flex gap-4 py-2">
                            <Avatar className="w-7 h-7 mt-2">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>MN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col w-full">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <p className="font-semibold text-xs">Name</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(
                                      comment.createdAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="p-1 rounded-sm hover:bg-gray-100 transition-all cursor-pointer">
                                    <Smile size={18} className="" />
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger
                                      asChild
                                      className="rounded-sm hover:bg-gray-100 transition-all cursor-pointer"
                                    >
                                      <EllipsisIcon size={18} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Copy text
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Copy link to comment
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <p className="text-xs">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </HideAndShow>
                  </>
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
          </div>
        </ScrollArea>
        <div className="ml-5">
          {isComment ? (
            <CommentForm
              userId={userId}
              taskId={task.id}
              onCancel={() => setIsComment(false)}
            />
          ) : (
            <div className="flex items-center space-x-2 my-5">
              <Avatar className="w-7 h-7">
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
    </div>
  );
};

export default TaskOverview;
