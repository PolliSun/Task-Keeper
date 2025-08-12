import React, { FC } from "react";
import styles from "./task-form.module.css";
import { Task } from "../../../utils/api/taskService/taskService";
import { CgCloseR } from "react-icons/cg";

type FormDataValueType = string | boolean | null;

type TaskFormUIProps = {
  task: Omit<Task, "id" | "created_at">;
  isEditing: boolean;
  // titleRef: React.RefObject<HTMLTextAreaElement>;
  // descriptionRef: React.RefObject<HTMLTextAreaElement>;
  // subtasksRefs: React.RefObject<(HTMLTextAreaElement | null)[]>;
  onInputChange: (field: string, value: FormDataValueType) => void;
  onSubtaskAdd: (e: React.FormEvent) => void;
  onSubtaskDelite: (id: number, e: React.MouseEvent) => void;
  onSubtaskChange: (id: number, value: string) => void;
  onSubmit: (data: Omit<Task, "id" | "created_at">) => void;
};

export const TaskFormUI: FC<TaskFormUIProps> = ({
  task,
  isEditing,
  // titleRef,
  // descriptionRef,
  // subtasksRefs,
  onInputChange,
  onSubtaskAdd,
  onSubtaskDelite,
  onSubtaskChange,
  onSubmit,
}) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="title">
        Придумайте заголовок задачи *
      </label>
      <textarea
        id="title"
        name="title"
        value={task?.title}
        placeholder="Заголовок задачи"
        className={styles.textareaTitle}
        onChange={(e) => onInputChange("title", e.target.value)}
        required
        // ref={titleRef}
      />
      <label className={styles.label} htmlFor="description">
        Придумайте описание задачи
      </label>
      <textarea
        id="description"
        name="description"
        value={task?.description}
        placeholder="Описание задачи"
        className={styles.textareaDescription}
        onChange={(e) => onInputChange("description", e.target.value)}
        // ref={descriptionRef}
      />
      <label className={styles.label} htmlFor="priorityGroup">
        Выберите приоритет *
      </label>
      <div id="priorityGroup" className={styles.priorityGroup}>
        {["высокий", "средний", "низкий", "без приоритета"].map((label) => (
          <label
            key={label}
            className={task?.priority === label ? styles.active : ""}
          >
            <input
              type="radio"
              name="priority"
              value={label}
              checked={task?.priority === label}
              onChange={() => onInputChange("priority", label)}
              className={styles.radioInput}
            />
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </label>
        ))}
      </div>
      <label className={styles.label} htmlFor="dateContainer">
        Выберите период активности задачи
      </label>
      <div id="dateContainer" className={styles.dateContainer}>
        <label htmlFor="startDate">дата начала:</label>
        <input
          id="startDate"
          type="date"
          value={task?.start_date || ""}
          className={styles.formDate}
          onChange={(e) => onInputChange("start_date", e.target.value)}
        />
        <label htmlFor="endDate">дата окончания:</label>
        <input
          id="endDate"
          type="date"
          value={task?.end_date || ""}
          className={styles.formDate}
          onChange={(e) => onInputChange("end_date", e.target.value)}
        />
      </div>
      <div className={styles.subtasksContainer}>
        <label className={styles.label} htmlFor="subtasks">
          Создайте список подзадач
        </label>
        <button type="button" className={styles.buttonForm} onClick={onSubtaskAdd}>
          +
        </button>
      </div>
      {task?.subtasks?.map((subtask, index) => (
        <div
          id="subtasks"
          key={subtask.id}
          className={styles.buttonSubtaskContainer}
        >
          <textarea
            name="subtasks"
            value={subtask.title}
            placeholder={`подзадача ${index + 1}`}
            className={styles.textareaSubtask}
            onChange={(e) => onSubtaskChange(subtask.id, e.target.value)}
            required
            // ref={(e) => {
            //   if (subtasksRefs.current) {
            //     subtasksRefs.current[index] = e;
            //   }
            // }}
          />
          <button
            type="button"
            className={styles.buttonFormDelite}
            onClick={(e) => onSubtaskDelite(subtask.id, e)}
          >
            <CgCloseR size={20} />
          </button>
        </div>
      ))} 

      <button type="submit" className={styles.buttonSubmit}>
        {isEditing ? "Изменить" : "Создать"}
      </button>
    </form>
  );
};
