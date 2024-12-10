import React, { FC } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { Tasks } from "../../pages/tasks/tasks";
import { Header } from "../Header/Header";
import { Footer } from "../ui/footer/footer";

import styles from "./app.module.css";

export const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/task-page" element={<Tasks />} />
      </Routes>
      <Footer />
    </div>
  );
};
