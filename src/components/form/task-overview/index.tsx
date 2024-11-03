"use client";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import clsx from "clsx";
import React, { RefObject, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TaskOverviewFormSchema } from "./schema";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTask } from "@/hooks/task";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  userId: string;
  task: Prisma.TaskCreateInput;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
};

const TaskOverViewForm = ({ onOpenChange, task, userId }: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLFormElement | null>(null);
  const { isUpdating, updateMutate } = useTask(userId);
  const form = useForm<z.infer<typeof TaskOverviewFormSchema>>({
    resolver: zodResolver(TaskOverviewFormSchema),
    defaultValues: {
      title: task.title ?? "",
      description: task.description ?? "",
      priority: task?.priority ?? "",
    },
  });

  useClickOutside({ ref, callback: () => setIsFocus(false) });

  const onSubmit = async (values: z.infer<typeof TaskOverviewFormSchema>) => {
    updateMutate({
      id: task?.id as string,
      data: { ...values, author: { connect: { clerkId: userId } } },
    });
    onOpenChange(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)(e);
        }}
        ref={ref as RefObject<HTMLFormElement>}
      >
        <div
          className={clsx(
            "",
            isFocus && "border-gray-500/50 rounded-md border"
          )}
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
              disabled={isUpdating}
            >
              Save
            </Button>
          </div>
        )}
        <div></div>
      </form>
    </Form>
  );
};

export default TaskOverViewForm;
