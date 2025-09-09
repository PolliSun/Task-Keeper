import { FC, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { Header } from "../Header/Header";
import styles from "./app.module.css";
import { Calendar } from "../calendar/calendar";
import { TaskDetails } from "../../pages/task-details/task-details";
import { Layout } from "../ui/layout/layout";
import { DesktopView } from "../ui/desktop-view/desktop-view";
import { MobileView } from "../ui/mobile-view/mobile-view";
import { Login } from "../../pages/login/login";
import { Profile } from "../../pages/profile/profile";
import { CreateTask } from "../../pages/create-task/create-task";
import { EditTask } from "../../pages/edit-task/edit-task";
import { Register } from "../../pages/register/register";

export const App: FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/"
          element={
            <Layout>{isMobile ? <MobileView /> : <DesktopView />}</Layout>
          }
        >
          <Route index element={null} />
          <Route path="faq" element={<HomePage />} />
          <Route path="create" element={<CreateTask />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="calendar/day/:id" element={<Calendar />} />
          <Route path="task/:id" element={<TaskDetails />} />
          <Route path="task/:id/edit" element={<EditTask />} />
        </Route>
      </Routes>
    </div>
  );
};
