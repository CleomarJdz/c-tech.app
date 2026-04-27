import React, { useState } from "react";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Carrinho({ carrinho, removerDoCarrinho, limparCarrinho }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // 'pix' | 'card'

  // PIX form state
  const [pixName, setPixName] = useState("");
  const [pixCpf, setPixCpf] = useState("");
  const [pixConfirmed, setPixConfirmed] = useState(false);

  // Card form state
  const [cardType, setCardType] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardCpf, setCardCpf] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardConfirmed, setCardConfirmed] = useState(false);

  const pixKey = "42999977925";
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  async function submitOrder(method, customerData) {
    try {
      const payload = {
        items: itens,
        total: method === 'pix' ? Number(totalPix) : Number(total),
        payment_method: method,
        customer: customerData || null,
      };

      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error('Erro ao enviar pedido', await res.text());
        return null;
      }
      return await res.json();
    } catch (err) {
      console.error('Erro ao enviar pedido', err);
      return null;
    }
  }

  function generatePixPayload(amount, name, cpf) {
    // Simple human-readable payload for demo purposes. For production use a proper EMV BR code generator.
    const v = Number(amount).toFixed(2);
    return `PIX|chave=${pixKey}|valor=${v}|nome=${name || ''}|cpf=${cpf || ''}`;
  }

  function qrForPayload(payload) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(payload)}`;
  }
  const agrupado = carrinho.reduce((acc, item) => {
    const key = item.id ?? item.nome;
    if (!acc[key]) acc[key] = { ...item, quantidade: 0 };
    acc[key].quantidade += 1;
    return acc;
  }, {});

  const itens = Object.values(agrupado);
  const total = itens.reduce((s, it) => s + (it.preco || 0) * it.quantidade, 0);

  // Checkout calculations
  const pixDiscount = 0.07; // 7% off
  const totalPix = total - total * pixDiscount;
  const parcelas = 10; // 10x sem juros
  const parcelaValor = total / parcelas;

  return (
    <div
      style={{
        paddingTop: 90,
        padding: "24px",
        minHeight: "calc(100vh - 64px)",
        background: "var(--ice-white)",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "var(--ctech-blue)" }}>Carrinho de Compras 🧾</h1>

      {itens.length === 0 ? (
        <p style={{ marginTop: 20 }}>Seu carrinho está vazio.</p>
      ) : (
        <div style={{ width: "92%", margin: "20px auto" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {itens.map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "var(--card-bg)",
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 8,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <img src={item.imagem} alt={item.nome} style={{ width: 64, height: 48, objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ textAlign: "left" }}>
                    <strong>{item.nome}</strong>
                    <div style={{ color: "var(--text-dark)", fontSize: 14 }}>{formatPrice(item.preco)} x {item.quantidade}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ fontWeight: 700 }}>{formatPrice(item.preco * item.quantidade)}</div>
                  <button onClick={() => removerDoCarrinho(item)} style={{ background: "var(--ice-bg)", padding: "6px 8px", borderRadius: 6 }}>Remover</button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ textAlign: "right", marginTop: 12 }}>
            <div style={{ marginBottom: 6 }}><strong>Subtotal: {formatPrice(total)}</strong></div>
            <div style={{ marginBottom: 6, color: "var(--ctech-blue-700)" }}><strong>PIX (7% off): {formatPrice(totalPix)}</strong></div>
            <div style={{ marginBottom: 6, color: "var(--text-dark)" }}><strong>Cartão 10x sem juros: {formatPrice(parcelaValor)} / parcela</strong></div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
            <button onClick={() => setShowCheckout(true)} style={{ background: "var(--ctech-blue)", color: "white", padding: "10px 14px", borderRadius: 8 }}>Finalizar Compra</button>

            <button onClick={limparCarrinho} style={{ background: "var(--ctech-blue-700)", color: "white", padding: "10px 14px", borderRadius: 8 }}>Limpar Carrinho</button>
          </div>
        </div>
      )}

      {/* Checkout modal */}
      {showCheckout && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 120 }} onClick={() => { setShowCheckout(false); setPaymentMethod(null); }}>
          <div style={{ width: 720, maxWidth: '96%', background: 'var(--card-bg)', padding: 20, borderRadius: 10 }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Escolha o método de pagamento</h2>

            {!paymentMethod && (
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-start' }}>
                <button onClick={() => setPaymentMethod('pix')} style={{ background: 'var(--ctech-blue-700)', color: '#fff', padding: '10px 14px', borderRadius: 8 }}>PIX (7% off)</button>
                <button onClick={() => setPaymentMethod('card')} style={{ background: 'var(--ctech-blue)', color: '#fff', padding: '10px 14px', borderRadius: 8 }}>Cartão de Crédito/Débito</button>
                <button onClick={() => { setShowCheckout(false); setPaymentMethod(null); }} style={{ background: 'var(--ice-bg)', padding: '10px 14px', borderRadius: 8 }}>Cancelar</button>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div style={{ marginTop: 12 }}>
                {!pixConfirmed ? (
                  <div>
                    <p>Valor a pagar (PIX, já com desconto): <strong>{formatPrice(totalPix)}</strong></p>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      Nome completo
                      <input value={pixName} onChange={(e) => setPixName(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6, border: '1px solid var(--card-border)' }} />
                    </label>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      CPF
                      <input value={pixCpf} onChange={(e) => setPixCpf(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6, border: '1px solid var(--card-border)' }} />
                    </label>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
                      <button onClick={() => { setPaymentMethod(null); setPixName(''); setPixCpf(''); }} style={{ background: 'var(--ice-bg)', padding: '8px 12px', borderRadius: 6 }}>Voltar</button>
                      <button onClick={() => {
                          if (!pixName || !pixCpf) { alert('Preencha nome e CPF para continuar.'); return; }
                          setPixConfirmed(true);
                        }} style={{ background: 'var(--ctech-blue)', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>Confirmar Compra</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>QR code para pagamento PIX (chave: <strong>{pixKey}</strong>)</p>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <img src={qrForPayload(generatePixPayload(totalPix, pixName, pixCpf))} alt="QR PIX" style={{ width: 220, height: 220, background: 'var(--qr-bg)', padding: 8, borderRadius: 6 }} />
                      <div style={{ flex: 1 }}>
                        <p><strong>Nome:</strong> {pixName}</p>
                        <p><strong>CPF:</strong> {pixCpf}</p>
                        <p><strong>Valor:</strong> {formatPrice(totalPix)}</p>
                        <p><strong>Chave PIX:</strong> {pixKey} <button onClick={() => { navigator.clipboard?.writeText(pixKey); alert('Chave PIX copiada'); }} style={{ marginLeft: 8, padding: '6px 8px' }}>Copiar</button></p>
                        <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <button onClick={() => { setPixConfirmed(false); }} style={{ background: 'var(--ice-bg)', padding: '8px 12px', borderRadius: 6 }}>Voltar</button>
                            <button onClick={async () => {
                              // send to backend then clear
                              await submitOrder('pix', { name: pixName, cpf: pixCpf });
                              alert('Pagamento confirmado (simulado). Obrigado!');
                              limparCarrinho(); setShowCheckout(false); setPaymentMethod(null); setPixConfirmed(false);
                            }} style={{ background: 'var(--ctech-blue-700)', color: 'var(--button-foreground)', padding: '8px 12px', borderRadius: 6 }}>Concluir</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'card' && (
              <div style={{ marginTop: 12 }}>
                {!cardConfirmed ? (
                  <div>
                    <p>Valor a pagar: <strong>{formatPrice(total)}</strong></p>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      Tipo
                      <select value={cardType} onChange={(e) => setCardType(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6 }}>
                        <option value="credit">Crédito</option>
                        <option value="debit">Débito</option>
                      </select>
                    </label>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      Número do cartão
                      <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6, border: '1px solid var(--card-border)' }} />
                    </label>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      Nome no cartão
                      <input value={cardName} onChange={(e) => setCardName(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6 }} />
                    </label>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      CPF
                      <input value={cardCpf} onChange={(e) => setCardCpf(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6 }} />
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <label style={{ flex: 1 }}>
                        Validade (MM/AA)
                        <input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/AA" style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6 }} />
                      </label>
                      <label style={{ width: 120 }}>
                        CVC
                        <input value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} placeholder="CVC" style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6 }} />
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                      <button onClick={() => { setPaymentMethod(null); }} style={{ background: 'var(--ice-bg)', padding: '8px 12px', borderRadius: 6 }}>Voltar</button>
                          <button onClick={() => {
                              if (!cardNumber || !cardName || !cardCpf) { alert('Preencha os dados do cartão para continuar.'); return; }
                              setCardConfirmed(true);
                            }} style={{ background: 'var(--ctech-blue)', color: 'var(--button-foreground)', padding: '8px 12px', borderRadius: 6 }}>Confirmar Pagamento</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>Pagamento com cartão processado (simulado).</p>
                    <p><strong>{cardType === 'credit' ? 'Crédito' : 'Débito'}</strong> • {cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : ''}</p>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                      <button onClick={() => setCardConfirmed(false)} style={{ background: 'var(--ice-bg)', padding: '8px 12px', borderRadius: 6 }}>Voltar</button>
                          <button onClick={async () => {
                            await submitOrder('card', { name: cardName, cpf: cardCpf });
                            alert('Pagamento confirmado (simulado). Obrigado!');
                            limparCarrinho(); setShowCheckout(false); setPaymentMethod(null); setCardConfirmed(false);
                          }} style={{ background: 'var(--ctech-blue-700)', color: 'var(--button-foreground)', padding: '8px 12px', borderRadius: 6 }}>Concluir</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
