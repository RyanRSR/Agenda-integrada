import { Link, useLocation } from "react-router-dom";

function SideBar({ fullname }) {
  const location = useLocation();

  const links = [
    { path: "/", icon: "account_box", label: `${fullname}` },
    { path: "/agenda", icon: "calendar_month", label: "Agenda" },
    { path: "/profissionais", icon: "clinical_notes", label: "Profissionais" },
    { path: "/relatorios", icon: "analytics", label: "Relatórios" },
    { path: "/notificacoes", icon: "notifications", label: "Notificações" },
  ];

  return (
    <aside className="side-bar">
      {links.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={location.pathname === item.path ? "active" : ""}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="label">{item.label}</span>
        </Link>
      ))}

      <hr />

      <div id="side-buttons">
        <button id="theme">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
        <button id="settings">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button id="leave">
          <span className="material-symbols-outlined">exit_to_app</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
