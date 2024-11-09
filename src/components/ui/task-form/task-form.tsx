import React, { FC } from "react";
import styles from "./task-form.module.css";

type TaskFormUIProps = {
  task: {
    title: string;
    startDate: string;
    status: string;
    endDate: string;
    priority: string;
    subtasks: { id: string; title: string }[];
  };
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriorityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubtaskAdd: () => void;
  onSubtaskDelite: (id: string) => void;
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
  onSubtaskDelite,
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
          className={styles.formInput}
          onChange={onTitleChange}
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

        <div className={styles.dateContainer}>
          <label htmlFor="startDate">Дата начала:</label>

          <input
            id="startDate"
            type="date"
            value={task.startDate}
            className={styles.formInput}
            onChange={onStartDateChange}
          />
          <label htmlFor="endDate">Дата окончания:</label>
          <input
            id="endDate"
            type="date"
            value={task.endDate}
            className={styles.formInput}
            onChange={onEndDateChange}
          />
        </div>

        {task.subtasks.map((subtask, index) => (
          <div key={index} className={styles.buttonSubtaskContainer}>
            <input
              type="text"
              value={subtask.title}
              placeholder={`Подзадача ${index + 1}`}
              className={styles.formInput}
              onChange={(e) => onSubtaskChange(index, e.target.value)}
            />
            <button
              className={styles.buttonForm}
              onClick={() => onSubtaskDelite(subtask.id)}
            >
              удалить
            </button>
          </div>
        ))}
        <button className={styles.buttonForm} onClick={onSubtaskAdd}>
          + Добавить пункт
        </button>

        <button className={styles.buttonSubmit} onClick={onSubmit}>
          Создать
        </button>
      </div>
    </>
  );
};
