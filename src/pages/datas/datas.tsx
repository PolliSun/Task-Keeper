import { FC } from "react";
import { DatasPageUI } from "../../components/ui/pages/second-page/second-page";

export const DatasPage: FC = () => {
 /*  const location = useLocation();

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
  
      case matchPath("/calendar/day/:id", path) !== null:
        return `Задачи на сегодняшний день`;
  
      default:
        return `Выберите задачу для просмотра или создайте новую!`;
    }
  };

  const title = getTitlePage(location.pathname); */

  return (
    <>
      <DatasPageUI />
    </>
  );
};
