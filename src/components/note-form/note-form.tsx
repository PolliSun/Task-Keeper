import React, { FC, useState, useEffect } from "react";
import { TNote } from "../../types/type";
import styles from "./note-form.module.css";

type NoteFormProps = {
  onSubmit: (note: TNote) => void;
  initialData?: TNote;
};

export const NoteForm: FC<NoteFormProps> = ({
  onSubmit,
  initialData,
}) => {

  const [note, setNote] = useState<TNote>({
    id: "",
    title: "",
    content: "",
    image: "",
    date: "",
  });

  useEffect(() => {
    if (initialData) {
      setNote(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = () => {
    const newNote: TNote = {
      ...note,
      id: note.id || Math.random().toString(),
      date: note.date || new Date().toLocaleDateString(),
    };

    onSubmit(newNote);
  };

  return (
    <div className={styles.noteForm}>
      <input
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Заголовок"
        maxLength={70}
        className={styles.formInputTitle}
      />
      <textarea
        name="content"
        value={note.content}
        onChange={handleChange}
        placeholder="Содержание"
        className={styles.textArea}
      />
      <input
        name="image"
        value={note.image}
        onChange={handleChange}
        placeholder="Вставьте URL картинки"
        className={styles.formInputImage}
      />
      <button className={styles.formButton} onClick={handleSubmit}>
        {" "}
        {initialData ? "Изменить" : "Создать"}
      </button>
    </div>
  );
};
