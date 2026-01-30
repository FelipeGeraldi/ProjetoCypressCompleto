## Projeto de QA — Login (Cypress)

Este repositório contém os **artefatos de QA** para a funcionalidade de **Login** do ambiente de testes em `https://qa.navega.com.vc/login`, incluindo:

- **Casos de teste (caixa-preta)** com tabela + BDD
- **Automação E2E em Cypress + JavaScript**
- **Validações não-funcionais**: responsividade mobile, acessibilidade (a11y), segurança e performance
- **Bug report** (simulado/observado) usando o template do projeto
- **Proposta de melhoria** usando o template do projeto

---

## Estrutura do repositório

```text
cypress/
  e2e/
    login.cy.js
    login.responsive.mobile.cy.js
    login.accessibility.cy.js
    login.security.cy.js
    login.performance.cy.js
  fixtures/
  support/
    commands.js
    e2e.js
bugs/
  template.md
  bug-001-login-email-nao-cadastrado-sem-feedback.md
improvements/
  template.md
  melhoria-001-login-feedback-validacoes.md
test-cases/
  template.md
  test-cases.md

cypress.config.js
package.json
cypress.env.example.json
```

---

## Casos de teste (caixa-preta)

Os casos de teste foram documentados em:

- `test-cases/test-cases.md`

Conteúdo:
- **10 cenários** de Login (TC00001–TC00010) com **prioridade**
- Seção **BDD** com **10 cenários**, espelhando a tabela

---

## Automação (Cypress + JavaScript)

### Requisitos

- Node.js instalado

### Instalação

```bash
npm ci
```

### Configuração do ambiente (credenciais)

Alguns cenários dependem de credenciais reais do ambiente (quando o usuário/senha forem fornecidos):
- **TC00001** (login com sucesso)
- **TC00002** (senha inválida usando e-mail real)
- **TC00008** (trim no e-mail com login de sucesso)

Para configurar:

1) Copie `cypress.env.example.json` para `cypress.env.json`  
2) Preencha:
   - `USER_EMAIL`
   - `USER_PASSWORD`

> O arquivo `cypress.env.json` está no `.gitignore` para evitar versionar segredos.

### Padrões de automação adotados

- **Seletores estáveis** usando `data-test` (ex.: `username`, `password`, `submit`)
- **Comandos reutilizáveis** em `cypress/support/commands.js`:
  - `cy.visitLogin()`
  - `cy.getByDataTest(id)`
  - `cy.fillLoginEmail(email)`
  - `cy.fillLoginPassword(password)`
  - `cy.getLoginSubmitButton()`
  - `cy.submitLogin()`
- `baseUrl` configurado no `cypress.config.js` (`https://qa.navega.com.vc`)

---

## Specs implementados

### `login.cy.js` — Funcional (E2E)

Arquivo: `cypress/e2e/login.cy.js`

- Executa os **10 cenários** principais de Login (alinhados ao `test-cases/test-cases.md`)
- Sem credenciais, os cenários dependentes ficam **pendentes** (não falham)

### `login.responsive.mobile.cy.js` — Responsividade mobile

Arquivo: `cypress/e2e/login.responsive.mobile.cy.js`

Valida, em **14 variações** (7 portrait + 7 landscape):
- **Sem scroll horizontal** (sem overflow)
- Campos/botão/link essenciais **acessíveis e visíveis** (com `scrollIntoView`)

### `login.accessibility.cy.js` — Acessibilidade (a11y)

Arquivo: `cypress/e2e/login.accessibility.cy.js`

Valida:
- `html[lang]` configurado
- Elementos principais **focáveis** via teclado
- Auditoria com **axe-core** (WCAG 2A/2AA)  
  - Regra `color-contrast` desabilitada para evitar ruído/flakiness

### `login.security.cy.js` — Segurança (checks básicos)

Arquivo: `cypress/e2e/login.security.cy.js`

Valida:
- Página em **HTTPS**
- Campo senha `type="password"`
- Tentativa de login **não coloca credenciais na URL**
- Senha usada no teste **não é persistida** em `localStorage`/`sessionStorage`
- Sem **mixed content** (recursos `http://`)

Inclui checks **opcionais (skip)** para hardening (HSTS e CSP).

### `login.performance.cy.js` — Performance (budgets)

Arquivo: `cypress/e2e/login.performance.cy.js`

Valida:
- Tempo de navegação (budgets conservadores para ambiente de QA)
- Quantidade de recursos e tamanho total transferido (para detectar regressões grandes)

---

## Como executar

### Rodar tudo (headless)

```bash
npm test
```

### Rodar o login funcional

```bash
npm run cy:run:login
```

### Rodar no Chrome (headless)

```bash
npm run cy:run:login -- --browser chrome
```

### Rodar no Chrome com janela (não headless)

```bash
npm run cy:run:login:chrome
```

### Abrir o Cypress (UI)

```bash
npm run cy:open
```

### Rodar responsividade mobile

```bash
npm run cy:run:responsive:mobile
```

### Rodar acessibilidade / segurança / performance

```bash
npm run cy:run:a11y
npm run cy:run:security
npm run cy:run:performance
```

---

## Bug report

Bug report criado a partir do template em:

- `bugs/bug-001-login-email-nao-cadastrado-sem-feedback.md`

Resumo: tentativa de login com e-mail não cadastrado pode resultar em **falha silenciosa** (sem mensagem de erro visível).

---

## Proposta de melhoria

Proposta criada a partir do template em:

- `improvements/melhoria-001-login-feedback-validacoes.md`

Resumo: padronizar feedback de erro/validações no login, com mensagens genéricas e acessíveis + estado de carregamento no botão.
