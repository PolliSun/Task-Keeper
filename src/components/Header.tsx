import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/create", { state: { background: location } });
  };

  return (
    <div className="header-conteiner">
      <h1 className="header-title">Note Keeper</h1>
      <button className="header-button" onClick={handleCreateNote}>Добавить заметку</button>
    </div>
  );
};
