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
      <div className="title-conteiner">
        <a href="#" className="logo"></a>
        <h1 className="header-title">Note Keeper</h1>
      </div>
      <div className="button-header-conteiner">
        <button className="header-button" onClick={handleCreateNote}>
          Добавить заметку
        </button>
      </div>
    </div>
  );
};
