function Relatorios() {
  const relatorios = [
    { data: "10/10/2025", descricao: "Consulta de rotina- Tudo Normal" },
    { data: "03/09/2025", descricao: "Retorno médico - Ajustes leves" },
  ];

  return (
    <main>
      <h1>Relatórios</h1>
      <ul className="relatorios-lista">
        {relatorios.map((r, i) => (
          <li key={i}>
            <strong>{r.data}</strong>
            <p>{r.descricao}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Relatorios;
