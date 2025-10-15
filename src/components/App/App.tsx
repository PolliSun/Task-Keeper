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
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { Home } from "../ui/home/home";
import { ProtectedRoute } from "../protected-route/protected-route";
import { useCurrentUser } from "../../utils/hooks/useCurretUser/useCurretUser";

export const App: FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { profile } = useCurrentUser();

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
        <Route
          path="/profile"
          element={<ProtectedRoute component={<Profile />} />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/"
          element={
            profile ? (
              <Layout>{isMobile ? <MobileView /> : <DesktopView />}</Layout>
            ) : (
              <Home />
            )
          }
        >
          <Route index element={null} />
          <Route
            path="faq"
            element={<ProtectedRoute component={<HomePage />} />}
          />
          <Route
            path="create"
            element={<ProtectedRoute component={<CreateTask />} />}
          />
          <Route
            path="calendar"
            element={<ProtectedRoute component={<Calendar />} />}
          />
          <Route
            path="calendar/day/:id"
            element={<ProtectedRoute component={<Calendar />} />}
          />
          <Route
            path="task/:id"
            element={<ProtectedRoute component={<TaskDetails />} />}
          />
          <Route
            path="task/:id/edit"
            element={<ProtectedRoute component={<EditTask />} />}
          />
        </Route>
      </Routes>
    </div>
  );
};
