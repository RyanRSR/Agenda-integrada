import { useState } from "react";

function User() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  return (
    <main>
      <h1>Informações do Usuário</h1>
      <form className="user-form">
        <label>Nome:</label>
        <input
          type="text"
          value={user.nome}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
        />
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label>Telefone:</label>
        <input
          type="tel"
          value={user.telefone}
          onChange={(e) => setUser({ ...user, telefone: e.target.value })}
        />
      </form>
    </main>
  );
}

export default User;
