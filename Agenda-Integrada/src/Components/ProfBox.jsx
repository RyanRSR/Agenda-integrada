function ProfBox({ name, role }) {
  return (
    <div className="prof-box">
      <div prof-info>
        <h3 className="prof-name">{name}</h3>
        <p className="prof-role">{role}</p>
      </div>

      <button className="prof-button" title="Ver Detalhes">
        <span className="material-symbols-outlined">info</span>
      </button>
    </div>
  );
}

export default ProfBox;
