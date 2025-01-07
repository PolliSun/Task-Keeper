import React, { FC, useCallback, memo, useState } from "react";
import { TaskDetailsUI } from "../ui/task-details/task-details";
import { useDispatch } from "../../services/store";
import { RootState, useSelector } from "../../services/store";
import {
  deliteTask,
  toggleTaskStatus,
  toggleSubtaskStatus,
  pinTask,
} from "../../services/slices/taskSlice";
import { useParams, useNavigate } from "react-router-dom";

export const TaskDetails: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const taskData = tasks.find((i) => i.id === parseInt(id || ""));
  const dispatch = useDispatch();

  console.log(taskData?.status);

  const handleDeleteTask = useCallback(
    (id: number) => {
      dispatch(deliteTask(id));
      navigate("/");
    },
    [dispatch]
  );

  const handlePin = useCallback(() => {
    if (taskData) {
      dispatch(pinTask(taskData.id));
    }
  }, [dispatch, taskData]);

  const handleSubtaskToggle = useCallback(
    (taskId: number, subtaskId: number, completed: boolean) => {
      dispatch(toggleSubtaskStatus({ taskId, subtaskId, completed }));
    },
    [dispatch]
  );

  const handleStatusChange = (newStatus: string) => {
    if (taskData) {
      dispatch(toggleTaskStatus({ taskId: taskData.id, newStatus }));
    }
  };

  const handleEditTask = useCallback(() => {
    if (taskData) {
      navigate(`/task/${taskData.id}/edit`, {
        state: { initialData: taskData },
      });
    }
  }, [navigate, taskData]);

  if (!taskData) return <p>Задача не найдена</p>;

  const isTaskOverdue = (endDate: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskEndDate = new Date(endDate);
    taskEndDate.setHours(0, 0, 0, 0);

    return taskEndDate < today;
  };

  const isOverdue =
    isTaskOverdue(taskData.endDate) &&
    taskData.status !== "выполнен" &&
    taskData.status !== "новый";

  return (
    <>
      <TaskDetailsUI
        task={taskData}
        isOverdue={isOverdue}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
        onToggle={handleSubtaskToggle}
        onPin={handlePin}
        onEditTask={handleEditTask}
      />
    </>
  );
};
