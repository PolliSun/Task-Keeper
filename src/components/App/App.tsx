import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { Header } from "../Header/Header";
import styles from "./app.module.css";
import { Calendar } from "../calendar/calendar";
import { TaskDetails } from "../../pages/task-details/task-details";
import { Login } from "../../pages/login/login";
import { Profile } from "../../pages/profile/profile";
import { CreateTask } from "../../pages/create-task/create-task";
import { EditTask } from "../../pages/edit-task/edit-task";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { Home } from "../ui/home/home";
import { ProtectedRoute } from "../protected-route/protected-route";
import { Dashboard } from "../dashboard/dashboard";

export const App: FC = () => {
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
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<ProtectedRoute component={<Dashboard />} />}>
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
