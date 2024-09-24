import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home } from "../../pages/home";
import { EditNote } from "../../pages/edit";
import { CreateNote } from "../../pages/create";
import { Calendar } from "../../pages/calendar";
import { ToDoList } from "../../pages/toDoList";
import { Modal } from "../Modal/Modal";
import { Header } from "../Header/Header";
import styles from './app.module.css'


export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/to-do-list" element={<ToDoList />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/create"
            element={
              <Modal onClose={() => navigate(-1)}>
                <CreateNote />
              </Modal>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Modal onClose={() => navigate(-1)}>
                <EditNote />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
