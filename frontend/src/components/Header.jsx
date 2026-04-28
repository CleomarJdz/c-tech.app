import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu as MenuIcon, SunDim, Moon } from "lucide-react";

import Logo from "../assets/c-tech-logo.svg";

export default function Header({ carrinho }) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("ctech:theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("ctech:theme", theme); } catch (e) {}
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="hamburger" aria-label="Abrir menu" onClick={() => setMenuOpen((v) => !v)}>
          <MenuIcon size={20} />
        </button>

        <Link to="/" className="brand">
          <img src={Logo} alt="C-Tech" style={{ height: 40 }} />
        </Link>

        <nav className="main-nav">
          <Link to="/produtos" className="nav-link">Produtos</Link>
        </nav>
      </div>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === "dark" ? <SunDim size={16} /> : <Moon size={16} />}
        </button>

        <button onClick={() => setOpen(true)} className="link-button">Conta</button>

        <Link to="/carrinho" className="cart-link">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShoppingCart size={18} />
            <span style={{ fontWeight: 700 }}>{carrinho.length}</span>
          </div>
        </Link>
      </div>

      {menuOpen && (
        <div className="side-menu" role="dialog" aria-label="Menu principal">
          <ul>
            <li><Link to="/conta" onClick={() => { setMenuOpen(false); navigate('/conta'); }}>Conta</Link></li>
            <li><Link to="/carrinho" onClick={() => { setMenuOpen(false); navigate('/carrinho'); }}>Carrinho ({carrinho.length})</Link></li>
          </ul>
        </div>
      )}

      {open && (
        <div style={modalOverlayStyle} onClick={() => setOpen(false)}>
          <div style={{ ...modalStyle, background: 'var(--card-bg)' }} onClick={(e) => e.stopPropagation()}>
            <h3>Entrar ou Registrar</h3>
            <p style={{ color: "var(--text-dark)" }}>Você pode entrar ou criar uma conta rapidamente.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Link to="/conta" onClick={() => setOpen(false)} style={buttonLinkStyle}>Ir para Conta</Link>
              <button onClick={() => setOpen(false)} style={{ ...btn, background: "var(--ice-bg)" }}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* small styles for header modal and helpers kept here */
const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};

const modalStyle = {
  padding: 20,
  borderRadius: 8,
  width: 360,
  boxShadow: "0 8px 24px rgba(2,6,23,0.4)",
};

const buttonLinkStyle = {
  padding: "8px 12px",
  background: "var(--ctech-blue)",
  color: "#fff",
  textDecoration: "none",
  borderRadius: 6,
  fontWeight: 700,
};

const btn = {
  padding: "8px 12px",
  borderRadius: 6,
  border: "none",
};
