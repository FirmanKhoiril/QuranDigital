import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ContextProvider } from "./utils/ContextAPI.tsx";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme.ts";
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
