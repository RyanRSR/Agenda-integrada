import { useState, useEffect } from "react";

function User() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
  };

  const handleClear = () => {
    setUser({ nome: "", email: "", telefone: "" });
    localStorage.removeItem("userData");
  };

  return (
    <main className="user-page">
      <h1>Informações do Usuário</h1>
      <form className="user-form">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={user.nome}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="telefone">Telefone:</label>
        <input
          type="tel"
          name="telefone"
          id="telefone"
          value={user.telefone}
          onChange={handleChange}
        />

        <div className="user-actions">
          <button type="button" onClick={() => alert("Dados salvos!")}>
            Salvar
          </button>
          <button type="button" onClick={handleClear}>
            Limpar dados
          </button>
        </div>
      </form>
    </main>
  );
}

export default User;
