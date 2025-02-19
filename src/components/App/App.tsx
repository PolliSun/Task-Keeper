import { FC, useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { Header } from "../header/header";
import { useDispatch } from "../../services/store";

import styles from "./app.module.css";
import { Calendar } from "../calendar/calendar";
import { TaskForm } from "../task-form/task-form";
import { getTasksFromStorage } from "../../utils/tasksStorage";
import { setTasks } from "../../services/slices/taskSlice";
import { TaskDetails } from "../task-details/task-details";
import { EditPage } from "../edit-page/edit-page";
/* import { DatasPage } from "../../pages/datas/datas";
import { TasksPage } from "../../pages/tasks-list/tasks-list";
import { DayDetails } from "../day-details/day-details"; */
import { Layout } from "../ui/layout/layout";
import { DesktopView } from "../ui/desktop-view/desktop-view";
import { MobileView } from "../ui/mobile-view/mobile-view";

export const App: FC = () => {
/*   const location = useLocation(); */
  const dispatch = useDispatch();
/*   const navigate = useNavigate();
  const background = location.state?.background; */

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tasks = getTasksFromStorage();
    dispatch(setTasks(tasks));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={isMobile ? <MobileView /> : <DesktopView />}>
            <Route path="faq" element={<HomePage />} />
            <Route path="create" element={<TaskForm />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="calendar/day/:id" element={<Calendar />} />
            <Route path="task/:id" element={<TaskDetails />} />
            <Route path="task/:id/edit" element={<EditPage />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
};
