function NvAgendamento({ onOpenModal, disabled }) {
  return (
    <div className="agendar-container">
      <button
        onClick={onOpenModal}
        disabled={disabled}
        className={`agendar-btn ${disabled ? "disabled" : ""}`}
      >
        Novo Agendamento
      </button>

      <p className={`agendar-msg ${disabled ? "visible" : ""}`}>
        Selecione uma data no calendario antes de agendar
      </p>
    </div>
  );
}

export default NvAgendamento;
