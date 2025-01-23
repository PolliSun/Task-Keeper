import React, { FC } from "react";
import { TaskStatusUI } from "../ui/task-status/task-status";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";

type TaskStatusProps = {
  status: "просрочена" | "выполнена" | "в работе";
  displayMode?: "icon" | "text";
  endDate: string;
};

export const TaskStatus: FC<TaskStatusProps> = ({
  status,
  displayMode = "text",
  endDate,
}) => {
  const isTaskOverdue = (endDate: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskEndDate = new Date(endDate);
    taskEndDate.setHours(0, 0, 0, 0);

    return taskEndDate < today;
  };

  const isOverdue = isTaskOverdue(endDate) && status !== "выполнена";

  let colorStyle = "";
  let icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;

  if (isOverdue) {
    status = "просрочена";
    colorStyle = "#dc2626";
    icon = BsExclamationCircle;
  } else {
    switch (status) {
      case "выполнена":
        colorStyle = "#16a34a";
        icon = FaRegCircleCheck;
        break;
      case "в работе":
        colorStyle = "#2563eb";
        icon = FaRegClock;
        break;
    }
  }

  if (displayMode === "icon") {
    return <TaskStatusUI color={colorStyle} icon={icon} />;
  }

  if (displayMode === "text") {
    return <TaskStatusUI status={status} />;
  }

  return <TaskStatusUI status={status} color={colorStyle} icon={icon} />;
};
