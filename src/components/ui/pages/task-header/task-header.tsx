import { FC } from "react";
import styles from "./task-header.module.css";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { TbClockQuestion } from "react-icons/tb";

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
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <TbClockQuestion size={23} />
          </button>
          <button className={styles.button} onClick={onCreateTask}>
            <RiStickyNoteAddLine size={23} />
          </button>
        </div>
      </header>
    </>
  );
};
