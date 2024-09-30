import React, { FC } from "react";
import { ToDoCardUI } from "../to-do-card/to-do-card";
import styles from "./to-do-list.module.css";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { useLocation, useNavigate } from "react-router-dom";
import { deliteTask, toggleTaskStatus } from "../../services/slices/toDoSlice";

export const ToDoList: FC = () => {
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
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <div className={styles.counter}>
          Задачи: {completedTasks}/{totalTasks}
        </div>
        <button className={styles.button} onClick={handleCreateTask}>
          + Добавить задачу
        </button>
      </div>
      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <li key={task.id}>
            <ToDoCardUI
              task={task}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
