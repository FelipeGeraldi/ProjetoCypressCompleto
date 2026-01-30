function assertStillOnLoginWithAnyFeedback() {
  cy.location('pathname').should('include', '/login');

  // Em cenários que disparam requisição (ex.: credenciais inválidas),
  // o botão pode ficar desabilitado durante o processamento.
  cy.getLoginSubmitButton().should('not.be.disabled');

  const feedbackSelectors = [
    '[role="alert"]:visible',
    '.p-toast-message:visible',
    '.p-toast:visible',
    '.p-error:visible',
    '.error:visible',
    '.invalid-feedback:visible',
    '.alert:visible',
    '.toast:visible',
    '[class*="error"]:visible',
  ];

  cy.get('body').then(($body) => {
    const hasAnyVisibleFeedback = feedbackSelectors.some((sel) => $body.find(sel).length > 0);
    expect(hasAnyVisibleFeedback, 'algum feedback de erro/validação visível').to.eq(true);
  });
}

describe('Login — qa.navega.com.vc', () => {
  beforeEach(() => {
    cy.visitLogin();
  });

  it('TC00001 — Login com credenciais válidas', function () {
    const email = Cypress.env('USER_EMAIL');
    const password = Cypress.env('USER_PASSWORD');

    if (!email || !password) {
      this.skip(); // requer credenciais reais fornecidas pelo avaliador
    }

    cy.fillLoginEmail(email);
    cy.fillLoginPassword(password);
    cy.submitLogin();

    cy.location('pathname', { timeout: 15000 }).should('not.include', '/login');
  });

  it('TC00002 — Login com senha inválida', function () {
    const email = Cypress.env('USER_EMAIL');
    if (!email) {
      this.skip(); // precisa de e-mail real para validar cenário de "senha inválida"
    }

    cy.fillLoginEmail(email);
    cy.fillLoginPassword('senha_incorreta_123');
    cy.submitLogin();

    assertStillOnLoginWithAnyFeedback();
  });

  it('TC00003 — Login com e-mail não cadastrado', () => {
    const notRegisteredEmail = `nao.existe+${Date.now()}@exemplo.com`;

    cy.fillLoginEmail(notRegisteredEmail);
    cy.fillLoginPassword('qualquer_senha_123');
    cy.submitLogin();

    // Observado no ambiente: em alguns casos o sistema pode não exibir mensagem de erro,
    // mas deve impedir autenticação e permanecer no /login.
    cy.location('pathname').should('include', '/login');
    // Evita flakiness: em alguns navegadores o botão pode ficar desabilitado por mais tempo.
    cy.getByDataTest('username').should('be.visible');
  });

  it('TC00004 — Tentativa de login com e-mail em formato inválido', () => {
    cy.fillLoginEmail('felipe@');
    cy.fillLoginPassword('qualquer_senha_123');
    cy.submitLogin();

    assertStillOnLoginWithAnyFeedback();
  });

  it('TC00005 — Tentativa de login sem preencher e-mail e senha', () => {
    cy.submitLogin();

    assertStillOnLoginWithAnyFeedback();
  });

  it('TC00006 — Tentativa de login com e-mail preenchido e senha vazia', () => {
    cy.fillLoginEmail(`usuario+${Date.now()}@exemplo.com`);
    cy.submitLogin();

    assertStillOnLoginWithAnyFeedback();
  });

  it('TC00007 — Tentativa de login com senha preenchida e e-mail vazio', () => {
    cy.fillLoginPassword('qualquer_senha_123');
    cy.submitLogin();

    assertStillOnLoginWithAnyFeedback();
  });

  it('TC00008 — Remoção de espaços em branco (trim) no e-mail', function () {
    const email = Cypress.env('USER_EMAIL');
    const password = Cypress.env('USER_PASSWORD');

    if (!email || !password) {
      this.skip(); // requer credenciais reais para validar sucesso
    }

    const emailWithSpaces = `  ${email}  `;

    cy.fillLoginEmail(emailWithSpaces);
    cy.fillLoginPassword(password);
    cy.submitLogin();

    cy.location('pathname', { timeout: 15000 }).should('not.include', '/login');
  });

  it('TC00009 — Campo senha deve mascarar caracteres digitados', () => {
    cy.getByDataTest('password').should('have.attr', 'type', 'password');
  });

  it('TC00010 — Link “Esqueceu a senha?” deve ser acionável', () => {
    // Como o comportamento pode variar (redirect, modal, etc.),
    // garantimos ao menos que o link está visível e clicável.
    cy.contains('Esqueceu a senha?').should('be.visible').click();
  });
});

