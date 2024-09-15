import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home } from "../pages/home";
import { EditNote } from "../pages/edit";
import { CreateNote } from "../pages/create";
import { Modal } from "./Modal";
import { Header } from "./Header";

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  return (
    <>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/create"
            element={
              <Modal onClose={() => navigate(-1)}>
                <CreateNote />
              </Modal>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Modal onClose={() => navigate(-1)}>
                <EditNote />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
