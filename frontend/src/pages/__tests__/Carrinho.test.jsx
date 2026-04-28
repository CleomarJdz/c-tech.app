import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carrinho from '../Carrinho';

describe('Carrinho page', () => {
  test('abre modal de checkout ao clicar em Finalizar Compra', async () => {
    const user = userEvent.setup();
    const sampleItem = { id: 1, nome: 'Produto Teste', preco: 10.0, quantidade: 1, imagem: '' };
    const mockRemover = vi.fn();
    const mockLimpar = vi.fn();

    render(<Carrinho carrinho={[sampleItem]} removerDoCarrinho={mockRemover} limparCarrinho={mockLimpar} />);

    // botão Finalizar Compra deve estar visível
    const finalizarBtn = await screen.findByRole('button', { name: /Finalizar Compra/i });
    expect(finalizarBtn).toBeInTheDocument();

    // clicar e verificar que o modal aparece
    await user.click(finalizarBtn);
    expect(screen.getByText(/Escolha o método de pagamento/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /PIX \(7% off\)/i })).toBeInTheDocument();
  });
});
