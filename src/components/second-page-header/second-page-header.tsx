import React, { FC } from "react";
import { SecondPageHeaderUI } from "../ui/second-page-header/second-page-header";
import { useLocation, matchPath } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SecondPageHeader: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
