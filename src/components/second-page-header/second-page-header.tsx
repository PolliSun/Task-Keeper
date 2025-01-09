import React, { FC } from "react";
import { SecondPageHeaderUI } from "../ui/second-page-header/second-page-header";
import { useLocation, matchPath } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SecondPageHeader: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleCloseClick = () => {
    navigate("/");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const isDisabled = location.pathname === "/";

  const title = getTitlePage(location.pathname);
  return (
    <SecondPageHeaderUI
      title={title}
      onClose={handleCloseClick}
      onBack={handleBackClick}
      isDisabled={isDisabled}
    />
  );
};
