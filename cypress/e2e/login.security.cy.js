function assertNoSecretInStorage(secret) {
  cy.window().then((win) => {
    const stores = [
      { name: 'localStorage', storage: win.localStorage },
      { name: 'sessionStorage', storage: win.sessionStorage },
    ];

    stores.forEach(({ name, storage }) => {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        const value = key ? storage.getItem(key) : '';
        expect(String(value || ''), `${name}[${key}] não deve conter segredo`).to.not.include(secret);
      }
    });
  });
}

describe('Login — segurança (checks básicos)', () => {
  beforeEach(() => {
    cy.visitLogin();
  });

  it('SEC-001 — Página roda em HTTPS', () => {
    cy.location('protocol').should('eq', 'https:');
  });

  it('SEC-002 — Campo senha é do tipo password (não expõe texto)', () => {
    cy.getByDataTest('password').should('have.attr', 'type', 'password');
  });

  it('SEC-003 — Tentativa de login não adiciona credenciais na URL (query string)', () => {
    cy.fillLoginEmail(`usuario+${Date.now()}@exemplo.com`);
    cy.fillLoginPassword('senha_teste_123');
    cy.submitLogin();

    cy.location('search').should('eq', '');
    cy.location('hash').should('satisfy', (hash) => typeof hash === 'string'); // não impõe padrão, só valida não quebrar
  });

  it('SEC-004 — Senha não é persistida em localStorage/sessionStorage após tentativa', () => {
    const secret = 'senha_teste_123';

    cy.fillLoginEmail(`usuario+${Date.now()}@exemplo.com`);
    cy.fillLoginPassword(secret);
    cy.submitLogin();

    assertNoSecretInStorage(secret);
  });

  it('SEC-005 — Recursos carregados não usam HTTP (sem mixed content)', () => {
    cy.window().then((win) => {
      const resources = win.performance.getEntriesByType('resource');
      const nonHttps = resources.filter((e) => typeof e.name === 'string' && e.name.startsWith('http://'));
      expect(nonHttps.length, 'recursos em http://').to.eq(0);
    });
  });
});

describe('Login — hardening recomendado (opcional)', () => {
  it.skip('SEC-H-001 — Resposta deveria incluir Strict-Transport-Security (HSTS)', () => {
    cy.request('/login').its('headers').should('have.property', 'strict-transport-security');
  });

  it.skip('SEC-H-002 — Resposta deveria incluir Content-Security-Policy (CSP)', () => {
    cy.request('/login').its('headers').should('have.property', 'content-security-policy');
  });
});

