export type TTask = {
  id: string;
  date: string;
  startDate?: string;
  endDate?: string;
  status: string;
  title: string;
  priority: string;
  pinned: boolean;
  subtasks?: { id: string; title: string; completed?: boolean;}[];
};

export type TCalendar = {
  month: number;
  year: number;
};
