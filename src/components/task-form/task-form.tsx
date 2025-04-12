import React, { FC, useState, useRef, useEffect } from "react";
import { TTask } from "../../utils/types/type";
import { TaskFormUI } from "../ui/task-form/task-form";
import {
  addTaskToAPI,
  editeTask,
} from "../../services/slices/taskSlice";
import { useDispatch } from "../../services/store";
import { useNavigate } from "react-router-dom";

type FormDataValueType = string | boolean | null;

type TaskFormProps = {
  initialData?: TTask;
};

type TTaskWithoutId = Omit<TTask, "id" | "created_at">;

export const TaskForm: FC<TaskFormProps> = ({ initialData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    completed: initialData?.completed || false,
    start_date: initialData?.start_date || null,
    end_date: initialData?.end_date || null,
    status: initialData?.status || "в работе",
    priority: initialData?.priority || "без приоритета",
    subtasks: initialData?.subtasks || [],
    pinned: initialData?.pinned || false,
  });

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const subtasksRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "3.0rem";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [formData.title]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "3.5rem";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [formData.description]);

  useEffect(() => {
    subtasksRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.height = "2.3rem";
        ref.style.height = `${ref.scrollHeight}px`;
      }
    });
  }, [formData.subtasks]);

  const handleInputChange = (field: string, value: FormDataValueType) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubtaskAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const generateFourDigitId = () => Math.floor(1000 + Math.random() * 9000);
    const newSubtask = {
      id: generateFourDigitId(),
      title: "",
      completed: false,
    };
    setFormData((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, newSubtask],
    }));
    subtasksRefs.current.push(null);
  };

  const handleSubtaskDelete = (subtaskId: number, e: React.MouseEvent) => {
    e.preventDefault();
    const indexToRemove = formData.subtasks.findIndex(
      (subtask) => subtask.id === subtaskId
    );
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((subtask) => subtask.id !== subtaskId),
    }));
    subtasksRefs.current.splice(indexToRemove, 1);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], title: value };
    setFormData((prev) => ({ ...prev, subtasks: updatedSubtasks }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData?.id) {
      const updatedTask: TTask = {
        ...initialData,
        ...formData,
      };

      dispatch(editeTask(updatedTask));
      navigate(`/task/${updatedTask.id}`);
    } else {
      const taskData: TTaskWithoutId = {
        ...formData,
      };

      dispatch(addTaskToAPI(taskData));
      navigate("/");
    }
  };

  return (
    <TaskFormUI
      task={formData}
      isEditing={!!initialData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onSubtaskAdd={handleSubtaskAdd}
      onSubtaskChange={handleSubtaskChange}
      onSubtaskDelite={handleSubtaskDelete}
      titleRef={titleRef}
      descriptionRef={descriptionRef}
      subtasksRefs={subtasksRefs}
    />
  );
};
