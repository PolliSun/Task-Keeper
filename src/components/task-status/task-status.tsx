import React, { FC } from "react";
import { TaskStatusUI } from "../ui/task-status/task-status";

type TaskStatusProps = {
  status: string;
};

export const TaskStatus: FC<TaskStatusProps> = ({ status }) => {
  let colorStyle = "";
  switch (status) {
    case "выполнен":
      colorStyle = "#54c154";
      break;
    case "в работе":
      colorStyle = "#4bc7ff";
      break;
    case "отложен":
      colorStyle = "#f77";
      break;
    case "новый":
      colorStyle = "#e7a70f";
      break;
  }

  return <TaskStatusUI status={status} color={colorStyle} />;
};
