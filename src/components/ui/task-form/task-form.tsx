import React, { FC, useState, useEffect } from "react";
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      title: e.target.value,
    })
  }

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
      <button className={styles.formButton} onClick={handleSubmit}>
        Создать
      </button>
    </div>
  );
};
