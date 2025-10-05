const links = [
  { href: "user.html", icon: "account_box", label: "*Nome do usuário*" },
  { href: "agenda.html", icon: "calendar_month", label: "Agenda" },
  {
    href: "profissionais.html",
    icon: "clinical_notes",
    label: "Profissionais",
  },
  { href: "relatorios.html", icon: "analytics", label: "Relatórios" },
  { href: "notificacao.html", icon: "notifications", label: "Notificações" },
];

function SideBar() {
  return (
    <aside className="side-bar">
      {links.map(({ href, icon, label }) => (
        <a href={href} key={href}>
          <span className="material-symbols-outlined">{icon}</span>
          {label}
        </a>
      ))}

      <hr />

      <div className="side-buttons">
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
