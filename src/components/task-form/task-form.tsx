import React, { FC, useState, useRef, useEffect } from "react";
import { TTask } from "../../types/type";
import { TaskFormUI } from "../ui/task-form/task-form";
import {
  addSubtask,
  addTaskToAPI,
  deliteSubtask,
  /*   editTask, */
} from "../../services/slices/taskSlice";
import { useDispatch } from "../../services/store";
import { useNavigate } from "react-router-dom";

type TaskFormProps = {
  initialData?: TTask;
};

type TTaskWithoutId = Omit<TTask, "id">;

export const TaskForm: FC<TaskFormProps> = ({ initialData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialData?.title || "");
  /* const [title, setTitle] = useState<string>(''); */
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [start_date, setStartDate] = useState(initialData?.start_date || "");
  const [end_date, setEndDate] = useState(initialData?.end_date || "");
  const [status, setStatus] = useState(initialData?.status || "в работе");
  const [priority, setPriority] = useState(
    initialData?.priority || "без приоритета"
  );
  const [subtasks, setSubtasks] = useState<{ id: number; title: string }[]>(
    initialData?.subtasks || []
  );
  const [pinned, setPinned] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const subtasksRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "3.0rem";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "3.5rem";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [description]);

  useEffect(() => {
    subtasksRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.height = "2.3rem";
        ref.style.height = `${ref.scrollHeight}px`;
      }
    });
  }, [subtasks]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
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
    const generateFourDigitId = () => Math.floor(1000 + Math.random() * 9000);
    const newSubtask = {
      id: generateFourDigitId(),
      title: "",
    };
    setSubtasks([...subtasks, newSubtask]);
    subtasksRefs.current.push(null);
    if (initialData?.id) {
      dispatch(addSubtask({ taskId: initialData.id, subtask: newSubtask }));
    }
  };

  const handleSubtaskDelete = (subtaskId: number) => {
    const indexToRemove = subtasks.findIndex(
      (subtask) => subtask.id === subtaskId
    );
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((subtask) => subtask.id !== subtaskId)
    );
    subtasksRefs.current.splice(indexToRemove, 1);
    if (initialData?.id) {
      dispatch(deliteSubtask({ taskId: initialData.id, subtaskId }));
    }
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], title: value };
    setSubtasks(updatedSubtasks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData?.id) {
      const taskData: TTask = {
        ...initialData,
        title,
        description,
        created_at: new Date().toISOString(),
        completed: completed,
        pinned,
        status,
        start_date,
        end_date,
        priority,
        subtasks,
      };

      /*     if (initialData?.id) {
      dispatch(editTask(taskData));
    } else { */
      /*       dispatch(addTaskToAPI(taskData)); */
      /*     } */

      navigate(-1);
    } else {
      // For new task, create without ID (Supabase will generate it)
      const taskData: TTaskWithoutId = {
        title,
        description,
        created_at: new Date().toISOString(),
        completed,
        pinned,
        status,
        start_date,
        end_date,
        priority,
        subtasks,
      };

      dispatch(addTaskToAPI(taskData as TTask));
      navigate(-1);
    }
  };

  return (
    <TaskFormUI
      task={{
        title,
        description,
        start_date,
        status,
        end_date,
        priority,
        subtasks,
      }}
      isEditing={!!initialData}
      onTitleChange={handleTitleChange}
      onStartDateChange={handleStartDateChange}
      onEndDateChange={handleEndDateChange}
      onPriorityChange={handlePriorityChange}
      onSubmit={handleSubmit}
      onSubtaskAdd={handleSubtaskAdd}
      onSubtaskChange={handleSubtaskChange}
      onSubtaskDelite={handleSubtaskDelete}
      onDescriptionChange={handleDescriptionChange}
      titleRef={titleRef}
      descriptionRef={descriptionRef}
      subtasksRefs={subtasksRefs}
    />
  );
};
