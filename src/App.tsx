// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ZodForm from "./pages/ZodForm";
import WeatherCard from "./pages/WeatherCard";
import { CustomThemeProvider } from "../src/components/theme/ThemeContext";

const App = () => {
  return (
    <CustomThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<WeatherCard />} />
          <Route path="/form" element={<ZodForm />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
