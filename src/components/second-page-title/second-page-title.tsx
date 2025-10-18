import { FC } from "react";
import { SecondPageTitleUI } from "../ui/second-page-title/second-page-title";
import { matchPath, useLocation } from "react-router-dom";

export const SecondPageTitle: FC = () => {
  const location = useLocation();
  const matchDay = matchPath("/dashboard/calendar/day/:id", location.pathname);

  const getTitlePage = (path: string): string => {
    switch (true) {
      case path === "/dashboard/create":
        return `Создание задачи`;

      case path === "/dashboard/calendar":
        return `Календарь`;

      case path === "/dashboard/faq":
        return `Страница вопросов`;

      case matchPath("/dashboard/task/:id", path) !== null:
        return `Детали задачи`;

      case matchPath("/dashboard/task/:id/edit", path) !== null:
        return `Редактирование задачи`;

      case matchDay !== null:
        return `Выбран день: ${matchDay.params.id} г.`;

      default:
        return `Выберите задачу для просмотра или создайте новую!`;
    }
  };

  const title = getTitlePage(location.pathname);

  return <SecondPageTitleUI title={title} />;
};
