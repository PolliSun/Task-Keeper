import React, { FC, useMemo, useState } from "react";
import { TDay, TTask } from "../../types/type";
import { DayDetailsUI } from "../ui/day-details/day-details";
import { RootState, useSelector } from "../../services/store";
import { useParams } from "react-router-dom";
import { Calendar } from "../calendar/calendar";

type DayDetailsProps = {
  day:TDay;
  tasks?: TTask[];
};

export const DayDetails: FC<DayDetailsProps> = ({ day, tasks }) => {
  // const days = useSelector((state: RootState) => state.calendar.days);

  // const { id } = useParams<{ id: string }>();
  // const dayData = days.find((i) => String(i.id) === id);

  // if (!dayData) {
  //   return <p>День не найден</p>;
  // }

  return  <DayDetailsUI day={day} tasks={tasks} />;
};
