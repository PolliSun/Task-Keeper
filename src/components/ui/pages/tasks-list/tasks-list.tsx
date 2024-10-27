import React, { FC } from "react";
import { TaskCard } from "../../../task-card/task-card";
import styles from "./tasks-list.module.css";
import { TTask } from "../../../../types/type";
import { TaskDetails } from "../../../task-details/task-details";

type TasksListUIProps = {
  tasks: TTask[];
  selectedTaskId: string | null;
  onTaskSelect: (taskId: string) => void;
};

export const TasksListUI: FC<TasksListUIProps> = ({
  tasks,
  selectedTaskId,
  onTaskSelect,
}) => {
  return (
    <>
      <section className={styles.content}>
        <ul className={styles.tasks}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskSelect(task.id)}
            />
          ))}
        </ul>
        <div className={styles.noteBookHoles}>
          {[...Array(7)].map((_, index) => (
            <div key={index} className={styles.hole} />
          ))}
        </div>
        <ul className={styles.tasks}>
          {selectedTaskId && <TaskDetails id={selectedTaskId} />}
        </ul>
      </section>
    </>
  );
};
