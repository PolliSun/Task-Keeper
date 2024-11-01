import React, { FC, useState, useEffect } from "react";
import { TaskDetailsUI } from "../ui/task-details/task-details";
import { useDispatch, useSelector } from "../../services/store";
import {
  deliteTask,
  updateRemainingTime,
  pinTask,
  toggleTaskStatus,
} from "../../services/slices/toDoSlice";
import { TTask } from "../../types/type";

type TaskDetailsLogicProps = {
  task: TTask;
};

export const TaskDetails: FC<TaskDetailsLogicProps> = ({ task }) => {
  const dispatch = useDispatch();
  const handlePinTask = () => {
    dispatch(pinTask(task.id));
  };

  const handleToggleTask = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    if (task) {
      const initialTime = Number(task.remainingTime || task.timer) || 0;
      setRemainingTime(initialTime);
    }
  }, [task]);

  useEffect(() => {
    if (!task || task.status || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = Math.max(0, prev - 60);
        dispatch(updateRemainingTime({ id: task.id, remainingTime: newTime }));

        if (newTime <= 0) {
          clearInterval(timer);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [task, dispatch, remainingTime]);

  const formatTimeDisplay = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "00:00:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deliteTask(id));
  };

  if (!task) {
    return <div>Выберите задачу для просмотра.</div>;
  }

  return (
    <TaskDetailsUI
      task={task}
      remainingTime={formatTimeDisplay(remainingTime)} 
      onDelete={handleDeleteTask}
      onToggle={handleToggleTask}
    />
  );
};
