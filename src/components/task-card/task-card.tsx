import React, { FC, memo } from "react";
import { TaskCardUI } from "../ui/task-card/task-card";
import { TTask } from "../../types/type";

type TaskCardProps = {
  task: TTask;
};

export const TaskCard: FC<TaskCardProps> = memo(({ task }) => {
  const pinned = task.pinned ? "избранный" : null;

  let colorStyle = "";
  if (pinned === "избранный") {
    colorStyle = "#ff8fec";
  }

  if (!task) return null;

  return (
    <TaskCardUI
      task={{
        ...task,
        status: task.status || "в работе",
      }}
      pinned={pinned}
      color={colorStyle}
    />
  );
});
