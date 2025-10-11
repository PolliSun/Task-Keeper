import { FC, useState } from "react";
import { TaskFormUI } from "../../components/ui/task-form/task-form";
import { useCreateTask } from "../../utils/hooks/useTasks/useTasks";
import { Task } from "../../utils/api/taskService/taskService";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../utils/hooks/useCurretUser/useCurretUser";

export const CreateTask: FC = () => {
  const { mutateAsync } = useCreateTask();
  const { user, isLogin } = useCurrentUser();
  const navigate = useNavigate();
  type FormDataValueType = string | boolean | null;

  const [formData, setFormData] = useState<Omit<Task, "id" | "created_at">>({
    user_id: user?.userId || "",
    title: "",
    description: "",
    start_date: null,
    end_date: null,
    status: "новая",
    priority: "без приоритета",
    subtasks: [],
    pinned: false,
    archived: false,
  });

  if (!user?.userId) {
    return <div>загрузка задачи</div>;
  }

  if (!isLogin || !formData) {
    return <div>Пожалуйста, войдите в систему</div>;
  }

  const handleInputChange = (field: string, value: FormDataValueType) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubtaskChange = (id: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks?.map((subtask) =>
        subtask.id === id ? { ...subtask, title: value } : subtask
      ),
    }));
  };

  const handleSubmit = async (data: Omit<Task, "id" | "created_at">) => {
    await mutateAsync(data);
    navigate("/");
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
      subtasks: [...(prev.subtasks || []), newSubtask],
    }));
  };

  const handleSubtaskDelete = (subtaskId: number, e: React.MouseEvent) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks?.filter((subtask) => subtask.id !== subtaskId),
    }));
  };

  return (
    <TaskFormUI
      task={formData}
      isEditing={false}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onSubtaskAdd={handleSubtaskAdd}
      onSubtaskChange={handleSubtaskChange}
      onSubtaskDelite={handleSubtaskDelete}
    />
  );
};
