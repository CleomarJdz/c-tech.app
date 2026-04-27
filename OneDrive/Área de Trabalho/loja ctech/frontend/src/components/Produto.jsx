import React from "react";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Produto({ nome, preco, imagem, onAdicionar }) {
  return (
    <div
      style={{
        border: "1px solid var(--card-border)",
        borderRadius: 12,
        padding: 12,
        width: 220,
        textAlign: "center",
        background: "var(--card-bg)",
        boxShadow: "0 6px 18px rgba(10,40,80,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ height: 140, overflow: "hidden", borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ice-bg)' }}>
        <img
          src={imagem}
          alt={nome}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ color: "var(--text-dark)", margin: "8px 0 6px", fontSize: 16 }}>{nome}</h3>
        <p style={{ color: "var(--ctech-blue)", fontWeight: "700", margin: 0 }}>{formatPrice(preco)}</p>
      </div>

      <button
        onClick={onAdicionar}
        style={{
          backgroundColor: "var(--ctech-blue)",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "10px 12px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
