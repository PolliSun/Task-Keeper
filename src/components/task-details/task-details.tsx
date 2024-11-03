import React, { FC, useCallback, memo } from "react";
import { TaskDetailsUI } from "../ui/task-details/task-details";
import { useDispatch } from "../../services/store";
import { deliteTask, toggleTaskStatus } from "../../services/slices/taskSlice";
import { TTask } from "../../types/type";

type TaskDetailsProps = {
  task: TTask;
};

export const TaskDetails: FC<TaskDetailsProps> = memo(({ task }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = useCallback(
    (id: string) => {
      dispatch(deliteTask(id));
    },
    [dispatch]
  );

  const handleToggle = useCallback(() => {
    dispatch(toggleTaskStatus(task.id));
  }, [dispatch, task.id]);

  if (!task) return null;

  return (
    <TaskDetailsUI
      task={task}
      onDelete={handleDeleteTask}
      onToggle={handleToggle}
    />
  );
});
