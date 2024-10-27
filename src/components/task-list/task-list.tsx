import React, { FC } from "react";
import { TasksListUI } from "../ui/pages/tasks-list/tasks-list";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { deliteTask, toggleTaskStatus } from "../../services/slices/toDoSlice";

export const TaskList: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const handleToggleTask = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deliteTask(id));
  };

  return (
    <TasksListUI
      tasks={tasks}
      onToggleTask={handleToggleTask}
      onDeleteTask={handleDeleteTask}
    />
  );
};
