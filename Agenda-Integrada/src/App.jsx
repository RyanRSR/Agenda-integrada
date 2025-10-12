import { Routes, Route } from "react-router-dom";
import SideBar from "./Components/Side-Bar";
import User from "./pages/User";
import AgendaPage from "./pages/AgendaPage";
import Profissionais from "./pages/Profissionais";
import Relatorios from "./pages/Relatorios";
import Notificacoes from "./pages/Notificacoes";
import "./App.css";

function App() {
  return ( 
    <div id="container" className="dark-mode">
      <SideBar fullname="Ryan Rocha" />
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
