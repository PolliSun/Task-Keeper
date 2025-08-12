import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./services/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
