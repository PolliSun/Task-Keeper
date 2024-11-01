import React, { FC, useState, useEffect  } from "react";
import { TaskCardUI } from "../ui/task-card/task-card";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { toggleTaskStatus, updateRemainingTime, pinTask } from "../../services/slices/toDoSlice";
import { TTask } from "../../types/type";

type TaskCardProps = {
  task: TTask;
  onClick: () => void;
};

export const TaskCard: FC<TaskCardProps> = ({task, onClick}) => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleTask = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };

  const handlePinTask = () => {
    dispatch(pinTask(task.id));
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
        const newTime = Math.max(0, prev - 1);
        dispatch(updateRemainingTime({ id: task.id, remainingTime: newTime }));

        if (newTime <= 0) {
          clearInterval(timer);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [task, dispatch, id, remainingTime]);

  const formatTimeDisplay = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '00:00:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60; 
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!task) {
    return <div>Задача не найдена</div>;
  }

  return (
    <TaskCardUI
      task={task}
      onToggle={handleToggleTask}
      onClick={onClick}
      remainingTime={formatTimeDisplay(remainingTime)} 
      onPin={handlePinTask}
    />
  );
};
