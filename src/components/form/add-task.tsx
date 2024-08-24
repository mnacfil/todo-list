"use client";

import React from "react";
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
import { addTask, updateTask } from "@/app/(main-app)/(today)/action";
import { Task, User } from "@prisma/client";
import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { CalendarIcon, Clock, FlagIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  // dueData: z.date(),
  // priority: z.string(),
  // labels: z.string(),
});

type Props = {
  user: User;
  isEditing?: boolean;
  currentTask?: Task;
  onCancel: () => void;
};

const AddTask = ({ isEditing = false, user, currentTask, onCancel }: Props) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: isEditing ? currentTask?.title : "",
      description: isEditing
        ? currentTask?.description
          ? currentTask.description
          : ""
        : "",
      // priority: "",
      // labels: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      if (isEditing) {
        if (currentTask?.id) {
          await updateTask({
            taskId: currentTask.id,
            newTask: {
              ...currentTask,
              title: values.title,
              description: values.description,
            },
            pathname: pathname,
          });
          onCancel();
        }
      } else {
        const response = await addTask({ title: values.title, user, pathname });
        if (response) {
          toast({
            title: "Success",
            description: "Task added on you list.",
          });
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
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
                  className="border-none outline-none ring-offset-transparent focus:outline-none focus:border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-0 font-semibold placeholder:text-gray-400 py-0"
                />
              </FormControl>
              <FormMessage className="px-3" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  className="border-none outline-none ring-offset-transparent focus:outline-none focus:border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-0 placeholder:text-gray-300 text-[14px] font-normal py-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 items-center m-3">
          <Button className="bg-white text-gray-900 border border-gray-300">
            <CalendarIcon />
            Due date
          </Button>
          <Button className="bg-white text-gray-900 border border-gray-300">
            {" "}
            <FlagIcon /> Priority
          </Button>
          <Button className="bg-white text-gray-900 border border-gray-300">
            <Clock /> Reminders
          </Button>
          <Button className="bg-white text-gray-900 border border-gray-300">
            ...
          </Button>
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
