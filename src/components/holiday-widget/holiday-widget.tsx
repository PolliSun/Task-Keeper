import React, { useState, useEffect } from "react";
import { HolidayWidgetUI } from "../ui/holiday-widget/holiday-widget";
import holidaysData from "../../utils/holidays.json";

export const HolidayWidget: React.FC = () => {
  const [holiday, setHoliday] = useState<{ name: string; description: string } | null>(null);

  useEffect(() => {
    const today = new Date();
    const currentDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const foundHoliday = holidaysData.holidays.find(
      (h: { name: string; description: string; date: string }) => h.date === currentDate
    );

    setHoliday(foundHoliday || null);
  }, []);

  return <HolidayWidgetUI holiday={holiday} />;
};
