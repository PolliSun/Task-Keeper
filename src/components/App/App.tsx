import React, { FC } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { EditNote } from "../note-form-edit/edit-note";
import { CreateNote } from "../note-form-create/create-note";
import { CreateTask } from "../task-form-create/create-task";
import { NotesPage } from "../../pages/notes-page";
import { TasksPage } from "../../pages/tasks-page";
import { CalendarPage } from "../../pages/calendar-page";
import { Modal } from "../modal/modal";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { NoteDetails } from "../note-details/note-details";
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
        <Route path="/notes-page" element={<NotesPage />} />
        <Route path="/to-do-page" element={<TasksPage />} />
        <Route path="/calendar-page" element={<CalendarPage />} />
        <Route path="/notes-page/create-note" element={<CreateNote />} />
        <Route path="/notes-page/edit/:id" element={<EditNote />} />
        <Route path="/notes-page/:id" element={<NoteDetails />} />
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
                <CreateNote />
              </Modal>
            }
          />
          <Route
            path="/notes-page/edit/:id"
            element={
              <Modal
                title="Отредактировать заметку"
                onClose={() => navigate(-1)}
              >
                <EditNote />
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
            path="/to-do-list/create-task"
            element={
              <Modal
                title="Добавить задачу"
                onClose={() => navigate("/to-do-page")}
              >
                <CreateTask />
              </Modal>
            }
          />
        </Routes>
      )}
      <Footer />
    </div>
  );
};
