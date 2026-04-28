# 1. Documento de Estratégia de Testes
Este documento descreve a estratégia de testes do projeto C-Tech, incluindo funcionalidades principais,
regras de negócio e casos de teste em linguagem natural.


# 2. Funcionalidades Principais
1. Login de usuário
2. Cadastro de produto
3. Geração de relatório


# 3. Regras de Negócio
Login: e-mail deve ser único e senha mínima de 8 caracteres.
Cadastro de produto: preço deve ser maior que 0 e estoque maior ou igual a 0.
Relatórios: apenas usuários autenticados podem acessar.


# 4. Casos de Teste (Linguagem Natural)

* CT-01: Login com dados válidos
Pré-condição: Usuário cadastrado
Entrada: E-mail válido e senha correta
Ação: Clicar em "Entrar"
Resultado esperado: Redirecionamento para dashboard
Tipo: Integração

* CT-02: Login com senha inválida
Resultado esperado: Mensagem de erro
Tipo: Unitário

* CT-03: Cadastro de produto válido
Pré-condição: Usuário autenticado como admin
Entrada: Nome, preço > 0, estoque >= 0
Ação: POST /produtos
Resultado esperado: Status 201 e produto salvo
Tipo: Integração

* CT-04: Cadastro com preço negativo
Resultado esperado: Status 400 e erro
Tipo: Unitário

* CT-05: Gerar relatório autenticado
Resultado esperado: Relatório exibido
Tipo: E2E

* CT-06: Acesso sem login
Resultado esperado: Acesso negado
Tipo: E2E


# 5. Classificação dos Testes
Unitário: validações isoladas
Integração: comunicação entre camadas
E2E: fluxo completo do sistema
