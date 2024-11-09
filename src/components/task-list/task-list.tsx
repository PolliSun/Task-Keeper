import React, { FC, useState } from "react";
import { TasksListUI } from "../ui/pages/tasks-list/tasks-list";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { addTask, sortTasks } from "../../services/slices/taskSlice";
import { TTask } from "../../types/type";
import { TaskHeader } from "../task-header/task-header";

type TaskListProps = {
  tasks: TTask[];
};

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const searchResults = useSelector(
    (state: RootState) => state.tasks.searchResults
  );
  const isSearching = useSelector(
    (state: RootState) => state.tasks.isSearching
  );
  const dispatch = useDispatch();

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) || null;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "выполнен" ).length;
  
  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
    setShowCreateForm(false);
    setIsCreateActive(false);
    setIsFavoritesVisible(false);
  };

  const handleCreateTaskClick = () => {
    setIsCreateActive((prev) => {
      const newState = !prev;
      setShowCreateForm(newState);
      return newState;
    });
    setSelectedTaskId(null);
  };

  const handleSaveTask = (newTask: TTask) => {
    dispatch(addTask(newTask));
    setShowCreateForm(false);
  };

  const handleCloseTask = () => {
    setSelectedTaskId(null);
    setShowCreateForm(false);
    setIsCreateActive(false);
  };

  const handleFavoritesClick = () => {
    setIsFavoritesVisible((prev) => !prev);
  }

  const filteredTasks = isFavoritesVisible
    ? tasks.filter((task) => task.pinned) 
    : tasks;

  return (
    <>
      <TaskHeader
        onCreateTask={handleCreateTaskClick}
        isCreateActive={isCreateActive}
        onFavoritesClick={handleFavoritesClick}
        isFavoritesVisible={isFavoritesVisible}
      />
      <TasksListUI
        onClickCreateTask={handleCreateTaskClick}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        title={
          isSearching && searchResults.length === 0
            ? "Нет задач по вашему запросу."
            : isSearching && searchResults.length > 0
            ? "Задачи по вашему запросу:"
            : tasks.length === 0
            ? "Сейчас у вас нет задач, давайте создадим их!"
            : "Ваши задачи:"
        }
        titleData={
          selectedTask
            ? "Детали задачи:"
            : showCreateForm
            ? "Создание задачи:"
            : "Выберите задачу для просмотра или создайте новую!"
        }
        tasks={isSearching ? searchResults : filteredTasks}
        selectedTask={selectedTask}
        onTaskSelect={handleSelectTask}
        onCreateTask={handleSaveTask}
        createdTask={showCreateForm}
        onClose={handleCloseTask}
      />
    </>
  );
};
