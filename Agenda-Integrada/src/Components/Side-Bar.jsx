import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function SideBar({
  fullname,
  isDarkMode,
  toggleTheme,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const location = useLocation();

  const links = [
    { path: "/user", icon: "account_box", label: `${fullname}` },
    { path: "/", icon: "calendar_month", label: "Agenda" },
    { path: "/profissionais", icon: "clinical_notes", label: "Profissionais" },
    { path: "/relatorios", icon: "analytics", label: "Relatórios" },
    { path: "/notificacoes", icon: "notifications", label: "Notificações" },
  ];

  return (
    <>
      {!isSidebarOpen && (
        <div className="hb-menu" onClick={() => setIsSidebarOpen(true)}>
          <span className="material-symbols-outlined">menu</span>
        </div>
      )}

      <aside className={`side-bar ${isSidebarOpen ? "open" : ""}`}>
        {links.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="label">{item.label}</span>
          </Link>
        ))}

        <hr />

        <div id="side-buttons">
          <button id="theme" onClick={toggleTheme}>
            <span className="material-symbols-outlined">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button id="settings">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button id="leave">
            <span className="material-symbols-outlined">exit_to_app</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
