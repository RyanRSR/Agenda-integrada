import { useState, useMemo } from "react";
import Agenda from "./Agenda";
import InfoBox from "./InfoBox";
import NvAgendamento from "./NvAgendamento";

function ContCent({ name }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ title: "", time: "" });
  const [appointments, setAppointments] = useState({});

  // 🔹 Função auxiliar: normaliza a data (zera hora e garante consistência)
  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toLocaleDateString("en-CA");
  };

  // 🔹 Salvar agendamento
  const handleSaveAppointment = () => {
    if (newAppointment.title.trim() && newAppointment.time) {
      const dateKey = normalizeDate(selectedDate);

      setAppointments((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newAppointment],
      }));

      setIsModalOpen(false);
      setNewAppointment({ title: "", time: "" });
    }
  };

  // 🔹 Abrir modal
  const handleStartNewAppointment = () => {
    if (!selectedDate) {
      alert("Por favor, selecione uma data no calendário.");
      return;
    }
    setIsModalOpen(true);
  };

  // 🔹 Encontrar o próximo agendamento (incluindo hoje)
  const nextAppointment = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allDates = Object.keys(appointments);
    if (allDates.length === 0) return null;

    // 🔥 Converte corretamente as datas salvas para comparação
    const futureDates = allDates
      .map((key) => new Date(key + "T00:00:00")) // adiciona hora fixa
      .filter((date) => date >= today)
      .sort((a, b) => a - b);

    if (futureDates.length === 0) return null;

    const closestDate = futureDates[0];
    const dateKey = closestDate.toLocaleDateString("en-CA");
    const appointmentsOnDate = appointments[dateKey];

    if (!appointmentsOnDate || appointmentsOnDate.length === 0) return null;

    // Pega o horário mais cedo do dia
    const next = [...appointmentsOnDate].sort((a, b) =>
      a.time.localeCompare(b.time)
    )[0];

    return {
      date: closestDate.toLocaleDateString("pt-BR"),
      ...next,
    };
  }, [appointments]);

  return (
    <main className="agenda-page">
      <header>
        <h1>Bem-vindo de volta, {name}</h1>
      </header>

      <Agenda
        selectedDate={selectedDate}
        onSelectedDate={setSelectedDate}
        appointments={appointments}
      />

      {/* 🔹 InfoBox com o próximo agendamento */}
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

      {/* 🔹 Botão de Novo Agendamento */}
      <div className="agendar">
        <NvAgendamento
          onOpenModal={handleStartNewAppointment}
          disabled={!selectedDate}
        />
      </div>

      {/* 🔹 Modal de agendamento */}
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
