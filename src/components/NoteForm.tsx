import React, { useState } from "react";
import { TNote } from "../types/type";

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

  const handleSubmit = () => {
    const newNote: TNote = {
      id: Math.random().toString(),
      title,
      content,
      image,
      date: new Date().toLocaleDateString(),
    };
    onSubmit(newNote);
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Дайте заголовок"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Придумайте креативное описание"
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Вставьте URL картинки"
      />
      <button onClick={handleSubmit}>Сохранить</button>
    </div>
  );
};
