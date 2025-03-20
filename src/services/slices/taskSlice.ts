import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTask } from "../../types/type";
import {
  fetchTasksFromAPI,
  saveTaskToAPI,
  updateTaskInAPI,
  deleteTaskFromAPI,
} from "../../utils/api";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const tasks = await fetchTasksFromAPI();
  return tasks;
});

export const addTaskToAPI = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<TTask, "id" | "created_at">) => {
    const newTask = await saveTaskToAPI(task);
    return newTask;
  }
);

export const editeTask = createAsyncThunk(
  "tasks/editeTask",
  async (task: Pick<TTask, "id"> & Partial<Omit<TTask, "id">>) => {
    const updateTask = await updateTaskInAPI(task as TTask);
    return updateTask;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    await deleteTaskFromAPI(taskId);
    return taskId;
  }
);

export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleTaskCompletion",
  async ({ taskId, completed }: { taskId: number; completed: boolean }) => {
    const task = {
      id: taskId,
      completed,
      status: completed
        ? "выполнена"
        : ("в работе" as "выполнена" | "в работе"),
    };
    const updateTask = await updateTaskInAPI(task);
    return updateTask;
  }
);

export const toggleSubtaskStatus = createAsyncThunk(
  "tasks/toggleSubtaskStatus",
  async ({
    taskId,
    subtaskId,
    completed,
    subtasks,
  }: {
    taskId: number;
    subtaskId: number;
    completed: boolean;
    subtasks: { id: number; title: string; completed?: boolean }[];
  }) => {
    const updatedSubtask = subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed } : st
    );

    const task = { id: taskId, subtasks: updatedSubtask };
    const updateTask = await updateTaskInAPI(task);
    return updateTask;
  }
);

export const pinTask = createAsyncThunk(
  "tasks/pinTask",
  async ({
    taskId,
    currentPinned,
  }: {
    taskId: number;
    currentPinned: boolean;
  }) => {
    const task = { id: taskId, pinned: !currentPinned };
    const updateTask = await updateTaskInAPI(task);
    return updateTask;
  }
);

interface TaskState {
  tasks: TTask[];
  searchResults: TTask[];
  searchTerm: string;
  sortBy: "date" | "alphabet" | "priority" | null;
  filter: "all" | "favorites" | "overdue" | "search" | "day";
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  searchResults: [],
  searchTerm: "",
  sortBy: null,
  filter: "all",
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    searchTasks(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = searchTerm;
      if (searchTerm === "") {
        state.searchResults = [];
      } else {
        state.searchResults = state.tasks.filter((task) => {
          const taskTitle = task.title?.toLowerCase() || "";
          const taskParagraf = task.description?.toLowerCase() || "";
          const taskPriority = task.priority?.toLowerCase() || "";
          const taskStatus = task.status?.toLowerCase() || "";
          const taskId = task.id.toString();
          const taskDate = new Date(task.created_at).toISOString().slice(0, 10);

          const isDateSearch = !isNaN(Date.parse(searchTerm));
          const matchesDate = isDateSearch ? taskDate === searchTerm : false;

          return (
            taskTitle.includes(searchTerm) ||
            taskParagraf.includes(searchTerm) ||
            taskPriority.includes(searchTerm) ||
            taskStatus.includes(searchTerm) ||
            task.created_at.includes(searchTerm) ||
            taskId.includes(searchTerm) ||
            matchesDate
          );
        });
      }
    },
    setFilter(
      state,
      action: PayloadAction<"all" | "favorites" | "overdue" | "search" | "day">
    ) {
      state.filter = action.payload;
    },
    sortTasks(state, action: PayloadAction<"date" | "alphabet" | "priority">) {
      state.sortBy = action.payload;

      const priorityOrder: Record<string, number> = {
        высокий: 1,
        средний: 2,
        низкий: 3,
        "без приоритета": 4,
      };

      switch (action.payload) {
        case "date":
          state.tasks = state.tasks
            .slice()
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
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
        default:
          break;
      }

      if (state.searchResults.length > 0) {
        state.searchResults = state.searchResults.slice().sort((a, b) => {
          switch (action.payload) {
            case "date":
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            case "alphabet":
              return a.title.localeCompare(b.title);
            /*             case "priority":
              const priorityDiff =
                (priorityOrder[a.priority] || 4) -
                (priorityOrder[b.priority] || 4);
              return priorityDiff !== 0 ? priorityDiff : 0; */
            default:
              return 0;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(
        addTaskToAPI.fulfilled,
        (state, action: PayloadAction<TTask>) => {
          state.tasks.push(action.payload);
        }
      )
      .addCase(addTaskToAPI.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(editeTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(toggleSubtaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(pinTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export const { searchTasks, setFilter, sortTasks } = taskSlice.actions;
export default taskSlice.reducer;
