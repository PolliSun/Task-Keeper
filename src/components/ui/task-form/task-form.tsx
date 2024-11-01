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
    date: "",
    timer: 0,
    remainingTime: 0,
    status: false,
    priority: "none",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      title: e.target.value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setTask(initialData);
      const hours = Math.floor(initialData.timer / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((initialData.timer % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (initialData.timer % 60).toString().padStart(2, "0");
      setTimeInput(`${hours}:${minutes}:${seconds}`);
    }
  }, [initialData]);

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const priorityMap: Record<string, TTask["priority"]> = {
      высокий: "high",
      средний: "medium",
      низкий: "low",
      отсутствует : "none",
    };

    setTask({
      ...task,
      priority: priorityMap[value], 
    });
  };

  const [timeInput, setTimeInput] = useState("");

  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeInput(value);

    const [hours, minutes, seconds] = value.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    setTask((prev) => ({
      ...prev,
      timer: totalSeconds,
      remainingTime: totalSeconds,
    }));
  };

  const handleSubmit = () => {
    const newTask: TTask = {
      ...task,
      id: Math.random().toString(),
      date: new Date().toISOString(),
      remainingTime: task.timer,
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
      <input
        type="text"
        placeholder="Время в формате HH:MM:SS"
        value={timeInput}
        className={styles.formInputTimer}
        onChange={handleTimerChange}
        pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]"
      />
      <div className={styles.priorityGroup}>
        <label className={task.priority === "high" ? styles.active : ""}>
          <input
            type="radio"
            name="priority"
            value="высокий"
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
            value="средний"
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
            value="низкий"
            checked={task.priority === "low"}
            onChange={handlePriorityChange}
            className={styles.radioInput}
          />
          Низкий
        </label>
        <label
          className={task.priority === "none" ? styles.active : ""}
        >
          <input
            type="radio"
            name="priority"
            value="без приоритета"
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
