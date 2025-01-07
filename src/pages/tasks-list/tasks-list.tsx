import React, { FC } from "react";
import { RootState, useSelector } from "../../services/store";
import { TasksListUI } from "../../components/ui/pages/tasks-list/tasks-list";

export const TasksPage: FC = () => {
  const { tasks, searchResults, searchTerm, filter } = useSelector(
    (state: RootState) => state.tasks
  );
  const totalTasks = tasks.length;
  const isTaskOverdue = (endDate: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskEndDate = new Date(endDate);
    taskEndDate.setHours(0, 0, 0, 0);

    return taskEndDate < today;
  };

  const filteredTasks = () => {
    let filteredTasksData;
    let title = "";
    let noTasksTitle = "";

    switch (filter) {
      case "favorites":
        filteredTasksData = tasks.filter((task) => task.pinned);
        title = `Избранные задачи: ${filteredTasksData.length} из ${totalTasks}`;
        noTasksTitle = "У вас нет избранных задач.";
        break;
      case "overdue":
        filteredTasksData = tasks.filter(
          (task) =>
            isTaskOverdue(task.endDate) &&
            task.status !== "выполнен" &&
            task.status !== "новый"
        );
        title = `Просроченые задачи: ${filteredTasksData.length} из ${totalTasks}`;
        noTasksTitle = "У вас нет просроченных задач.";
        break;
      case "search":
        filteredTasksData = searchResults;
        if (searchTerm.trim() === "") {
          title = "";
          noTasksTitle = "Начните вводить текст для поиска...";
        } else if (searchResults.length > 0) {
          title = `Найдено задач по вашему запросу "${searchTerm}": ${searchResults.length} из ${totalTasks}`;
          noTasksTitle = "";
        } else {
          title = "";
          noTasksTitle = `По вашему запросу "${searchTerm}" ничего не найдено.`;
        }
        break;
      default:
        filteredTasksData = tasks;
        title = `Ваши задачи: выполнено ${
          tasks.filter((task) => task.status === "выполнен").length
        } из ${totalTasks}`;
        noTasksTitle = "Добавьте задачи, чтобы начать!";
        break;
    }

    return { tasks: filteredTasksData, title, noTasksTitle };
  };

  const { tasks: tasksToDisplay, title, noTasksTitle } = filteredTasks();

  return (
    <>
      <TasksListUI
/*         title={title} */
        tasks={tasksToDisplay}
/*         noTasksTitle={noTasksTitle} */
      />
    </>
  );
};
