import { useState, useMemo, useEffect } from "react";
import Agenda from "./Agenda";
import InfoBox from "./InfoBox";
import NvAgendamento from "./NvAgendamento";

function ContCent({ name, setIsModalOpen, isModalOpen }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ title: "", time: "" });
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);

  // Carrega agendamentos ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  // Salva agendamentos quando appointments é alterado
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Normaliza a data
  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toLocaleDateString("en-CA");
  };

  // Salvar agendamento dentro do modal e envia para o Infobox
  const handleSaveAppointment = () => {
    if (newAppointment.title.trim() && newAppointment.time) {
      const dateKey = selectedDate;

      setAppointments((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newAppointment],
      }));

      setIsModalOpen(false);
      setNewAppointment({ title: "", time: "" });
    }
  };

  // Abrir modal no desktop
  const handleStartNewAppointment = () => {
    if (!selectedDate) {
      alert("Por favor, selecione uma data no calendário.");
      return;
    }
    setIsModalOpen(true);
  };

  // Selecionar data corretamente
  const handleSelectedDate = (date) => {
    if (!date) {
      setSelectedDate(null);
      return;
    }

    const normalized = normalizeDate(date);

    if (selectedDate === normalized) {
      setSelectedDate(null);
      return;
    }

    setSelectedDate(normalized);

    if (window.innerWidth <= 767) {
      setIsModalOpen(true);
    }
  };

  // Próximo agendamento
  const nextAppointment = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allDates = Object.keys(appointments);
    if (allDates.length === 0) return null;

    const futureDates = allDates
      .map((key) => new Date(key + "T00:00:00"))
      .filter((date) => date >= today)
      .sort((a, b) => a - b);

    if (futureDates.length === 0) return null;

    const closestDate = futureDates[0];
    const dateKey = closestDate.toLocaleDateString("en-CA");
    const appointmentsOnDate = appointments[dateKey];

    if (!appointmentsOnDate || appointmentsOnDate.length === 0) return null;

    const next = [...appointmentsOnDate].sort((a, b) =>
      a.time.localeCompare(b.time)
    )[0];

    return {
      date: closestDate.toLocaleDateString("pt-BR"),
      ...next,
    };
  }, [appointments]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="agenda-page">
      <header>
        <h1>Bem-vindo de volta, {name}</h1>
      </header>

      <Agenda
        selectedDate={selectedDate}
        onSelectedDate={handleSelectedDate}
        appointments={appointments}
      />

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

      <div className="agendar">
        <NvAgendamento
          onOpenModal={handleStartNewAppointment}
          disabled={!selectedDate}
        />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              Novo Agendamento em{" "}
              {selectedDate &&
                new Date(selectedDate).toLocaleDateString("pt-BR")}
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
