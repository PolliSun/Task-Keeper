/* import { FC, useState, useRef, useCallback, useEffect } from "react";
import { TaskHeaderUI } from "../../components/ui/pages/task-header/task-header";
import { useDispatch } from "../../services/store";
import { useLocation } from "react-router-dom";
import {
  searchTasks,
  setFilter,
} from "../../services/slices/taskSlice";

export const TaskHeader: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
        dispatch(setFilter("search"));
      }
    },
    [dispatch]
  );

  const handleSearchClick = () => {
    if (!isSearchVisible) {
      dispatch(setFilter("search"));
      setIsSearchVisible(true);
      searchInputRef.current?.focus();
    } else {
      setSearchTerm("");
      dispatch(searchTasks(""));
      setIsSearchVisible(false);
      dispatch(setFilter("all"));
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchTerm("");
      setIsSearchVisible(false);
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
    />
  );
}; */
