import ProfBox from "../Components/ProfBox";

function Profissionais() {
  return (
    <main>
      <h1>Profissionais</h1>
      <div className="prof-container">
        <ProfBox name="Dra. Ana Souza" role="Psicóloga" />
        <ProfBox name="Dr. João Lima " role="Fisioterapeuta" />
        <ProfBox name="Dra. Camila Torres" role="Nutricionista" />
      </div>
    </main>
  );
}

export default Profissionais;
