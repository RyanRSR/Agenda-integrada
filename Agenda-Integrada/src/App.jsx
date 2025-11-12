import { Routes, Route } from "react-router-dom";
import SideBar from "./Components/Side-Bar";
import User from "./pages/User";
import AgendaPage from "./pages/AgendaPage";
import Profissionais from "./pages/Profissionais";
import Relatorios from "./pages/Relatorios";
import Notificacoes from "./pages/Notificacoes";
import { useState, useEffect } from "react";
import "./App.css";
import "./media.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        isModalOpen={isModalOpen}
      />
      <div className="page-content">
        <Routes>
          <Route path="/user" element={<User />} />
          <Route
            path="/"
            element={
              <AgendaPage
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
              />
            }
          />
          <Route path="/profissionais" element={<Profissionais />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
