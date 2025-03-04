import { FC } from "react";
import styles from "./task-header.module.css";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { BiQuestionMark } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";

export const TaskHeaderUI: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.buttonContainer}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.button} ${styles.buttonHome} ${
              isActive ? styles.active : ""
            }`
          }
        >
          <GrHomeRounded size={20} />
        </NavLink>
      </div>

      <div className={styles.buttonContainer}>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `${styles.button} ${styles.buttonCreate} ${
              isActive ? styles.active : ""
            }`
          }
        >
          <RiStickyNoteAddLine size={20} />
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `${styles.button} ${styles.buttonCalendar} ${
              isActive ? styles.active : ""
            }`
          }
        >
          <BiCalendar size={20} />
        </NavLink>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `${styles.button} ${styles.buttonTasks} ${
              isActive ? styles.active : ""
            }`
          }
        >
          <BiQuestionMark size={20} />
        </NavLink>
      </div>
    </header>
  );
};
