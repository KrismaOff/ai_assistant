import React from "react";
import "./App.css";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import DevelopHeader from "@/components/layout/DevelopHeader/DevelopHeader";

const theme = createTheme();

function App() {

  const location = useLocation();
  // const path = location.pathname.split('/').at(-1)
  // console.log(path);


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
