import React, { FC } from "react";
import { ToDoForm } from "../components/to-do-form/to-do-form";
import { TToDo } from "../types/type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../services/store";
import { addTask } from "../services/slices/toDoSlice";

export const CreateDoing: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveDoing = (newTasks: TToDo) => {
    dispatch(addTask(newTasks));
    navigate("/to-do-page");
  };

  return <ToDoForm onSubmit={handleSaveDoing} />;
};
