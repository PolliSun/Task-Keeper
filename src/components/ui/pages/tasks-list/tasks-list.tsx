import React, { FC } from "react";
import { TaskCardUI } from "../../task-card/task-card";
import styles from "./tasks-list.module.css";
import { TTask } from "../../../../types/type";

type TasksListUIProps = {
  tasks: TTask[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export const TasksListUI: FC<TasksListUIProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
}) => {
  return (
    <>
      <section className={styles.content}>
        <ul className={styles.tasks}>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCardUI
                task={task}
                onDelete={onDeleteTask}
                onToggle={onToggleTask}
              />
            </li>
          ))}
        </ul>
        <div className={styles.noteBookHoles}>
          {[...Array(7)].map((_, index) => (
            <div key={index} className={styles.hole} />
          ))}
        </div>
        <ul className={styles.tasks}></ul>
      </section>
    </>
  );
};
