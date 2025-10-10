import Agenda from "./Agenda";
import InfoBox from "./InfoBox";
import NvAgendamento from "./NvAgendamento";
import { useState } from "react";
function ContCent({ name }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ title: "", time: "" });

  const handleSaveAppointment = () => {
    if (newAppointment.title.trim() && newAppointment.time) {
      console.log("Novo agendamento:", {
        date: setSelectedDate,
        ...newAppointment,
      });
      setIsModalOpen(false);
      setNewAppointment({ title: "", time: "" });
    }
  };

  return (
    <main>
      <header>
        <h1>Bem vindo de volta {name}</h1>
      </header>

      <Agenda selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="info-container">
        <InfoBox title="Prox-Agendamento" content="Seção-prox" />
        <InfoBox title="Mais-info" content="info" />
      </div>

      <div className="Agendar">
        <NvAgendamento onOpenModal={() => setIsModalOpen(true)} />
      </div>

      {/*Modal*/}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Novo Agendamento</h3>
            <input
              type="text"
              placeholder="Titulo"
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
              <button>Salvar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ContCent;
