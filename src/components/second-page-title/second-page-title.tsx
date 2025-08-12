import { FC } from "react";
import { SecondPageTitleUI } from "../ui/second-page-title/second-page-title";
import { matchPath, useLocation } from "react-router-dom";

export const SecondPageTitle: FC = () => {
  const location = useLocation();
  const matchDay = matchPath("/calendar/day/:id", location.pathname);

  const getTitlePage = (path: string): string => {
    switch (true) {
      case path === "/create":
        return `Создание задачи`;

      case path === "/calendar":
        return `Календарь`;

      case path === "/faq":
        return `Страница вопросов`;

      case matchPath("/task/:id", path) !== null:
        return `Детали задачи`;

      case matchPath("/task/:id/edit", path) !== null:
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
