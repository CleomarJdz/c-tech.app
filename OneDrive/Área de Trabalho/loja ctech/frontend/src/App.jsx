import React, { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/inicio.jsx";
import Produtos from "./pages/Produtos.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Conta from "./pages/Conta.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = useCallback(
    (produto) => {
      setCarrinho((c) => [...c, produto]);
    },
    [setCarrinho]
  );

  const removerDoCarrinho = useCallback(
    (produto) => {
      setCarrinho((c) => {
        const idx = c.findIndex((p) => (p.id && produto.id ? p.id === produto.id : p.nome === produto.nome));
        if (idx === -1) return c;
        const copy = [...c];
        copy.splice(idx, 1);
        return copy;
      });
    },
    [setCarrinho]
  );

  const limparCarrinho = useCallback(() => setCarrinho([]), [setCarrinho]);

  return (
    <div>
      <Header carrinho={carrinho} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos adicionarAoCarrinho={adicionarAoCarrinho} />} />
        <Route path="/carrinho" element={<Carrinho carrinho={carrinho} removerDoCarrinho={removerDoCarrinho} limparCarrinho={limparCarrinho} />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
