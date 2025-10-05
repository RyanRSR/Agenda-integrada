import Agenda from "./Agenda";
import InfoBox from "./InfoBox";
function ContCent({ name }) {
  return (
    <main>
      <header>
        <h1>Bem vindo de volta {name}</h1>
      </header>

      <Agenda />

      <div className="info-container">
        <InfoBox title="Prox-Agendamento" content="Seção-prox" />
        <InfoBox title="Mais-info" content="info" />
      </div>
    </main>
  );
}

export default ContCent;
