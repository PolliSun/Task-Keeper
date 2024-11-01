import React, { FC } from "react";
import { TaskPriorityUI } from "../ui/task-priority/task-priority";

type TaskPriorityProps = {
  priority: "high" | "medium" | "low" | "none";
};

export const TaskPriority: FC<TaskPriorityProps> = ({ priority }) => {
  let buttonStyle = "";
  switch (priority) {
    case "high":
            buttonStyle = "#ef282863";
            break;
        case "medium":
            buttonStyle = "#ffae0063";
            break;
        case "low":
            buttonStyle = "#00800063";
            break;
        case "none":
            buttonStyle = "transparent";
            break;
  }

  return <TaskPriorityUI backgroundColor={buttonStyle} />;
};
