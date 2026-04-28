import React, { useState } from "react";

function Input({ label, ...props }) {
  return (
    <label style={{ display: "block", marginBottom: 10, textAlign: "left" }}>
      <div style={{ fontSize: 13, color: "var(--text-dark)" }}>{label}</div>
      <input {...props} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--card-border)" }} />
    </label>
  );
}

export default function Conta() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Em um app real, aqui faria chamada à API; por enquanto apenas mostra um alerta.
    alert(`${mode === "login" ? "Entrando" : "Registrando"} com ${email}`);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 90, minHeight: "calc(100vh - 64px)", background: "var(--ice-white)" }}>
      <div style={{ width: 420, background: "var(--card-bg)", padding: 24, borderRadius: 8, boxShadow: "0 6px 18px rgba(2,6,23,0.08)" }}>
        <h2 style={{ color: "var(--text-dark)", marginBottom: 6 }}>{mode === "login" ? "Entrar" : "Registrar"}</h2>
        <p style={{ color: "var(--text-dark)", marginBottom: 12 }}>{mode === "login" ? "Acesse sua conta" : "Crie sua conta"}</p>

        <form onSubmit={handleSubmit}>
          <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="submit" style={{ background: "var(--ctech-blue)", color: "#fff", padding: "10px 12px", borderRadius: 6, border: "none", fontWeight: 700 }}>
              {mode === "login" ? "Entrar" : "Registrar"}
            </button>
            <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid var(--card-border)", background: "var(--card-bg)" }}>
              {mode === "login" ? "Criar conta" : "Já tenho conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
