import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function SideBar({ fullname, isDarkMode, toggleTheme, isModalOpen }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const HandleCloseMenu = () => {
    setIsOpen(false);
  };

  const links = [
    { path: "/user", icon: "account_box", label: `${fullname}` },
    { path: "/", icon: "calendar_month", label: "Agenda" },
    { path: "/profissionais", icon: "clinical_notes", label: "Profissionais" },
    { path: "/relatorios", icon: "analytics", label: "Relatórios" },
    { path: "/notificacoes", icon: "notifications", label: "Notificações" },
  ];

  return (
    <>
      {!isModalOpen && (
        <div className="hb-menu" onClick={() => setIsOpen(!isOpen)}>
          <span className="material-symbols-outlined">menu</span>
        </div>
      )}

      <aside className={`side-bar ${isOpen ? "open" : ""}`}>
        {links.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
            onClick={HandleCloseMenu}
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
