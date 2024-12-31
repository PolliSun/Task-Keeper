import React, { FC, useState, useRef, useCallback, useEffect } from "react";
import { TaskHeaderUI } from "../../components/ui/pages/task-header/task-header";
import { useDispatch } from "../../services/store";
import { useLocation } from "react-router-dom";
import {
  searchTasks,
  setFilter,
  sortTasks,
} from "../../services/slices/taskSlice";

export const TaskHeader: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      dispatch(searchTasks(term));
      if (term) {
        dispatch(setFilter("search"));
      } else {
        dispatch(setFilter("all"));
      }
    },
    [dispatch]
  );

  const handleSearchClick = () => {
    if (!isSearchVisible) {
      setIsSearchVisible(true);
      searchInputRef.current?.focus();
    } else {
      setSearchTerm("");
      dispatch(searchTasks(""));
      setIsSearchVisible(false);
      dispatch(setFilter("all"));
    }
  };

  const handleSortClick = () => {
    setIsSortOpen((prev) => !prev);
  };

  const handleFilterChange = (
    sortBy: "favorites" | "completed" | "search" | "all"
  ) => {
    dispatch(setFilter(sortBy));
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleSortSelect = (
    sortBy: "date" | "alphabet" | "priority" | "status"
  ) => {
    dispatch(sortTasks(sortBy));
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchTerm("");
      setIsSearchVisible(false);
      setIsSortOpen(false);
      dispatch(searchTasks(""));
      dispatch(setFilter("all"));
    }
  }, [location.pathname, dispatch]);

  return (
    <TaskHeaderUI
      onSearch={handleSearch}
      searchTerm={searchTerm}
      searchInputRef={searchInputRef}
      isSearchVisible={isSearchVisible}
      onSearchClick={handleSearchClick}
      onSortClick={handleSortClick}
      onSortSelect={handleSortSelect}
      isSortOpen={isSortOpen}
      onFilterSelect={handleFilterChange}
      activeFilter={activeFilter}
      onClickCalendar={handleCalendarClick}
    />
  );
};
