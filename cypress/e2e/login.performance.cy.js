describe('Login — performance (budgets)', () => {
  beforeEach(() => {
    cy.visitLogin();
  });

  it('PERF-001 — Duração de navegação dentro do orçamento', () => {
    cy.getByDataTest('username').should('be.visible');

    cy.window().then((win) => {
      const nav = win.performance.getEntriesByType('navigation')[0];
      expect(nav, 'navigation entry').to.exist;

      // Budgets conservadores para ambiente de QA/CDN (evita flakiness)
      expect(nav.duration, 'navigation.duration (ms)').to.be.lessThan(15000);
      expect(nav.domContentLoadedEventEnd, 'domContentLoadedEventEnd (ms)').to.be.lessThan(12000);
    });
  });

  it('PERF-002 — Quantidade de recursos e peso total dentro do orçamento', () => {
    cy.getByDataTest('username').should('be.visible');

    cy.window().then((win) => {
      const resources = win.performance.getEntriesByType('resource');

      const count = resources.length;
      const totalTransfer = resources.reduce((acc, r) => acc + (Number(r.transferSize) || 0), 0);

      // Orçamentos bem altos para não falhar por variações (a ideia é detectar regressões grandes)
      expect(count, 'qtd recursos').to.be.lessThan(250);
      expect(totalTransfer, 'total transferSize (bytes)').to.be.lessThan(10 * 1024 * 1024);
    });
  });
});

