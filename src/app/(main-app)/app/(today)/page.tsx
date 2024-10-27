import React from "react";

import { getCurrentUser } from "./action";
import { redirect } from "next/navigation";
import Task from "./_components/task";
import { CircleCheckBigIcon } from "lucide-react";
import ToggleAddTask from "./_components/toggle-add-task";
import { getAllTasks } from "@/actions/task";

type Props = {};

const TodayPage = async (props: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  const res = await getAllTasks(user.id);

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Today</h2>
      {res.data && res.data.length > 0 ? (
        <div className="flex items-center gap-2">
          <CircleCheckBigIcon size={16} className="text-gray-500" />
          <p className="text-gray-500 text-sm">{res.data.length} tasks</p>
        </div>
      ) : null}
      {res.data && res.data.length > 0 ? (
        <div className="flex w-full gap-4 flex-col divide-y divide-slate-100 mt-6">
          {res.data.map((task) => (
            <Task key={task.id} task={task} user={user} />
          ))}
        </div>
      ) : null}
      <ToggleAddTask user={user} />
      {res.data && res.data.length === 0 ? (
        <div className="flex items-center justify-center flex-col min-h-60">
          <h2 className="text-md">Your peace of mind is priceless</h2>
          <p className="text-gray-600 text-sm">
            Well done! All your tasks are organized in the right place.
          </p>
        </div>
      ) : null}
    </>
  );
};

export default TodayPage;
