import React, { FC } from "react";
import { TToDo } from "../../types/type";
import styles from "./to-do-card.module.css";
import basket from "../../images/basket.svg";

type ToDoCardUIProps = {
  task: TToDo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export const ToDoCardUI: FC<ToDoCardUIProps> = ({ task, onDelete, onToggle }) => {
  return (
    <div className={styles.card}>
      <div className={styles.dataContainer}>
        <label className={styles.customCheckboxContainer}>
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => onToggle(task.id)}
            className={styles.hiddenCheckbox}
          />
          <span className={styles.customCheckbox}></span>
        </label>
        <span className={`${styles.title} ${task.status ? styles.completed : ''}`}>{task.title}</span>
      </div>
      <button className={styles.button} onClick={() => onDelete(task.id)}>
        <img
          src={basket}
          alt="иконка удаления заметки"
          className={styles.basket}
        />
      </button>
    </div>
  );
};
