import { useState } from "react";

function Agenda({ onSelectedDate, selectedDate, appointments }) {
  const today = new Date();

  // Controla o mês e ano exibidos no calendário
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

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

  // Normaliza datas para evitar problemas de timezone e manter o padrão yyyy-mm-dd
  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toLocaleDateString("en-CA");
  };

  // Informações do mês atual
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const days = [];

  // Preenche o início do calendário com dias do mês anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isPrevMonth: true });
  }

  // Dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isPrevMonth: false });
  }

  // Ajusta mês exibido (inclui transição de dezembro -> janeiro)
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

  // Seleciona dia (ignora dias do mês anterior)
  const handleDayClick = (day) => {
    if (day.isPrevMonth) return;
    onSelectedDate(new Date(currentYear, currentMonth, day.day));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-title">Agendamentos</h2>

        <div className="time-zone">
          <button onClick={() => changeMonth(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <h2 className="date-label">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <button onClick={() => changeMonth(1)}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {/* Cabeçalho dos dias da semana */}
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, index) => (
          <div key={index} className="weekday">
            {d}
          </div>
        ))}

        {/* Renderização dos dias do mês */}
        {days.map((d, index) => {
          const dayDate = d.isPrevMonth
            ? new Date(currentYear, currentMonth - 1, d.day)
            : new Date(currentYear, currentMonth, d.day);

          const isToday =
            !d.isPrevMonth && dayDate.toDateString() === today.toDateString();

          const dateKey = normalizeDate(dayDate);
          const isSelected = selectedDate === dateKey;
          const hasAppointment =
            !d.isPrevMonth &&
            appointments[dateKey] &&
            appointments[dateKey].length > 0;

          return (
            <div
              key={index}
              className={`day
                ${isToday ? "today" : ""}
                ${d.isPrevMonth ? "prev-month" : ""}
                ${isSelected ? "selected" : ""}
                ${hasAppointment ? "has-appointment" : ""}`}
              onClick={() => handleDayClick(d)}
            >
              <div className="day-number">
                {d.day}
                {hasAppointment && <div className="dot"></div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Agenda;
