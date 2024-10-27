import React, { FC } from "react";
import { TaskHeaderUI } from "../../components/ui/pages/task-header/task-header";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { useLocation, useNavigate } from "react-router-dom";
import { addTask } from "../../services/slices/toDoSlice";
import { TTask } from "../../types/type";
import { TaskFormUI } from "../ui/task-form/task-form";

export const TaskHeader: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status).length;

  const handleCreateTask = () => {
    navigate("/task-list/create-task", { state: { background: location } });
  };

  const handleSaveDoing = (newTasks: TTask) => {
    dispatch(addTask(newTasks));
    navigate("/task-page");
  };

  const isCreateTask = location.pathname === "/task-list/create-task";

  if (isCreateTask) {
    return <TaskFormUI onSubmit={handleSaveDoing} />;
  }

  return (
    <TaskHeaderUI
      totalTasks={totalTasks}
      completedTasks={completedTasks}
      onCreateTask={handleCreateTask}
    />
  );
};
