function Relatorios() {
  const relatorios = [
    {
      data: "10/10/2025",
      descricao: "Consulta de rotina — Tudo normal",
      profissional: "Dr. João",
    },
    {
      data: "03/09/2025",
      descricao: "Retorno médico — Ajustes leves",
      profissional: "Dra. Ana",
    },
  ];

  return (
    <main className="relatorios-page">
      <h1>Relatorios</h1>
      {relatorios.length > 0 ? (
        <ul className="relatorios-lista">
          {relatorios.map((r, i) => (
            <li key={i} className="relatorio-card">
              <div className="relatorio-info">
                <span className="relatorio-data">{r.data}</span>
                <p className="relatorio-descricao">{r.descricao}</p>
                <p className="relatorio-profissional">{r.profissional}</p>
              </div>
              <div className="relatorio-acoes">
                <button title="Vizualizar">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
                <button title="Baixar PDF">
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sem-relatorios">Nenhum relatório disponível.</p>
      )}
    </main>
  );
}

export default Relatorios;
