import { useParams } from "react-router-dom";
import { RootState, useSelector } from "../../services/store";
import { TaskForm } from "../task-form/task-form";
import { FC } from "react";

export const EditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const taskData = tasks.find((task) => task.id === parseInt(id || ""));

  if (!taskData) {
    return <p>Задача не найдена</p>;
  }

  return <TaskForm initialData={taskData} />;
};