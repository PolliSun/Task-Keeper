import React, { FC, useState } from "react";
import { TasksListUI } from "../ui/pages/tasks-list/tasks-list";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { addTask, setTasks } from "../../services/slices/toDoSlice";
import { useNavigate } from "react-router-dom";
import { TTask } from "../../types/type";

export const TaskList: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [createdTask, setCreatedTask] = useState<TTask | null>(null);
  const searchResults = useSelector(
    (state: RootState) => state.tasks.searchResults
  );
  const isSearching = useSelector(
    (state: RootState) => state.tasks.isSearching
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) || null;

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
  };

  const handleCreateTask = (newTasks: TTask) => {
    dispatch(addTask(newTasks));
    setCreatedTask(null);
    navigate("/task-page");
  };

  return (
    <TasksListUI
      title={
        isSearching && searchResults.length === 0
          ? "Нет задач по вашему запросу."
          : isSearching && searchResults.length > 0
          ? "Задачи по вашему запросу:"
          : tasks.length === 0
          ? "Сейчас у вас нет задач, давайте создадим их!"
          : undefined
      }
      tasks={isSearching ? searchResults : tasks}
      selectedTask={selectedTask}
      onTaskSelect={handleSelectTask}
      onCreateTask={handleCreateTask}
      сreatedTask={createdTask}
    />
  );
};
