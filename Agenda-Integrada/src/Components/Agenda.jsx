import { useState } from "react";

function Agenda() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null); // corrigido nome padrão
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    time: "",
  });

  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  // Pegar o primeiro dia e quantidade de dias
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Criar lista de dias
  const days = [];

  // Dias do mês anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isPrevMonth: true });
  }

  // Dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isPrevMonth: false });
  }

  // Mudar o mês
  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleDayClick = (day) => {
    if (!day.isPrevMonth) {
      setSelectedDate(day.day);
      setIsModalOpen(true);
    }
  };

  const handleSaveAppointment = () => {
    if (newAppointment.title.trim() && newAppointment.time.trim()) {
      setAppointments([
        ...appointments,
        {
          date: `${selectedDate}/${currentMonth + 1}/${currentYear}`,
          ...newAppointment,
        },
      ]);
      setNewAppointment({ title: "", time: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="calendar-container">
      {/* Cabeçalho */}
      <div className="calendar-header">
        <h2>Agendamentos</h2>

        <button onClick={() => changeMonth(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <h2>
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button onClick={() => changeMonth(1)}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {/* Dias da semana */}
      <div className="calendar-grid">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, index) => (
          <div key={index} className="weekday">
            {d}
          </div>
        ))}

        {/* Dias do calendário */}
        {days.map((d, index) => {
          const isToday =
            d.day === today.getDate() &&
            !d.isPrevMonth &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div
              key={index}
              className={`day
                ${isToday ? "today" : ""}
                ${d.isPrevMonth ? "prev-month" : ""}
                ${selectedDate === d.day && !d.isPrevMonth ? "selected" : ""}
              `}
              onClick={() => handleDayClick(d)}
            >
              {d.day}
            </div>
          );
        })}
      </div>
      {/*Modal Simples*/}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              Novo agendamento - {selectedDate}/{currentMonth + 1}
            </h3>
            <input
              type="text"
              placeholder="Titulo do agendamento"
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
    </div>
  );
}

export default Agenda;
