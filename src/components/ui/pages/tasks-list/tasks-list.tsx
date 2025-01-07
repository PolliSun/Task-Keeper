import React, { FC } from "react";
import styles from "./tasks-list.module.css";
import { TaskCard } from "../../../task-card/task-card";
import { TTask } from "../../../../types/type";

type TasksListUIProps = {
/*   title: string; */
  tasks: TTask[];
/*   noTasksTitle?: string; */
};

export const TasksListUI: FC<TasksListUIProps> = ({
/*   title, */
  tasks,
/*   noTasksTitle, */
}) => {
  return (
    <>
{/*       <div className={styles.titleContainer}>
        <h3 className={styles.title}>{tasks.length > 0 ? title : noTasksTitle}</h3>
      </div> */}
      {tasks.length > 0
        ? tasks.map((task) => <TaskCard key={task.id} task={task} />)
        : null}
    </>
  );
};
