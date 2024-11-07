import { CircleCheckBigIcon } from "lucide-react";
import { getUserTasks } from "@/actions/task";
import ToggleAddTask from "@/components/global/toggle-add-task";
import Task from "@/components/global/task";
import { useAuth } from "@clerk/nextjs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { appKeys } from "@/lib/react-query";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Today from "./_components/today";

// Todo
// Fix bug when submitting the form in the dialog of Task

const TodayPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/login");
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: appKeys.getUserTask(user.id),
    queryFn: () => getUserTasks(user.id),
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Today</h2>
      <Today userId={user.id} />
    </>
  );
};

export default TodayPage;
