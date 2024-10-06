import React, { FC } from "react";
import { TaskFormUI } from "../../components/ui/task-form/task-form";
import { TTask } from "../../types/type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { addTask } from "../../services/slices/toDoSlice";

export const CreateTask: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveDoing = (newTasks: TTask) => {
    dispatch(addTask(newTasks));
    navigate("/to-do-page");
  };

  return <TaskFormUI onSubmit={handleSaveDoing} />;
};
