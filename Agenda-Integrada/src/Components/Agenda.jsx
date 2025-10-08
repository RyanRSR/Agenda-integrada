import { useState } from "react";

function Agenda() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setselectedDate] = useState(null);

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

  // Pegar o primeiro dia do mês e a quantidade de dias
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Gerar matriz de dias do mês
  const days = [];

  // Dias do mês anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isPrevMonth: true,
    });
  }

  // Dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isPrevMonth: false,
    });
  }

  // Mudar os meses
  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div className="calendar-container">
      {/* Cabeçalho do calendário */}
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
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
          <div key={d} className="weekday">
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

          <div
            key={index}
            className={`day ${isToday ? "today" : ""} ${
              d.isPrevMonth ? "prev-month" : ""
            } ${selectedDate === d.day ? "selected" : ""}`}
            onClick={() => !d.isPrevMonth && setselectedDate(d.day)}
          >
            {d.day}
          </div>;
          return (
            <div
              key={index}
              className={`day ${isToday ? "today" : ""} ${
                d.isPrevMonth ? "prev-month" : ""
              }`}
            >
              {d.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Agenda;
