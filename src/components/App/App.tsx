import React, { FC } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { EditNote } from "../../pages/edit-note";
import { CreateNote } from "../../pages/create-note";
import { Calendar } from "../../pages/calendar";
import { NotesPage } from "../../pages/notes-page";
import { ToDoList } from "../../pages/to-do-list";
import { Modal } from "../modal/modal";
import { Header } from "../header/header";
import { NoteDetails } from "../../pages/note-details";
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
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/to-do-list" element={<ToDoList />} />
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
        </Routes>
      )}
    </div>
  );
};
