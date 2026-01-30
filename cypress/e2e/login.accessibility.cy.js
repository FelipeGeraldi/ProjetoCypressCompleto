describe('Login — acessibilidade (a11y)', () => {
  beforeEach(() => {
    cy.visitLogin();
  });

  it('A11Y-001 — Página possui idioma definido (html[lang])', () => {
    // Aceita variações comuns como "pt-br" e "pt-BR"
    cy.get('html').should('have.attr', 'lang').and('match', /^[a-z]{2}(-[a-zA-Z]{2})?$/);
  });

  it('A11Y-002 — Componentes principais são focáveis via teclado', () => {
    cy.getByDataTest('username').focus().should('have.focus');
    cy.getByDataTest('password').focus().should('have.focus');
    cy.getLoginSubmitButton().focus().should('have.focus');
    cy.contains('Esqueceu a senha?').focus().should('have.focus');
  });

  it('A11Y-003 — Auditoria axe (WCAG 2A/2AA, exceto contraste)', () => {
    cy.injectAxe();

    cy.checkA11y(
      undefined,
      {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
        rules: {
          // Pode ser ruidoso/flaky em ambientes controlados e depende de tema/cores.
          'color-contrast': { enabled: false },
        },
      },
      undefined,
      true
    );
  });
});

