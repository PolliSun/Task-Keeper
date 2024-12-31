import React, { FC, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { Header } from "../header/Header";
import { useDispatch } from "../../services/store";

import styles from "./app.module.css";
import { Calendar } from "../calendar/calendar";
import { TaskForm } from "../task-form/task-form";
import { getTasksFromStorage } from "../../utils/tasksStorage";
import { setTasks } from "../../services/slices/taskSlice";
import { ModalUI } from "../ui/modal/modal";
import { TaskDetails } from "../task-details/task-details";
import { EditPage } from "../edit-page/edit-page";

export const App: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    const tasks = getTasksFromStorage();
    dispatch(setTasks(tasks));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <ModalUI>
        <Routes location={location}>
          <Route path="/" element={<ModalUI />} />
          <Route path="/faq" element={<HomePage />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calendar/day/:id" element={<Calendar />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/task/:id/edit" element={<EditPage />} />
        </Routes>
      </ModalUI>
    </div>
  );
};
