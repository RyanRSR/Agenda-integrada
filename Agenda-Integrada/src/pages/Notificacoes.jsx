function Notificacoes() {
  const notificacoes = [
    { msg: "🔔 Lembrete: Agendamento amanhã às 15h." },
    { msg: "✅ Consulta confirmada para dia 20/10 às 10h." },
  ];

  return (
    <main className="notificacoes-page">
      <h1>Notificações</h1>
      {notificacoes.length > 0 ? (
        <ul className="notificacoes-lista">
          {notificacoes.map((n, i) => (
            <li key={i} className="notificacao-item">
              <span className="material-symbols-outlined">notifications</span>
              <p>{n.msg}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sem-notificacoes">Nenhuma notificação no momento.</p>
      )}
    </main>
  );
}

export default Notificacoes;
