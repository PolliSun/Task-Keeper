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

  return  <DayDetailsUI day={day} tasks={tasks} />;
};
