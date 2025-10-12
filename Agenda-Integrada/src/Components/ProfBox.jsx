function ProfBox({ name, role }) {
  return (
    <div className="profissionais">
      <h3 className="prof">{name}</h3>
      <h3 className="roles">{role}</h3>
    </div>
  );
}

export default ProfBox;
