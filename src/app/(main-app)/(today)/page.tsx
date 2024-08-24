import AddTask from "@/components/form/add-task";
import React from "react";
import { getAllTasks, getCurrentUser } from "./action";
import { redirect } from "next/navigation";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import EditTask from "./_components/edit-task";

type Props = {};

const TodayPage = async (props: Props) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-up");
  }
  const tasks = await getAllTasks();

  return (
    <>
      <h2>Today</h2>
      {tasks.length > 0 ? <p>{tasks.length} tasks</p> : null}
      <div className="flex w-full gap-4 flex-col divide-y divide-slate-100 mt-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <EditTask key={task.id} task={task} />)
        ) : (
          <p>Empty task</p>
        )}
      </div>
      <AddTask user={user} />
    </>
  );
};

export default TodayPage;
