import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTask } from "../../types/type";
import {
  saveTasksToStorage,
  getTasksFromStorage,
} from "../../utils/tasksStorage";

interface TaskState {
  tasks: TTask[];
  searchResults: TTask[];
  searchTerm: string;
  isSearching: boolean;
  sortBy: "date" | "alphabet" | "priority" | "status" | null;
}

const initialState: TaskState = {
  tasks: getTasksFromStorage(),
  searchResults: [],
  searchTerm: "",
  isSearching: false,
  sortBy: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TTask[]>) {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },
    addTask(state, action: PayloadAction<TTask>) {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },
    addSubtask(
      state,
      action: PayloadAction<{
        taskId: number;
        subtask: { id: number; title: string };
      }>
    ) {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        if (!task.subtasks) task.subtasks = [];
        task.subtasks.push({ ...action.payload.subtask, completed: false });
        saveTasksToStorage(state.tasks);
      }
    },
    deliteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((tasks) => tasks.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    deliteSubtask(
      state,
      action: PayloadAction<{ taskId: number; subtaskId: number }>
    ) {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task && task.subtasks) {
        task.subtasks = task.subtasks.filter(
          (subtasks) => subtasks.id !== action.payload.subtaskId
        );
        saveTasksToStorage(state.tasks);
      }
    },
    toggleTaskStatus(
      state,
      action: PayloadAction<{ taskId: number; newStatus: string }>
    ) {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = newStatus;
        saveTasksToStorage(state.tasks);
      }
    },
    toggleSubtaskStatus(
      state,
      action: PayloadAction<{
        taskId: number;
        subtaskId: number;
        completed: boolean;
      }>
    ) {
      const { taskId, subtaskId, completed } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task?.subtasks) {
        const subtask = task.subtasks.find((st) => st.id === subtaskId);
        if (subtask) {
          subtask.completed = completed;
          saveTasksToStorage(state.tasks);
        }
      }
    },
    pinTask(state, action: PayloadAction<number>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.pinned = !task.pinned;
        saveTasksToStorage(state.tasks);
      }
    },
    editTask(state, action: PayloadAction<TTask>) {
      const editedTask = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === editedTask.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = editedTask;
        saveTasksToStorage(state.tasks);
      }
    },
    searchTasks(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = searchTerm;
      if (searchTerm === "") {
        state.searchResults = [];
        state.isSearching = false;
      } else {
        state.searchResults = state.tasks.filter((task) => {
          const taskTitle = task.title?.toLowerCase() || "";
          const taskPriority = task.priority?.toLowerCase() || "";
          return (
            taskTitle.includes(searchTerm) ||
            taskPriority.includes(searchTerm) ||
            task.date.includes(searchTerm)
          );
        });
        state.isSearching = true;
      }
    },
    sortTasks(
      state,
      action: PayloadAction<"date" | "alphabet" | "priority" | "status">
    ) {
      state.sortBy = action.payload;

      const priorityOrder: Record<string, number> = {
        высокий: 1,
        средний: 2,
        низкий: 3,
        "без приоритета": 4,
      };

      const priorityStatus: Record<string, number> = {
        отложен: 1,
        "в работе": 2,
        выполнен: 3,
      };

      switch (action.payload) {
        case "date":
          state.tasks = state.tasks
            .slice()
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          break;
        case "alphabet":
          state.tasks = state.tasks
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "priority":
          state.tasks = state.tasks.slice().sort((a, b) => {
            const priorityDiff =
              (priorityOrder[a.priority] || 4) -
              (priorityOrder[b.priority] || 4);
            return priorityDiff !== 0 ? priorityDiff : 0;
          });
          break;
        case "status":
          state.tasks = state.tasks.slice().sort((a, b) => {
            const priorityDiffStatus =
              (priorityStatus[a.status] || 3) -
              (priorityStatus[b.status] || 3);
            return priorityDiffStatus !== 0 ? priorityDiffStatus : 0;
          });
          break;
        default:
          break;
      }

      if (state.searchResults.length > 0) {
        state.searchResults = state.searchResults.slice().sort((a, b) => {
          switch (action.payload) {
            case "date":
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            case "alphabet":
              return a.title.localeCompare(b.title);
            case "priority":
              const priorityDiff =
                (priorityOrder[a.priority] || 4) -
                (priorityOrder[b.priority] || 4);
              return priorityDiff !== 0 ? priorityDiff : 0;
            case "status":
              const priorityDiffStatus =
                (priorityStatus[a.status] || 3) -
                (priorityStatus[b.status] || 3);
              return priorityDiffStatus !== 0 ? priorityDiffStatus : 0;
            default:
              return 0;
          }
        });
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  addSubtask,
  deliteSubtask,
  deliteTask,
  toggleTaskStatus,
  toggleSubtaskStatus,
  editTask,
  searchTasks,
  sortTasks,
  pinTask,
} = taskSlice.actions;
export default taskSlice.reducer;
