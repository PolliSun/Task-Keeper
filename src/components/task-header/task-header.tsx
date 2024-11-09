import React, { FC, useState, useRef, useCallback, useEffect } from "react";
import { TaskHeaderUI } from "../../components/ui/pages/task-header/task-header";
import { useDispatch } from "../../services/store";
import { useLocation } from "react-router-dom";
import { searchTasks, sortTasks } from "../../services/slices/taskSlice";
import { TTask } from "../../types/type";

type TaskHeaderProps = {
  onCreateTask: () => void;
  isCreateActive: boolean;
  onFavoritesClick: () => void;
  isFavoritesVisible: boolean;
};

export const TaskHeader: FC<TaskHeaderProps> = ({
  onCreateTask,
  isCreateActive,
  onFavoritesClick,
  isFavoritesVisible,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      dispatch(searchTasks(term));
    },
    [dispatch]
  );

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleSearchClick = () => {
    if (!isSearchVisible) {
      setIsSearchVisible(true);
      searchInputRef.current?.focus();
    } else {
      setSearchTerm("");
      dispatch(searchTasks(""));
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    setSearchTerm("");
    dispatch(searchTasks(""));
  }, [location]);

  const handleSortClick = () => setIsSortOpen((prev) => !prev);

  const handleSortSelect = (sortBy: "date" | "alphabet" | "priority") => {
    dispatch(sortTasks(sortBy));
    setIsSortOpen(false);
  };

  return (
    <TaskHeaderUI
      onCreateTask={onCreateTask}
      isCreateActive={isCreateActive}
      onSearch={handleSearch}
      searchTerm={searchTerm}
      searchInputRef={searchInputRef}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onSearchClick={handleSearchClick}
      onSortClick={handleSortClick}
      onSortSelect={handleSortSelect}
      onFavoritesClick={onFavoritesClick}
      isSortOpen={isSortOpen}
      isSearchVisible={isSearchVisible}
      isFavoritesVisible={isFavoritesVisible}
    />
  );
};
