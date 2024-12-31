import React, { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import styles from "./datas.module.css";
import { ModalUI } from "../../components/ui/modal/modal";
import { HomePage } from "../home-page";

export const DatasPage: FC = () => {
  return (
    <>
      <p>Выберите задачу для просмотра или создайте новую!</p>
      
    </>
  );
};
