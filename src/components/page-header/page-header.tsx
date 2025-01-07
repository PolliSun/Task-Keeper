import React, { FC, useState } from "react";
import { useDispatch } from "../../services/store";
import { setFilter, sortTasks } from "../../services/slices/taskSlice";
import { PageHeaderUI } from "../ui/page-header/page-header";
import { RootState, useSelector } from "../../services/store";

export const PageHeader: FC = () => {
  const dispatch = useDispatch();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSortClick = () => {
    setIsSortOpen((prev) => !prev);
  };

  const handleSortSelect = (sortBy: "date" | "alphabet" | "priority") => {
    dispatch(sortTasks(sortBy));
    setIsSortOpen(false);
  };

  const handleFilterChange = (
    sortBy: "favorites" | "overdue" | "search" | "all"
  ) => {
    dispatch(setFilter(sortBy));
    /*         setSearchTerm("");
        setIsSearchVisible(false); */
  };

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
    <PageHeaderUI
      title={title}
      tasks={tasksToDisplay}
      noTasksTitle={noTasksTitle}
      onSortClick={handleSortClick}
      onSortSelect={handleSortSelect}
      isSortOpen={isSortOpen}
      onFilterSelect={handleFilterChange}
      activeFilter={activeFilter}
    />
  );
};
