import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { HashRouter } from "react-router-dom";
import "./styles/global.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
