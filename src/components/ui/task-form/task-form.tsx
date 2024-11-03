import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-form.module.css";

type TaskFormUIProps = {
  task: {
    title: string;
    startDate: string;
    endDate: string;
    priority: string;
    subtasks: { id: string; title: string; }[];
  };
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriorityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubtaskAdd: () => void;
  onSubtaskChange: (index: number, value: string) => void;
  onSubmit: () => void;
};

export const TaskFormUI: FC<TaskFormUIProps> = ({
  task,
  onTitleChange,
  onStartDateChange,
  onPriorityChange,
  onEndDateChange,
  onSubtaskAdd,
  onSubtaskChange,
  onSubmit,
}) => {
  return (
    <>
      <div className={styles.taskForm}>
        <input
          name="title"
          value={task.title}
          placeholder="Заголовок задачи"
          className={styles.formInputTitle}
          onChange={onTitleChange}
        />
        <div>
          <button className={styles.buttonForm} onClick={onSubtaskAdd}>
            +
          </button>
          {task.subtasks.map((subtask, index) => (
            <div key={index} className={styles.buttonForm}>
              <input
                type="text"
                value={subtask.title}
                placeholder={`Подзадача ${index + 1}`}
                onChange={(e) => onSubtaskChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <label htmlFor="startDate">Дата начала:</label>
        <input
          id="startDate"
          type="date"
          value={task.startDate}
          className={styles.formInputDate}
          onChange={onStartDateChange}
        />
        <label htmlFor="endDate">Дата окончания:</label>
        <input
          id="endDate"
          type="date"
          value={task.endDate}
          className={styles.formInputDate}
          onChange={onEndDateChange}
        />
        <div className={styles.priorityGroup}>
          {["высокий", "средний", "низкий", "без приоритета"].map((label) => (
            <label
              key={label}
              className={task.priority === label ? styles.active : ""}
            >
              <input
                type="radio"
                name="priority"
                value={label}
                checked={task.priority === label}
                onChange={onPriorityChange}
                className={styles.radioInput}
              />
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
          ))}
        </div>
        <button className={styles.formButton} onClick={onSubmit}>
          Создать
        </button>
      </div>
    </>
  );
};
