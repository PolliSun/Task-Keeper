import React, { FC, useState, useRef, useCallback, useEffect } from "react";
import { TaskHeaderUI } from "../../components/ui/pages/task-header/task-header";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { useLocation, useNavigate } from "react-router-dom";
import { searchTasks, sortTasks } from "../../services/slices/taskSlice";
import { TTask } from "../../types/type";

type TaskHeaderProps = {
  tasks: TTask[];
  onCreateTask: () => void;
};

export const TaskHeader: FC<TaskHeaderProps> = ({tasks, onCreateTask})=> {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status).length;

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      dispatch(searchTasks(term));
    },
    [dispatch]
  );

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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

  const handleSortClick = () => setIsSortOpen((prev) => !prev);

  const handleSortSelect = (sortBy: "date" | "alphabet" | "priority" | "favorites") => {
    dispatch(sortTasks(sortBy));
    setIsSortOpen(false);
  };

  return (
    <TaskHeaderUI
      totalTasks={totalTasks}
      completedTasks={completedTasks}
      onCreateTask={onCreateTask}
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
