import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home } from "../../pages/home";
import { EditNote } from "../../pages/edit";
import { CreateNote } from "../../pages/create";
import { Calendar } from "../../pages/calendar";
import { Notes } from "../../pages/noteList";
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
        <Route path="/notes" element={<Notes />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/to-do-list" element={<ToDoList />} />
        <Route path="/notes/create" element={<CreateNote />} />
        <Route path="/notes/edit/:id" element={<EditNote />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/create"
            element={
              <Modal title="Добавить заметку" onClose={() => navigate("/notes")}>
                <CreateNote />
              </Modal>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Modal title="Отредактировать заметку" onClose={() => navigate("/notes")}>
                <EditNote />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
