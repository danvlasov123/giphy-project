import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";

import theme from "./theme/theme.ts";
import { SWRConfig } from "swr";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SWRConfig value={{ provider: () => new Map() }}>
        <App />
      </SWRConfig>
    </ThemeProvider>
  </React.StrictMode>
);
