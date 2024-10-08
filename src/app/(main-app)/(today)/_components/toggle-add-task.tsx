"use client";

import AddTask from "@/components/form/add-task";
import { User } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  user: User;
};

const ToggleAddTask = ({ user }: Props) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const openAddTaskForm = () => setIsAddingTask(true);
  const closeAddTaskForm = () => setIsAddingTask(false);

  return (
    <>
      {isAddingTask ? (
        <AddTask user={user} onCancel={closeAddTaskForm} />
      ) : (
        <div
          className="flex items-center gap-1 cursor-pointer group"
          onClick={openAddTaskForm}
        >
          <PlusIcon
            size={16}
            className="text-red-500 font-light group-hover:text-white group-hover:bg-red-500 group-hover:rounded-full"
          />
          <p className="text-gray-500 text-sm font-light group-hover:text-red-500">
            Add task
          </p>
        </div>
      )}
    </>
  );
};

export default ToggleAddTask;
