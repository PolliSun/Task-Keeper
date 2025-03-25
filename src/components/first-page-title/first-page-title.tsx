import { FirstPageTitleUI } from "../ui/first-page-title/first-page-title";
import { FC } from "react";
import { RootState, useSelector } from "../../services/store";

export const FirstPageTitle: FC = () => {
  const { tasks, searchResults, searchTerm, filter } = useSelector(
    (state: RootState) => state.tasks
  );

  const totalTasks = tasks.length;
  const isTaskOverdue = (end_date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskEndDate = new Date(end_date);
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
          (task) => isTaskOverdue(task.end_date) && task.status !== "выполнена"
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
          tasks.filter((task) => task.status === "выполнена").length
        } из ${totalTasks}`;
        noTasksTitle = "Добавьте задачи, чтобы начать!";
        break;
    }

    return { tasks: filteredTasksData, title, noTasksTitle };
  };

  const { tasks: tasksToDisplay, title, noTasksTitle } = filteredTasks();

  return (
    <FirstPageTitleUI
      title={title}
      tasks={tasksToDisplay}
      noTasksTitle={noTasksTitle}
    />
  );
};
