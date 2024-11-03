import React, { FC, useState, useEffect, useCallback } from "react";
import { TTask } from "../../types/type";
import { TaskFormUI } from "../ui/task-form/task-form";
import { addSubtask, deliteSubtask } from "../../services/slices/taskSlice";
import { useDispatch } from "../../services/store";

type TaskFormProps = {
  onSubmit: (task: TTask) => void;
  initialData?: TTask;
};

export const TaskForm: FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialData?.title || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [priority, setPriority] = useState(
    initialData?.priority || "без приоритета"
  );
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; }[]>(
    initialData?.subtasks || []
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };
  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(e.target.value);
  };

  const handleSubtaskAdd = () => {
    const newSubtask = {
      id: Math.random().toString(),
      title: `Подзадача ${subtasks.length + 1}`,
    };
    setSubtasks([...subtasks, newSubtask]);
    if (initialData?.id) {
      dispatch(addSubtask({ taskId: initialData.id, subtask: newSubtask }));
    }
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], title: value };
    setSubtasks(updatedSubtasks);
  };

  const handleSubmit = () => {
    const newTask: TTask = {
      id: Math.random().toString(),
      title,
      date: new Date().toISOString(),
      startDate,
      endDate,
      status: false,
      priority,
      subtasks,
    };

    onSubmit(newTask);
  };

  return (
    <TaskFormUI
      task={{ title, startDate, endDate, priority, subtasks }}
      onTitleChange={handleTitleChange}
      onStartDateChange={handleStartDateChange}
      onEndDateChange={handleEndDateChange}
      onPriorityChange={handlePriorityChange}
      onSubmit={handleSubmit}
      onSubtaskAdd={handleSubtaskAdd}
      onSubtaskChange={handleSubtaskChange}
    />
  );
};
