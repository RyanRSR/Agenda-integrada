function Agenda() {
  return (
    <section id="agenda">
      <h2>Agenda</h2>
      <div id="month-container">
        <h3 id="month">...</h3>
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="material-symbols-outlined">arrow_forward</span>
      </div>
      <div>
        <ul id="weekdays">
          <li>Dom</li>
          <li>Seg</li>
          <li>Ter</li>
          <li>Qua</li>
          <li>Qui</li>
          <li>Sex</li>
          <li>Sab</li>
        </ul>
        <ul className="days"></ul>
      </div>
    </section>
  );
}

export default Agenda;
