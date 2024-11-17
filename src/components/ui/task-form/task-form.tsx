import React, { FC } from "react";
import styles from "./task-form.module.css";
import { CgCloseR } from "react-icons/cg";

type TaskFormUIProps = {
  task: {
    title: string;
    description: string;
    startDate: string;
    status: string;
    endDate: string;
    priority: string;
    subtasks: { id: string; title: string }[];
  };
  isEditing: boolean;
  titleRef: React.RefObject<HTMLTextAreaElement>;
  descriptionRef: React.RefObject<HTMLTextAreaElement>;
  subtasksRefs: React.RefObject<(HTMLTextAreaElement | null)[]>;
  onTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
  isEditing,
  titleRef,
  descriptionRef,
  subtasksRefs,
  onTitleChange,
  onDescriptionChange,
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
        <textarea
          name="title"
          value={task.title}
          placeholder="Заголовок задачи"
          className={styles.textareaTitle}
          onChange={onTitleChange}
          ref={titleRef}
        />
        <textarea
          name="description"
          value={task.description}
          placeholder="Описание задачи"
          className={styles.textareaDescription}
          onChange={onDescriptionChange}
          ref={descriptionRef}
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
            className={styles.formDate}
            onChange={onStartDateChange}
          />
          <label htmlFor="endDate">Дата окончания:</label>
          <input
            id="endDate"
            type="date"
            value={task.endDate}
            className={styles.formDate}
            onChange={onEndDateChange}
          />
        </div>

        {task.subtasks.map((subtask, index) => (
          <div key={index} className={styles.buttonSubtaskContainer}>
            <textarea
              name="subtasks"
              value={subtask.title}
              placeholder={`Подзадача ${index + 1}`}
              className={styles.textareaSubtask}
              onChange={(e) => onSubtaskChange(index, e.target.value)}
              ref={(e) => {
                if (subtasksRefs.current) {
                  subtasksRefs.current[index] = e;
                }
              }}
            />
            <button
              className={styles.buttonForm}
              onClick={() => onSubtaskDelite(subtask.id)}
            >
              <CgCloseR size={20} />
            </button>
          </div>
        ))}
        <button className={styles.buttonForm} onClick={onSubtaskAdd}>
          + Добавить пункт
        </button>

        <button
          type="submit"
          className={styles.buttonSubmit}
          onClick={onSubmit}
        >
          {isEditing ? "Изменить" : "Создать"}
        </button>
      </div>
    </>
  );
};
