"use client";

import { CircleCheckBigIcon } from "lucide-react";
import { getUserTasks } from "@/actions/task";
import ToggleAddTask from "@/components/global/toggle-add-task";
import Task from "@/components/global/task";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { appKeys } from "@/lib/react-query";

const TodayPage = () => {
  const user = useAuth();

  const { data, isPending } = useQuery({
    queryKey: appKeys.getUserTask(user?.userId as string),
    queryFn: () => getUserTasks(user?.userId as string),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Today</h2>
      {data?.data && data.data.length > 0 ? (
        <div className="flex items-center gap-2">
          <CircleCheckBigIcon size={16} className="text-gray-500" />
          <p className="text-gray-500 text-sm">{data.data.length} tasks</p>
        </div>
      ) : null}
      {data?.data && data.data.length > 0 ? (
        <div className="flex w-full gap-4 flex-col divide-y divide-slate-100 mt-6">
          {data.data.map((task) => (
            <Task key={task.id} task={task} userId={user.userId as string} />
          ))}
        </div>
      ) : null}
      <ToggleAddTask userId={user.userId as string} />
      {data?.data && data.data.length === 0 ? (
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
