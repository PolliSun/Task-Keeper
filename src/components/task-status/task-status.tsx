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
    case "просрочен":
      colorStyle = "#ff7777";
      break;
    case "новый":
      colorStyle = "#ea580c";
      break;
  }

  return <TaskStatusUI status={status} color={colorStyle} />;
};
