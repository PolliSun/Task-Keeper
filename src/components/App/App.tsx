import React, { FC } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { NoteList } from "../note-list/note-list";
import { NoteHeader } from "../note-header/note-header";
import { Notes } from "../../pages/notes/notes";
import { Tasks } from "../../pages/tasks/tasks";
import { Calendar } from "../../pages/calendar/calendar";
import { Modal } from "../modal/modal";
import { Header } from "../header/Header";
import { Footer } from "../ui/footer/footer";
import { NoteDetails } from "../note-details/note-details";
import { TaskHeader } from "../task-header/task-header";

import styles from "./app.module.css";

export const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes-page" element={<Notes />} />
        <Route path="/task-page" element={<Tasks />} />
        <Route path="/calendar-page" element={<Calendar />} />
        <Route path="/notes-page/create-note" element={<NoteHeader />} />
        <Route path="/notes-page/edit-note/:id" element={<NoteList />} />
        <Route path="/notes-page/:id" element={<NoteDetails />} />
        <Route path="/task-list/create-task" element={<TaskHeader />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/notes-page/create-note"
            element={
              <Modal
                title="Добавить заметку"
                onClose={() => navigate("/notes-page")}
              >
                <NoteHeader />
              </Modal>
            }
          />
          <Route
            path="/notes-page/edit-note/:id"
            element={
              <Modal
                title="Отредактировать заметку"
                onClose={() => navigate(-1)}
              >
                <NoteList />
              </Modal>
            }
          />
          <Route
            path="/notes-page/:id"
            element={
              <Modal
                title="Детали заметки"
                onClose={() => navigate("/notes-page")}
              >
                <NoteDetails />
              </Modal>
            }
          />
          <Route
            path="/task-list/create-task"
            element={
              <Modal
                title="Добавить задачу"
                onClose={() => navigate("/task-page")}
              >
                <TaskHeader />
              </Modal>
            }
          />
        </Routes>
      )}
      <Footer />
    </div>
  );
};
