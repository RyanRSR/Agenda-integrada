import { useState, useMemo } from "react";
import Agenda from "./Agenda";
import InfoBox from "./InfoBox";
import NvAgendamento from "./NvAgendamento";

function ContCent({ name }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ title: "", time: "" });
  const [appointments, setAppointments] = useState({});

  // Salvar agendamento
  const handleSaveAppointment = () => {
    if (newAppointment.title.trim() && newAppointment.time) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      setAppointments((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newAppointment],
      }));

      setIsModalOpen(false);
      setNewAppointment({ title: "", time: "" });
    }
  };

  // Abrir modal
  const handleStartNewAppointment = () => {
    if (!selectedDate) {
      alert("Por favor, selecione uma data no calendário.");
      return;
    }
    setIsModalOpen(true);
  };

  // 📅 Encontrar o agendamento mais próximo do dia atual
  const nextAppointment = useMemo(() => {
    const today = new Date();
    const allDates = Object.keys(appointments);
    if (allDates.length === 0) return null;

    // Filtrar apenas datas futuras ou de hoje
    const futureDates = allDates
      .map((dateKey) => new Date(dateKey))
      .filter((date) => date >= today)
      .sort((a, b) => a - b);

    if (futureDates.length === 0) return null;

    const closestDate = futureDates[0];
    const dateKey = closestDate.toISOString().split("T")[0];
    const appointmentsOnDate = appointments[dateKey];

    if (!appointmentsOnDate || appointmentsOnDate.length === 0) return null;

    // Pega o mais cedo do dia
    const next = [...appointmentsOnDate].sort((a, b) =>
      a.time.localeCompare(b.time)
    )[0];

    return {
      date: closestDate.toLocaleDateString("pt-BR"),
      ...next,
    };
  }, [appointments]);

  return (
    <main>
      <header>
        <h1>Bem-vindo de volta, {name}</h1>
      </header>

      <Agenda
        selectedDate={selectedDate}
        onSelectedDate={setSelectedDate}
        appointments={appointments}
      />

      {/* InfoBox com o próximo agendamento */}
      <div className="info-container">
        {nextAppointment ? (
          <InfoBox
            title="Próximo Agendamento"
            content={`📅 ${nextAppointment.date} - ${nextAppointment.time}\n📝 ${nextAppointment.title}`}
          />
        ) : (
          <InfoBox
            title="Próximo Agendamento"
            content="Nenhum agendamento futuro encontrado."
          />
        )}
      </div>

      {/* Botão de Novo Agendamento */}
      <div className="agendar">
        <NvAgendamento
          onOpenModal={handleStartNewAppointment}
          disabled={!selectedDate}
        />
      </div>

      {/* Modal de agendamento */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              Novo Agendamento em {selectedDate?.toLocaleDateString("pt-BR")}
            </h3>

            <input
              type="text"
              placeholder="Título"
              value={newAppointment.title}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, title: e.target.value })
              }
            />
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, time: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button onClick={handleSaveAppointment}>Salvar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ContCent;
