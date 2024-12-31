import React, { FC } from "react";
import styles from "./tasks-list.module.css";
import { TaskCard } from "../../../task-card/task-card";
import { TTask } from "../../../../types/type";

type TasksListUIProps = {
  title: string;
  tasks: TTask[];
};

export const TasksListUI: FC<TasksListUIProps> = ({
  title,
  tasks,
}) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        ""
        // <div className={styles.titleContainer}>
        //   <h3 className={styles.title}>{title}</h3>
        // </div>
      )}
    </>
  );
};
