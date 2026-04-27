import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // biblioteca de ícones
// Instale se quiser: npm install lucide-react

export default function Header({ carrinho }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#212121",
        color: "#fff",
      }}
    >
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>
          Início
        </Link>
        <Link to="/produtos" style={linkStyle}>
          Produtos
        </Link>
      </nav>

      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/conta" style={linkStyle}>
          Conta
        </Link>
        <Link to="/carrinho" style={linkStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ShoppingCart size={20} />
            <span>{carrinho.length}</span>
          </div>
        </Link>
      </nav>
    </header>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
};
