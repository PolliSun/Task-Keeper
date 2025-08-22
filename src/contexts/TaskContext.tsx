import React, { createContext, useContext, useMemo, useState } from "react";
import { Task } from "../utils/api/taskService/taskService";
import { useUser } from "./UserContext";
import { useGetTasks } from "../utils/hooks/useTasks/useTasks";

type TaskFilter = "all" | "favorites" | "overdue";
type TaskSort = "date" | "priority" | "status";

type TaskContextType = {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  isLoading: boolean;
  filter: TaskFilter;
  sort: TaskSort;
  setSort: (sort: TaskSort) => void;
  setFilter: (filter: TaskFilter) => void;
  sortedTasks: Task[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  selectedTask: null,
  setSelectedTask: () => {},
  isLoading: false,
  filter: "all",
  sort: "date",
  setSort: () => {},
  setFilter: () => {},
  sortedTasks: [],
  searchTerm: "",
  setSearchTerm: () => {},
});

export const useTasksContext = () => useContext(TaskContext);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const { data, isLoading } = useGetTasks(user?.userId || "");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sort, setSort] = useState<TaskSort>("date");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const tasks = useMemo(() => data?.data ?? [], [data]);

  const isTaskOverdue = (end_date: string | null): boolean => {
    if (!end_date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskEndDate = new Date(end_date);
    taskEndDate.setHours(0, 0, 0, 0);

    return taskEndDate < today;
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "favorites":
        return tasks.filter((task) => task.pinned);
      case "overdue":
        return tasks.filter(
          (task) => isTaskOverdue(task.end_date) && task.status !== "выполнена"
        );
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const searchedTasks = useMemo(() => {
    if (!searchTerm.trim()) return filteredTasks;

    const term = searchTerm.toLowerCase();
    return filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.status.toLowerCase().includes(term) ||
        task.subtasks?.some((sub) => sub.title.toLowerCase().includes(term))
    );
  }, [filteredTasks, searchTerm]);

  const sortedTasks = useMemo(() => {
    const priorityTask: Record<string, number> = {
      высокий: 1,
      средний: 2,
      низкий: 3,
      "без приоритета": 4,
    };

    const statusTask: Record<string, number> = {
      просрочена: 1,
      отложена: 2,
      тестирование: 3,
      "в работе": 4,
      выполнена: 5,
      новая: 6,
    };

    switch (sort) {
      case "priority":
        return searchedTasks.slice().sort((a, b) => {
          const priorityDiff =
            (priorityTask[a.priority] || 4) - (priorityTask[b.priority] || 4);
          return priorityDiff !== 0 ? priorityDiff : 0;
        });
      case "status":
        return searchedTasks.slice().sort((a, b) => {
          const statusDiff =
            (statusTask[a.status] || 6) - (statusTask[b.status] || 6);
          return statusDiff !== 0 ? statusDiff : 0;
        });
      default:
        return searchedTasks
          .slice()
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
    }
  }, [searchedTasks, sort]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        selectedTask,
        setSelectedTask,
        isLoading,
        filter,
        sort,
        setSort,
        setFilter,
        sortedTasks,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
