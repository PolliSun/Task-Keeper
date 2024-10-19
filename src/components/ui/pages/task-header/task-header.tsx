import { FC } from "react";
import styles from "./task-header.module.css";

type TaskHeaderUIProps = {
  totalTasks: number;
  completedTasks: number;
  onCreateTask: () => void;
};

export const TaskHeaderUI: FC<TaskHeaderUIProps> = ({
  totalTasks,
  completedTasks,
  onCreateTask,
}) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.counter}>
          Задачи: {completedTasks}/{totalTasks}
        </div>
        <button className={styles.button} onClick={onCreateTask}>
          + Добавить задачу
        </button>
      </header>
    </>
  );
};
