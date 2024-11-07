"use client";

import React, { useState } from "react";
import AddTaskForm from "@/components/form/add-task";
import { PlusIcon } from "lucide-react";

type Props = {
  userId: string;
  isAddingSubTask?: boolean;
  currentTask?: any;
};

const ToggleAddTask = ({
  userId,
  isAddingSubTask = false,
  currentTask,
}: Props) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const openAddTaskForm = () => setIsAddingTask(true);
  const closeAddTaskForm = () => setIsAddingTask(false);

  return (
    <>
      {isAddingTask ? (
        <AddTaskForm
          userId={userId}
          onCancel={closeAddTaskForm}
          isAddingSubTask={isAddingSubTask}
          currentTask={currentTask}
        />
      ) : (
        <div
          className="flex items-center gap-1 cursor-pointer group"
          onClick={openAddTaskForm}
        >
          <PlusIcon
            size={16}
            className="text-red-500 font-light group-hover:text-white group-hover:bg-red-500 group-hover:rounded-full"
          />
          <p className="text-gray-500 text-xs font-light group-hover:text-red-500">
            Add task
          </p>
        </div>
      )}
    </>
  );
};

export default ToggleAddTask;
