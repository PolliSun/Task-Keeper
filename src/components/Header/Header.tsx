import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { IoBookOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <a href="#" onClick={handleNavigation} className={styles.link}>
        <IoBookOutline size={40} />
        <h1 className={styles.title}>Note Keeper</h1>
      </a>
      <nav className={styles.navigation}>
        <NavLink to={"/task-page"} className={styles.navLink}>
          Задачи
        </NavLink>
        <NavLink to={"/calendar-page"} className={styles.navLink}>
          Календарь
        </NavLink>
      </nav>
    </header>
  );
};
