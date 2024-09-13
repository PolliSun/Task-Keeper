import React, { useState } from "react";
import { NoteForm } from "../components/NoteForm";
import { TNote } from "../types/type";
import { saveNotesToStorage, getNotesFromStorage } from "../utils/noteStorage";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

export const CreateNote: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const saveNote = (newNote: TNote) => {
    const savedNotes = getNotesFromStorage();
    const updatedNotes = [...savedNotes, newNote];
    saveNotesToStorage(updatedNotes);
    navigate("/");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <NoteForm onSubmit={saveNote} />
    </Modal>
  );
};
