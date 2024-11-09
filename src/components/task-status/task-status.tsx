import React, { FC } from "react";
import { TaskStatusUI } from "../ui/task-status/task-status";

type TaskStatusProps = {
    status: string;
}

export const TaskStatus: FC<TaskStatusProps> = ({status}) => {
    let buttonStyle = "";
    switch (status) {
        case "выполнен":
            buttonStyle = "#00800063";
            break;
        case "в работе":
            buttonStyle = "#00b0ff63";
            break;
        case "отложен":
            buttonStyle = "#ef282863";
            break;
    }

    return < TaskStatusUI status={status} backgroundColor={buttonStyle}/>
}