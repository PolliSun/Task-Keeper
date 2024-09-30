import { useEffect } from "react";
import { useDispatch } from "../services/store";
import { setTasks } from "../services/slices/toDoSlice";
import {
  getTasksFromStorage,
  saveTasksToStorage,
} from "../utils/tasksStorage";
import { TToDo } from "../types/type";

export const useTasksStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = getTasksFromStorage();
    dispatch(setTasks(savedTasks));
  }, [dispatch]);

  const saveTasks = (tasks: TToDo[]) => {
    saveTasksToStorage(tasks);
  };

  return { saveTasks };
};
