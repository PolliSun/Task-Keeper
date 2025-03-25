import { FC, useState } from "react";
import { useDispatch } from "../../services/store";
import { setFilter, sortTasks } from "../../services/slices/taskSlice";
import { PageHeaderUI } from "../ui/page-header/page-header";

export const PageHeader: FC = () => {
  const dispatch = useDispatch();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSortClick = () => {
    setIsSortOpen((prev) => !prev);
  };

  const handleSortSelect = (sortBy: "date" | "alphabet" | "priority") => {
    dispatch(sortTasks(sortBy));
    setIsSortOpen(false);
  };

  const handleFilterChange = (
    sortBy: "favorites" | "overdue" | "search" | "all" | "day"
  ) => {
    dispatch(setFilter(sortBy));
    setActiveFilter(sortBy);
  };

  return (
    <PageHeaderUI
      onSortClick={handleSortClick}
      onSortSelect={handleSortSelect}
      isSortOpen={isSortOpen}
      onFilterSelect={handleFilterChange}
      activeFilter={activeFilter}
    />
  );
};
