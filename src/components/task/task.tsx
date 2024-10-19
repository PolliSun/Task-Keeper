import React, { FC } from "react";
import { TasksListUI } from "../../components/ui/pages/tasks-list/tasks-list";
import { TaskHeaderUI } from "../../components/ui/pages/task-header/task-header";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { useLocation, useNavigate } from "react-router-dom";
import { deliteTask, toggleTaskStatus } from "../../services/slices/toDoSlice";
import styles from "./task.module.css";

export const Task: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status).length;
  const handleToggleTask = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deliteTask(id));
  };

  const handleCreateTask = () => {
    navigate("/to-do-list/create-task", { state: { background: location } });
  };

  return (
    <main className={styles.page}>
      <TaskHeaderUI
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        onCreateTask={handleCreateTask}
      />
      <TasksListUI
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
};
