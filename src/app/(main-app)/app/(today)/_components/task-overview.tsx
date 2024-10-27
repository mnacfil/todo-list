import React from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { Inbox } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AddTask from "@/components/form/add-task";
import { Task, User } from "@prisma/client";
import task from "./task";
import TaskOverviewForm from "@/components/form/task-overview";

type Props = {
  user: User;
  task: any;
};

const TaskOverview = ({ user, task }: Props) => {
  return (
    <>
      <DialogHeader className="flex px-4 py-2 flex-row items-center justify-between ">
        <div className="flex items-center space-x-2">
          <Inbox className="w-4 h-4 opacity-50" />
          <p>Inbox</p>
        </div>
        {/* <div className="text-sm font-light">more actions</div> */}
      </DialogHeader>
      <Separator className="h-[1px] bg-gray-200" />
      <div className="flex flex-row flex-1">
        <div className="flex-1 p-4">
          <TaskOverviewForm user={user} task={task} />
        </div>
        <div className="bg-orange-100/50 min-w-[300px]">Side</div>
      </div>
    </>
  );
};

export default TaskOverview;
