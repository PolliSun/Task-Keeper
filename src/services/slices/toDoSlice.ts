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
  sortBy: "date" | "alphabet" | "priority" | "favorites" | null;
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
    deliteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((tasks) => tasks.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleTaskStatus(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = !task.status;
        saveTasksToStorage(state.tasks);
      }
    },
    pinTask(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const task = state.tasks[index];
        task.isPinned = !task.isPinned;
        state.tasks.splice(index, 1);

        if (task.isPinned) {
          state.tasks.unshift(task);
        } else {
          state.tasks.push(task);
        }
        saveTasksToStorage(state.tasks);
      }
    },
    updateRemainingTime(
      state,
      action: PayloadAction<{ id: string; remainingTime: number }>
    ) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.remainingTime = action.payload.remainingTime;
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
        state.searchResults = state.tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm) ||
            task.priority.toLowerCase().includes(searchTerm) ||
            task.date.includes(searchTerm)
        );
        state.isSearching = true;
      }
    },
    sortTasks(
      state,
      action: PayloadAction<"date" | "alphabet" | "priority" | "favorites">
    ) {
      state.sortBy = action.payload;

      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
        none: 4,
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
              const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
              return priorityDiff !== 0 ? priorityDiff : 0; 
            });
            break;
        case "favorites":
          state.tasks = state.tasks
            .slice()
            .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
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
                const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
                return priorityDiff !== 0 ? priorityDiff : 0;
            case "favorites":
              return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
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
  deliteTask,
  toggleTaskStatus,
  updateRemainingTime,
  searchTasks,
  sortTasks,
  pinTask,
} = taskSlice.actions;
export default taskSlice.reducer;
