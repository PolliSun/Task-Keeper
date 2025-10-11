import { FC } from "react";
import { TaskStatusUI } from "../ui/task-status/task-status";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { SlStar } from "react-icons/sl";
import { FaRegCirclePause } from "react-icons/fa6";
import { IconType } from "react-icons";

type TaskStatusProps = {
  status: string;
  displayMode?: "icon" | "text";
};

export const TaskStatus: FC<TaskStatusProps> = ({
  status,
  displayMode = "text",
}) => {
  let colorStyle = "";
  let icon: IconType | undefined;

  switch (status) {
    case "просрочена":
      colorStyle = "#dc2626";
      icon = BsExclamationCircle;
      break;
    case "выполнена":
      colorStyle = "#16a34a";
      icon = FaRegCircleCheck;
      break;
    case "в работе":
      colorStyle = "#2563eb";
      icon = FaRegClock;
      break;
    case "новая":
      colorStyle = "#e7a70f";
      icon = SlStar;
      break;
    case "отложена":
      colorStyle = "#dc2626";
      icon = FaRegCirclePause;
      break;
  }

  if (displayMode === "icon") {
    return <TaskStatusUI color={colorStyle} icon={icon} />;
  }

  if (displayMode === "text") {
    return <TaskStatusUI status={status} />;
  }

  return <TaskStatusUI status={status} color={colorStyle} icon={icon} />;
};
