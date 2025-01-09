import React, { FC, memo, useEffect, useState } from "react";
import { TaskCardUI } from "../ui/task-card/task-card";
import { TTask } from "../../types/type";

type TaskCardProps = {
  task: TTask;
};

export const TaskCard: FC<TaskCardProps> = memo(({ task }) => {
  const pinned = task.pinned ? "избранный" : null;

  if (!task) return null;

  const isTaskOverdue = (endDate: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskEndDate = new Date(endDate);
    taskEndDate.setHours(0, 0, 0, 0);

    return taskEndDate < today;
  };

  const isOverdue =
    isTaskOverdue(task.endDate) &&
    task.status !== "выполнен" &&
    task.status !== "новый";
  const status = task.status;

  return (
    <TaskCardUI
      task={{
        ...task,
        status,
      }}
      // pinned={pinned}
      isOverdue={isOverdue}
    />
  );
});
