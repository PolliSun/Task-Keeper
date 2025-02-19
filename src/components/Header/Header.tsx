import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { IoBookOutline } from "react-icons/io5";
import { searchTasks, setFilter } from "../../services/slices/taskSlice";
import { useDispatch } from "../../services/store";

export const Header: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigate("/");
    dispatch(setFilter("all"));
    dispatch(searchTasks(""));
  };

  return (
    <header className={styles.header}>
      <a href="#" onClick={handleNavigation} className={styles.link}>
        <IoBookOutline size={40} />
        <h1 className={styles.title}>Task Keeper</h1>
      </a>
    </header>
  );
};
