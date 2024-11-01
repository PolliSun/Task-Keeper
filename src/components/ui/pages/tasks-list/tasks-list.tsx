import React, { FC } from "react";
import { TaskCard } from "../../../task-card/task-card";
import styles from "./tasks-list.module.css";
import { TTask } from "../../../../types/type";
import { TaskDetails } from "../../../task-details/task-details";
import { TaskFormUI } from "../../task-form/task-form";

type TasksListUIProps = {
  tasks: TTask[];
  selectedTask: TTask | null;
  onTaskSelect: (taskId: string) => void;
  title?: string;
  onCreateTask: (task: TTask) => void;
  сreatedTask: TTask | null;
};

export const TasksListUI: FC<TasksListUIProps> = ({
  tasks,
  selectedTask,
  onTaskSelect,
  title,
  onCreateTask,
  сreatedTask,
}) => {
  return (
    <>
      <section className={styles.content}>
        <ul className={styles.tasks}>
          <h2 className={styles.title}>{title}</h2>
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
          {selectedTask && <TaskDetails task={selectedTask}/>}
          {сreatedTask && <TaskFormUI onSubmit={onCreateTask} />}
        </ul>
      </section>
    </>
  );
};
