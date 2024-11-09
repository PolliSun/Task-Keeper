import React, { FC } from "react";
import { TaskCard } from "../../../task-card/task-card";
import styles from "./tasks-list.module.css";
import { TTask } from "../../../../types/type";
import { TaskDetails } from "../../../task-details/task-details";
import { CgCloseR } from "react-icons/cg";
import { TaskForm } from "../../../task-form/task-form";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { LuChevronDownSquare } from "react-icons/lu";

type TasksListUIProps = {
  onClickCreateTask: () => void;
  totalTasks: number;
  completedTasks: number;
  tasks: TTask[];
  selectedTask: TTask | null;
  onTaskSelect: (taskId: string) => void;
  title?: string;
  titleData?: string;
  onCreateTask: (newTask: TTask) => void;
  createdTask: boolean;
  onClose: () => void;
};

export const TasksListUI: FC<TasksListUIProps> = ({
  onClickCreateTask,
  totalTasks,
  completedTasks,
  tasks,
  selectedTask,
  onTaskSelect,
  title,
  titleData,
  onCreateTask,
  createdTask,
  onClose,
}) => {
  return (
    <>
     <section className={styles.content}>
        <ul className={styles.tasks}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.counter}>
              {completedTasks}/{totalTasks}
            </div>
          </div>
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
        <ul className={styles.data}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{titleData}</h2>
            {(selectedTask || createdTask) && (
              <button className={styles.button} onClick={onClose}>
                <CgCloseR size={23} />
              </button>
            )}
          </div>
          {selectedTask && <TaskDetails task={selectedTask} />}
          {createdTask && <TaskForm onSubmit={onCreateTask} />}
        </ul>
      </section>
    </>
  );
};
