// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Seletores oficiais (data-test) observados na tela de Login.
 * Mantemos aqui para reutilização e manutenção fácil.
 */
const SELECTORS = {
  email: 'username',
  password: 'password',
  submit: 'submit',
};

Cypress.Commands.add('getByDataTest', (id, options) => {
  return cy.get(`[data-test="${id}"]`, options);
});

Cypress.Commands.add('visitLogin', () => {
  const loginPath = Cypress.env('loginPath') || '/login';
  return cy.visit(loginPath);
});

Cypress.Commands.add('fillLoginEmail', (email) => {
  return cy.getByDataTest(SELECTORS.email).clear().type(email);
});

Cypress.Commands.add('fillLoginPassword', (password) => {
  return cy.getByDataTest(SELECTORS.password).clear().type(password, { log: false });
});

Cypress.Commands.add('getLoginSubmitButton', () => {
  return cy.getByDataTest(SELECTORS.submit).then(($el) => {
    const $button = $el.is('button') ? $el : $el.find('button');
    return cy.wrap($button.length ? $button : $el);
  });
});

Cypress.Commands.add('submitLogin', () => {
  return cy.getLoginSubmitButton().click();
});

/**
 * Login via UI usando credenciais fornecidas pelo ambiente:
 * - USER_EMAIL
 * - USER_PASSWORD
 */
Cypress.Commands.add('loginUi', (email = Cypress.env('USER_EMAIL'), password = Cypress.env('USER_PASSWORD')) => {
  if (!email || !password) {
    throw new Error('Credenciais ausentes: defina USER_EMAIL e USER_PASSWORD no cypress.env.json (ou passe por parâmetro).');
  }

  cy.visitLogin();
  cy.fillLoginEmail(email);
  cy.fillLoginPassword(password);
  cy.submitLogin();
});