"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubTask, Task, User } from "@prisma/client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ChevronDown, Paperclip, Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AddTask from "./add-task";

type Props = {
  user: User;
  task: any;
};

// Todo: add more property in this schema
const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  priority: z.string(),
});

const TaskOverviewForm = ({ user, task }: Props) => {
  // const [isChecked, isChecked] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task.title ?? "",
      description: task.description ?? "",
      priority: task.priority ?? "",
    },
  });

  useClickOutside({ ref, callback: () => setIsFocus(false) });

  const onAddSubTask = () => {
    setIsAddingSubTask(true);
  };

  const onCancelSubTask = () => {
    setIsAddingSubTask(false);
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    // try {
    //   const res = await addSubTask(task.id, {
    //     title: values.title
    //   });
    // } catch (error) {
    //   toast("Error", {
    //     description: "Error while adding subTask"
    //   })
    // }
  };

  return (
    <>
      <div className="flex gap-1">
        <Checkbox className="rounded-full w-4 h-4 opacity-50 mt-[18px]" />
        <div className="flex-1 flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div
                className={clsx(
                  "",
                  isFocus && "border-gray-500/50 rounded-md border"
                )}
                ref={ref}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Task name"
                          {...field}
                          className="border-none outline-none ring-offset-transparent focus:outline-none focus:border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-0 font-semibold placeholder:text-gray-400 py-0 text-gray-700"
                          onFocus={() => setIsFocus(true)}
                        />
                      </FormControl>
                      <FormMessage className="px-3" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Description"
                            {...field}
                            className="border-none outline-none ring-offset-transparent focus:outline-none focus:border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300 text-[14px] py-0 text-gray-700 font-light min-h-20"
                            onFocus={() => setIsFocus(true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              {isFocus && (
                <div className="flex items-center space-x-2 justify-end mt-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="bg-gray-100/55 text-black"
                        onClick={() => {}}
                      >
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This changes you&apos;ve made won&apos;t be saved.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-400">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction>Discard</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    type="submit"
                    className={`bg-red-500/50 hover:bg-red-500 hover:text-white, ${clsx(
                      {
                        "bg-red-500": form.getValues("title").length > 0,
                      }
                    )}`}
                  >
                    Save
                  </Button>
                </div>
              )}
              <div></div>
            </form>
          </Form>
          {task.subTasks.length > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <ChevronDown />
                <p>
                  Sub-tasks <span>0/1</span>
                </p>
              </div>
              <div>
                {task.subTasks.map((subTask: SubTask) => (
                  <p key={subTask.id}>{subTask.title}</p>
                ))}
              </div>
            </>
          ) : null}
          {isAddingSubTask ? (
            <AddTask
              user={user}
              onCancel={onCancelSubTask}
              isAddingSubTask={isAddingSubTask}
              currentTask={task}
            />
          ) : (
            <div
              className="flex items-center space-x-1 rounded-sm p-1 hover:bg-gray-50 w-max"
              onClick={onAddSubTask}
            >
              <Plus className="w-4 h-4 opacity-50" />
              <span className="text-xs text-gray-500">Add sub-task</span>
            </div>
          )}
          <Separator className="my-3" />
          {isComment ? (
            <Card>Add coment here</Card>
          ) : (
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MN</AvatarFallback>
              </Avatar>
              <div className="rounded-full flex-1 border border-gray-100 px-4 py-1 flex justify-between items-center cursor-pointer hover:bg-orange-50/50">
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

export default TaskOverviewForm;
