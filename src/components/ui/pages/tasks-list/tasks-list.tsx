import React, { FC } from "react";
import { TaskCard } from "../../../task-card/task-card";
import styles from "./tasks-list.module.css";
import { TTask } from "../../../../types/type";
import { TaskDetails } from "../../../task-details/task-details";
import { CgCloseR } from "react-icons/cg";
import { TaskForm } from "../../../task-form/task-form";

type TasksListUIProps = {
  totalTasks: number;
  completedTasks: number;
  tasks: TTask[];
  selectedTask: TTask | null;
  onTaskSelect: (taskId: string) => void;
  isTaskSelected: (taskId: string) => boolean;
  title?: string;
  titleData?: string;
  onCreateTask: (newTask: TTask) => void;
  createdTask: boolean;
  onClose: () => void;
  editedTask: boolean;
  onEditTask: (editedTask: TTask) => void;
  handleEditClick: () => void;
};

export const TasksListUI: FC<TasksListUIProps> = ({
  totalTasks,
  completedTasks,
  tasks,
  selectedTask,
  onTaskSelect,
  isTaskSelected,
  title,
  titleData,
  onCreateTask,
  createdTask,
  onClose,
  editedTask,
  onEditTask,
  handleEditClick,
}) => {
  return (
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
            onClickTask={() => onTaskSelect(task.id)}
            isTaskSelected={isTaskSelected}
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
          {(selectedTask || createdTask || editedTask) && (
            <button className={styles.button} onClick={onClose}>
              <CgCloseR size={23} />
            </button>
          )}
        </div>
        {editedTask && selectedTask ? (
          <TaskForm onSubmit={onEditTask} initialData={selectedTask} />
        ) : (
          selectedTask && (
            <TaskDetails task={selectedTask} onEditTask={handleEditClick} />
          )
        )}
        {createdTask && <TaskForm onSubmit={onCreateTask} />}
      </ul>
    </section>
  );
};
