import { Routes, Route } from "react-router-dom";
import SideBar from "./Components/Side-Bar";
import User from "./pages/User";
import AgendaPage from "./pages/AgendaPage";
import Profissionais from "./pages/Profissionais";
import Relatorios from "./pages/Relatorios";
import Notificacoes from "./pages/Notificacoes";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);
  return (
    <div id="container" className={isDarkMode ? "dark-mode" : ""}>
      <SideBar
        fullname="Ryan Rocha"
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/profissionais" element={<Profissionais />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
