import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../src/components/App/App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./services/store";
import "./styles/index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
