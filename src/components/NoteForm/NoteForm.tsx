import React, { useState, useEffect } from "react";
import { TNote } from "../../types/type";
import styles from './noteform.module.css';

type NoteFormProps = {
  onSubmit: (note: TNote) => void;
  initialData?: TNote;
};

export const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [id, setId] = useState(initialData?.id || "");
  const [date, setDate] = useState(initialData?.date || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setImage(initialData.image);
      setId(initialData.id);
      setDate(initialData.date);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const newNote: TNote = {
      id: initialData ? initialData.id : Math.random().toString(),
      title,
      content,
      image,
      date: initialData ? initialData.date : new Date().toLocaleDateString(),
    };
    onSubmit(newNote);
  };

  return (
    <div className={styles.noteForm}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        maxLength={25}
        className={styles.formInputTitle}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Содержание"
        className={styles.textArea}
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Вставьте URL картинки"
        className={styles.formInputImage}
      />
      <button className={styles.formButton}
        onClick={handleSubmit}> {initialData ? "Изменить" : "Создать"}</button>
    </div>
  );
};
