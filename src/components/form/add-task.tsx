"use client";

import React, { useState } from "react";
import { Card } from "../ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
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
import { Task, User } from "@prisma/client";
import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import {
  CalendarIcon,
  Check,
  Clock,
  Ellipsis,
  FlagIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { priorities } from "../constants";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { createSubTask, createTask, updateTask } from "@/actions/task";
import { toast } from "sonner";
import { useTask } from "@/hooks/task";

const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  priority: z.string(),
  // labels: z.string(),
});

type Props = {
  userId: string;
  isEditing?: boolean;
  currentTask?: Task;
  onCancel?: () => void;
  isAddingSubTask?: boolean;
};

type TaskPriority = "p1" | "p2" | "p3" | "p4";

const AddTask = ({
  isEditing = false,
  userId,
  currentTask,
  onCancel,
  isAddingSubTask = false,
}: Props) => {
  const pathname = usePathname();
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("p4");
  const { isPending, isUpdating, mutate, updateMutate } = useTask(userId);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: isEditing ? currentTask?.title : "",
      description: isEditing
        ? currentTask?.description
          ? currentTask.description
          : ""
        : "",
      priority: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      if (isEditing) {
        if (currentTask?.id) {
          updateMutate({
            id: currentTask?.id,
            data: { ...values, author: { connect: { clerkId: userId } } },
          });
        }
      }
      if (isAddingSubTask) {
        const res = await createSubTask({
          data: {
            title: values.title,
            description: values.description,
            authorId: userId,
            taskId: currentTask?.id as string,
          },
          pathname,
        });
        if (res.status === 201) {
          toast("Success", {
            description: res.message,
          });
        } else {
          toast("Error", {
            description: res.message,
          });
        }
      }
      if (!isEditing && !isAddingSubTask) {
        mutate({
          title: values.title,
          description: values.description,
          priority: values.priority,
          author: {
            connect: {
              clerkId: userId,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-gray-400 rounded-md mt-5"
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
                    className="border-none outline-none ring-offset-transparent focus:outline-none focus:border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300 text-[14px] py-0 text-gray-700 font-light"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex gap-2 items-center m-3">
          {/* <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <TooltipProvider>
                  <Tooltip>
                    <FormControl>
                      <Popover>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-1 h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(field.value, "PP")
                              ) : (
                                <span>Due date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Set due date</TooltipContent>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </Tooltip>
                </TooltipProvider>
              </FormItem>
            )}
          /> */}
          {/* Todo */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={"outline"}
                  className="bg-white text-gray-900 border border-gray-300"
                >
                  <CalendarIcon className="w-3 h-3 mr-1 opacity-50" /> Due date
                </Button>
              </TooltipTrigger>
              <TooltipContent>More actions</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <TooltipProvider>
                  <Tooltip>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <TooltipTrigger asChild>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </TooltipTrigger>
                      </FormControl>
                      <TooltipContent>
                        <div className="flex items-center space-x-1">
                          <p>Set priority </p>
                          {priorities.map((priority, i, arr) => (
                            <span
                              key={priority.label}
                              className="p-1 bg-gray-100 rounded-sm"
                            >
                              {i < arr.length - 1
                                ? `${priority.label}, `
                                : `${priority.label}`}{" "}
                            </span>
                          ))}
                        </div>
                      </TooltipContent>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem
                            value={priority.value}
                            key={priority.label}
                          >
                            <div className="flex gap-1 items-center">
                              <FlagIcon
                                color={priority.color}
                                className="h-4 w-4 opacity-50"
                              />
                              {priority.value}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Tooltip>
                </TooltipProvider>
              </FormItem>
            )}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  className="bg-white text-gray-900 border border-gray-300"
                >
                  <Clock className="w-4 h-4 opacity-50" /> Reminders
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Add reminers{" "}
                <span className="p-1 bg-gray-100 rounded-sm"> ! </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={"outline"}
                  className="bg-white text-gray-900 border border-gray-300"
                >
                  <Ellipsis className="w-3 h-3 opacity-50" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More actions</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Separator />

        <div className="flex justify-between items-center p-3">
          <p>Section</p>
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="bg-gray-100/55 text-black"
                  onClick={onCancel}
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
              disabled={isPending}
            >
              {isEditing ? "Save" : "Add Task"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddTask;
