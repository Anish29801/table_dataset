import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ZodForm from "./pages/ZodForm";
import WeatherCard from "./pages/WeatherCard";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<WeatherCard />} />
          <Route path="/form" element={<ZodForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
