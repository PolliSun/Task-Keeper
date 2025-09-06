import { FC, useState } from "react";
import { PageHeaderUI } from "../ui/page-header/page-header";
import { useTasksContext } from "../../contexts/TaskContext";

export const PageHeader: FC = () => {
  const { setSort, setFilter, filter } = useTasksContext();
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSortClick = () => {
    setIsSortOpen((prev) => !prev);
  };

  const handleSortSelect = (sortBy: "date" | "priority" | "status") => {
    setSort(sortBy);
    setIsSortOpen(false);
  };

  const handleFilterChange = (
    sortBy: "all" | "favorites" | "overdue" | "archive"
  ) => {
    setFilter(sortBy);
  };

  return (
    <PageHeaderUI
      onSortClick={handleSortClick}
      onSortSelect={handleSortSelect}
      isSortOpen={isSortOpen}
      onFilterSelect={handleFilterChange}
      activeFilter={filter}
    />
  );
};
