export type TTask = {
  id: string;
  date: string;
  startDate: string;
  endDate: string;
  status: string;
  title: string;
  description: string;
  priority: string;
  pinned: boolean;
  subtasks?: { id: string; title: string; completed?: boolean;}[];
};

export type TCalendar = {
  days: TDay[];
  currentDate: {
    month: number;
    year: number;
  };
};

export type TDay = {
  id: string;
  day: number;
  month: number;
  year: number;
  tasks: TTask[];
}
