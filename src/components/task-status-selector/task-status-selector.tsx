import { FC, useState } from "react";
import { TaskStatusSelectorUI } from "../ui/task-status-selector/task-status-selector";

const AVAILABLE_STATUSES = ["новая", "в работе", "отложена", "выполнена"];

type TaskStatusSelectorProps = {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
};

export const TaskStatusSelector: FC<TaskStatusSelectorProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(newStatus);
    setIsOpenDropdown(false);
  };

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };
  return (
    <TaskStatusSelectorUI
      currentStatus={currentStatus}
      availableStatuses={AVAILABLE_STATUSES}
      isOpenDropdown={isOpenDropdown}
      onToggleDropdown={toggleDropdown}
      onStatusChange={handleStatusChange}
    />
  );
};
