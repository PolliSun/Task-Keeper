import React, { FC, useState, useRef, useCallback, useEffect } from "react";
import { TaskHeaderUI } from "../../components/ui/pages/task-header/task-header";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { useLocation, useNavigate } from "react-router-dom";
import { addTask, searchTasks, sortTasks } from "../../services/slices/toDoSlice";
import { TTask } from "../../types/type";
import { TaskFormUI } from "../ui/task-form/task-form";

export const TaskHeader: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status).length;

  const handleCreateTask = () => {
    navigate("/task-list/create-task", { state: { background: location } });
  };

  const handleSaveTask = (newTasks: TTask) => {
    dispatch(addTask(newTasks));
    navigate("/task-page");
  };

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      dispatch(searchTasks(term));
    },
    [dispatch]
  );

  const handleFocus = () => {
    setIsFocused(true); 
  };

  const handleBlur = () => {
    setIsFocused(false); 
  };

  const handleEraserClick = () => {
    if (!isFocused) {
      setSearchTerm("");
      dispatch(searchTasks(""));
    }
  };

  useEffect(() => {
    setSearchTerm(""); 
    dispatch(searchTasks(""));
  }, [location]);

  const handleSortClick = () => {
    setIsSortOpen(prev => !prev);
  };

  const handleSortSelect = (sortBy: "date" | "alphabet" | "priority" | "favorites") => {
    dispatch(sortTasks(sortBy));
    setIsSortOpen(false);
  };

  const isCreateTask = location.pathname === "/task-list/create-task";

  if (isCreateTask) {
    return <TaskFormUI onSubmit={handleSaveTask} />;
  }


  return (
    <TaskHeaderUI
      totalTasks={totalTasks}
      completedTasks={completedTasks}
      onCreateTask={handleCreateTask}
      onSearch={handleSearch}
      searchTerm={searchTerm}
      searchInputRef={searchInputRef}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onEraserClick={handleEraserClick}
      onSortClick={handleSortClick}
      onSortSelect={handleSortSelect}
      isSortOpen={isSortOpen}
    />
  );
};
