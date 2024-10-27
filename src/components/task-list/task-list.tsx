import React, { FC, useState } from "react";
import { TasksListUI } from "../ui/pages/tasks-list/tasks-list";
import { RootState, useSelector, useDispatch } from "../../services/store";

export const TaskList: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
  };

  return (
    <TasksListUI
      tasks={tasks}
      selectedTaskId={selectedTaskId}
      onTaskSelect={handleSelectTask}
    />
  );
};
