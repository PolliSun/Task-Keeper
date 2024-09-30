import React, { FC, useState, useEffect } from "react";
import { TToDo } from "../../types/type";
import styles from "./to-do-form.module.css";

type DoingFormProps = {
  onSubmit: (task: TToDo) => void;
  initialData?: TToDo;
};

export const ToDoForm: FC<DoingFormProps> = ({ onSubmit, initialData }) => {
  const [task, setTask] = useState<TToDo>({
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
    const newTask: TToDo = {
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
