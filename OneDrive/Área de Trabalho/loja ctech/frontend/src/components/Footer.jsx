import React from "react";

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  const estilo = {
    footer: {
      textAlign: "center",
      backgroundColor: "#ffffffff",
      padding: "10px 0",
      fontSize: "14px",
      color: "#333",
      width: "100%",
      position: "fixed",
      bottom: 0,
      left: 0,
    },
  };

  return (
    <footer style={estilo.footer}>
      <p>© {anoAtual} Cleomar Dziurkowski. Todos os direitos reservados.</p>
    </footer>
  );
}
