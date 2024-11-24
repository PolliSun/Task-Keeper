import React, { FC } from "react";
import { TaskStatusUI } from "../ui/task-status/task-status";

type TaskStatusProps = {
    status: string;
}

export const TaskStatus: FC<TaskStatusProps> = ({status}) => {
    let buttonStyle = "";
    switch (status) {
        case "выполнен":
            buttonStyle = "#a2d3a2";
            break;
        case "в работе":
            buttonStyle = "#a5e3ff";
            break;
        case "отложен":
            buttonStyle = "#fba4a4";
            break;
    }

    return < TaskStatusUI status={status} backgroundColor={buttonStyle}/>
}