import { FirstPageTitleUI } from "../ui/first-page-title/first-page-title";
import { FC, useState } from "react";
import { useTasksContext } from "../../contexts/TaskContext";

export const FirstPageTitle: FC = () => {
  const { sortedTasks, tasks, filter, searchTerm, setSearchTerm } =
    useTasksContext();
  const [isSearch, setIsSearch] = useState(false);

  const toggleSearch = () => {
    if (isSearch) {
      setSearchTerm("");
    }
    setIsSearch(!isSearch);
  };

  const totalTasks = tasks.length;

  let title = "";
  let noTasksTitle = "";

  if (searchTerm.trim()) {
    title = `По вашему запросу "${searchTerm}" найдено ${sortedTasks.length} задач(и) из ${totalTasks}`;
    noTasksTitle = `По вашему запросу "${searchTerm}" ничего не найдено.`;
  } else {
    switch (filter) {
      case "favorites":
        title = `Избранные задачи: ${sortedTasks.length} из ${totalTasks}`;
        noTasksTitle = "У вас нет избранных задач.";
        break;
      case "overdue":
        title = `Просроченые задачи: ${sortedTasks.length} из ${totalTasks}`;
        noTasksTitle = "У вас нет просроченных задач.";
        break;
      default:
        title = `Ваши задачи: выполнено ${
          tasks.filter((task) => task.status === "выполнена").length
        } из ${totalTasks}`;
        noTasksTitle = "Добавьте задачи, чтобы начать!";
        break;
    }
  }

  return (
    <FirstPageTitleUI
      title={title}
      tasks={sortedTasks}
      noTasksTitle={noTasksTitle}
      isSearch={isSearch}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      toggleClickSearch={toggleSearch}
    />
  );
};
