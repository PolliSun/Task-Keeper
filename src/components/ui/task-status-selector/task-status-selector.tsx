import { FC } from "react";
import { TaskStatus } from "../../task-status/task-status";
import { LuChevronDown } from "react-icons/lu";
import styles from "./task-status-selector.module.css";

type TaskStatusSelectorUIProps = {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
  isOpenDropdown: boolean;
  availableStatuses: string[];
  onToggleDropdown: () => void;
};

export const TaskStatusSelectorUI: FC<TaskStatusSelectorUIProps> = ({
  currentStatus,
  onStatusChange,
  isOpenDropdown,
  availableStatuses,
  onToggleDropdown,
}) => {
  return (
    <div className={styles.selector}>
      <button onClick={onToggleDropdown} className={styles.statusButton}>
        <TaskStatus status={currentStatus} displayMode="text" />
        <div className={styles.arrowDropdown}>
          <LuChevronDown
            size={18}
            className={isOpenDropdown ? styles.iconRotated : styles.icon}
          />
        </div>
      </button>

      {isOpenDropdown && (
        <div className={styles.dropdown}>
          <ul className={styles.statusList}>
            {availableStatuses.map((status) => {
              const isSelected = status === currentStatus;

              return (
                <li key={status} className={styles.statusItem}>
                  <button
                    onClick={() => onStatusChange(status)}
                    className={styles.statusSelected}
                  >
                    <TaskStatus status={status} displayMode="text" />
                    {isSelected && <div className={styles.checkmark}></div>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
