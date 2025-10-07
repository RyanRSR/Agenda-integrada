import { useState } from "react";

function Agenda() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  // Pegar o primeiro dia do mês e a quantidade de dias
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // <- .getDay() era necessário
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Gerar matriz de dias do mês
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(""); // adiciona espaços em branco antes do primeiro dia
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

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
    setCurrentYear(newYear); // <- antes você tinha setCurrentMonth(newYear)
  };

  return (
    <div className="calendar-container">
      {/* Cabeçalho do calendário */}
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <h2>{monthNames[currentMonth]} {currentYear}</h2>

        <button onClick={() => changeMonth(1)}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {/* Dias da semana */}
      <div className="calendar-grid">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}

        {/* Dias do mês */}
        {days.map((day, index) => {
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div 
              key={index}
              className={`day ${isToday ? "today" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Agenda;
