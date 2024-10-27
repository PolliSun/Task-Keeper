import React, { FC, useState } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-form.module.css";

type TaskFormProps = {
  onSubmit: (task: TTask) => void;
  initialData?: TTask;
};

export const TaskFormUI: FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [task, setTask] = useState<TTask>({
    id: "",
    title: "",
    status: false,
    priority: "none",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      title: e.target.value,
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      priority: e.target.value as "high" | "medium" | "low" | "none",
    });
  };

  const handleSubmit = () => {
    const newTask: TTask = {
      ...task,
      id: Math.random().toString(),
    };

    onSubmit(newTask);
  };

  return (
    <div className={styles.taskForm}>
      <input
        name="title"
        value={task.title}
        placeholder="Название задачи"
        className={styles.formInputTitle}
        onChange={handleChange}
      />
      <div className={styles.priorityGroup}>
        <label className={task.priority === "high" ? styles.active : ""}>
          <input
            type="radio"
            name="priority"
            value="high"
            checked={task.priority === "high"}
            onChange={handlePriorityChange}
            className={styles.radioInput}
          />
          Высокий
        </label>
        <label className={task.priority === "medium" ? styles.active : ""}>
          <input
            type="radio"
            name="priority"
            value="medium"
            checked={task.priority === "medium"}
            onChange={handlePriorityChange}
            className={styles.radioInput}
          />
          Средний
        </label>
        <label className={task.priority === "low" ? styles.active : ""}>
          <input
            type="radio"
            name="priority"
            value="low"
            checked={task.priority === "low"}
            onChange={handlePriorityChange}
            className={styles.radioInput}
          />
          Низкий
        </label>
        <label className={task.priority === "none" ? styles.active : ""}>
          <input
            type="radio"
            name="priority"
            value="none"
            checked={task.priority === "none"}
            onChange={handlePriorityChange}
            className={styles.radioInput}
          />
          Без приоритета
        </label>
      </div>
      <button className={styles.formButton} onClick={handleSubmit}>
        Создать
      </button>
    </div>
  );
};
