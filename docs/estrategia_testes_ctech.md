# 1. Documento de Estratégia de Testes

Este documento descreve a estratégia de testes do projeto **C-Tech**, incluindo funcionalidades principais, regras de negócio e casos de teste em linguagem natural.

---

# 2. Funcionalidades Principais

- Login e cadastro de usuário  
- Compra de produtos  
- Finalização de compra  

---

# 3. Regras de Negócio

## Login e Cadastro
- O e-mail deve ser único no sistema.  
- A senha deve possuir no mínimo 8 caracteres.  
- Todos os campos obrigatórios devem ser preenchidos.  

## Compra de Produtos
- O produto deve possuir estoque disponível.  
- A quantidade comprada não pode ser menor que 1.  
- O carrinho deve atualizar valores automaticamente.  

## Finalização de Compra
- Apenas usuários autenticados podem finalizar compras.  
- O pedido só pode ser concluído com endereço preenchido.  
- O pagamento deve ser validado antes da confirmação.  

---

# 4. Casos de Teste (Linguagem Natural)

## CT-01: Login com dados válidos

**Pré-condição:** Usuário cadastrado  
**Entrada:** E-mail válido e senha correta  
**Ação:** Clicar em "Entrar"  
**Resultado esperado:** Redirecionamento para página inicial  
**Tipo:** Integração  

---

## CT-02: Login com senha inválida

**Pré-condição:** Usuário cadastrado  
**Entrada:** E-mail válido e senha incorreta  
**Ação:** Clicar em "Entrar"  
**Resultado esperado:** Mensagem de erro informando credenciais inválidas  
**Tipo:** Unitário  

---

## CT-03: Cadastro com dados válidos

**Entrada:** Nome, e-mail válido e senha com 8 caracteres ou mais  
**Ação:** Clicar em "Cadastrar"  
**Resultado esperado:** Usuário criado com sucesso  
**Tipo:** Integração  

---

## CT-04: Cadastro com e-mail já existente

**Entrada:** E-mail já cadastrado no sistema  
**Ação:** Clicar em "Cadastrar"  
**Resultado esperado:** Mensagem informando e-mail já utilizado  
**Tipo:** Unitário  

---

## CT-05: Adicionar produto ao carrinho

**Pré-condição:** Produto com estoque disponível  
**Entrada:** Selecionar produto e quantidade válida  
**Ação:** Clicar em "Adicionar ao Carrinho"  
**Resultado esperado:** Produto adicionado ao carrinho com sucesso  
**Tipo:** Integração  

---

## CT-06: Comprar produto sem estoque

**Pré-condição:** Produto sem estoque  
**Entrada:** Selecionar produto  
**Ação:** Tentar adicionar ao carrinho  
**Resultado esperado:** Mensagem de produto indisponível  
**Tipo:** Unitário  

---

## CT-07: Finalizar compra autenticado

**Pré-condição:** Usuário logado e carrinho com produtos  
**Entrada:** Dados de endereço e pagamento válidos  
**Ação:** Clicar em "Finalizar Compra"  
**Resultado esperado:** Pedido criado com sucesso e confirmação exibida  
**Tipo:** E2E  

---

## CT-08: Finalizar compra sem login

**Pré-condição:** Usuário não autenticado  
**Entrada:** Carrinho com produtos  
**Ação:** Clicar em "Finalizar Compra"  
**Resultado esperado:** Redirecionamento para tela de login  
**Tipo:** E2E  

---

## CT-09: Finalizar compra sem endereço

**Pré-condição:** Usuário autenticado  
**Entrada:** Pagamento informado, sem endereço preenchido  
**Ação:** Clicar em "Finalizar Compra"  
**Resultado esperado:** Mensagem solicitando preenchimento do endereço  
**Tipo:** Unitário  

---

# 5. Classificação dos Testes

- **Unitário:** validações isoladas de campos e regras de negócio.  
- **Integração:** comunicação entre frontend, backend e banco de dados.  
- **E2E:** fluxo completo do usuário no sistema.  