/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) */

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./services/store";
import "./index.css";

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