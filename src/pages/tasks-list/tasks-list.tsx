import React, { FC } from "react";
import { TaskCard } from "../../components/task-card/task-card";
import { RootState, useSelector } from "../../services/store";
import { TasksListUI } from "../../components/ui/pages/tasks-list/tasks-list";

export const TasksPage: FC = () => {
  const { tasks, searchResults, searchTerm, filter } = useSelector(
    (state: RootState) => state.tasks
  );
  const totalTasks = tasks.length;

  const filteredTasks = () => {
    let filteredTasksData;
    let title = "";

    switch (filter) {
      case "favorites":
        filteredTasksData = tasks.filter((task) => task.pinned);
        title = `Избранные задачи: ${filteredTasksData.length} из ${totalTasks}`;
        break;
      case "completed":
        filteredTasksData = tasks.filter((task) => task.status === "выполнен");
        title = `Ваши задачи: выполнено ${filteredTasksData.length} из ${totalTasks}`;
        break;
      case "search":
        filteredTasksData = searchResults;
        title = searchResults.length > 0
          ? `Найдено задач: ${searchResults.length} из ${totalTasks}`
          : `Задачи по вашему запросу "${searchTerm}" не найдены.`;
        break;
      default:
        filteredTasksData = tasks;
        title = `Ваши задачи: выполнено ${tasks.filter((task) => task.status === "выполнен").length} из ${totalTasks}`;
        break;
    }

    return { tasks: filteredTasksData, title };
  };

  const { tasks: tasksToDisplay, title } = filteredTasks();
  
  return (
    <>
      <TasksListUI 
      title={title}
      tasks={tasksToDisplay}
      // filter={filter}
      />
    </>
  );
};
