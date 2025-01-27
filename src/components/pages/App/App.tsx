import React from "react";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Outlet } from "react-router-dom";
import DevelopHeader from "@/components/layout/DevelopHeader/DevelopHeader";

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <DevelopHeader />
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
