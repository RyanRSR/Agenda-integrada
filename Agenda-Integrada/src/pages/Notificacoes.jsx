function Notificacoes() {
  const notificacoes = [
    { msg: "Lembrete: Agendamento amanhã as 15h." },
    { msg: "Consulta confirmada para dia 20/10 as 10h." },
  ];

  return (
    <main>
      <h1>Notificações</h1>
      <ul className="notificacoes-lista">
        {notificacoes.map((n, i) => (
          <li key={i}>{n.msg}</li>
        ))}
      </ul>
    </main>
  );
}

export default Notificacoes;
