import { redirect } from "next/navigation";
import { CircleCheckBigIcon } from "lucide-react";
import { getAllTasks } from "@/actions/task";
import { currentUser } from "@clerk/nextjs/server";
import ToggleAddTask from "@/components/global/toggle-add-task";
import Task from "@/components/global/task";

const TodayPage = async () => {
  const user = await currentUser();

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
            <Task key={task.id} task={task} userId={user.id} />
          ))}
        </div>
      ) : null}
      <ToggleAddTask userId={user.id} />
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
