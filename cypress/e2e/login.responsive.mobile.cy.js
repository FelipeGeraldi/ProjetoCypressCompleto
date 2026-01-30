function assertNoHorizontalScroll() {
  cy.window().then((win) => {
    const docEl = win.document.documentElement;
    const viewportWidth = win.innerWidth;

    // Observação: não usamos `clientWidth` porque ele pode diminuir quando há scrollbar vertical,
    // gerando falso-positivo. O que importa é não exceder a largura do viewport.
    expect(docEl.scrollWidth, 'documentElement.scrollWidth').to.be.at.most(viewportWidth + 1);
    expect(win.document.body.scrollWidth, 'body.scrollWidth').to.be.at.most(viewportWidth + 1);
  });
}

function assertElementFullyInsideViewport($el, label) {
  const rect = $el[0].getBoundingClientRect();
  const vw = Cypress.config('viewportWidth');
  const vh = Cypress.config('viewportHeight');
  const tol = 1; // tolerância para subpixel/rounding

  expect(rect.width, `${label} width`).to.be.greaterThan(0);
  expect(rect.height, `${label} height`).to.be.greaterThan(0);

  expect(rect.left, `${label} left`).to.be.at.least(-tol);
  expect(rect.top, `${label} top`).to.be.at.least(-tol);
  expect(rect.right, `${label} right`).to.be.at.most(vw + tol);
  expect(rect.bottom, `${label} bottom`).to.be.at.most(vh + tol);
}

function assertVisibleWithinViewport(getter, label) {
  getter()
    .scrollIntoView({ block: 'center' })
    .should('be.visible')
    .then(($el) => assertElementFullyInsideViewport($el, label));
}

function assertLoginResponsiveLayout() {
  assertNoHorizontalScroll();

  // Campos principais devem existir e ser utilizáveis.
  assertVisibleWithinViewport(() => cy.getByDataTest('username'), 'campo e-mail');
  assertVisibleWithinViewport(() => cy.getByDataTest('password'), 'campo senha');
  assertVisibleWithinViewport(() => cy.getLoginSubmitButton(), 'botão acessar');

  // Link de recuperação deve estar acessível (mesmo que não navegue/modalize).
  cy.contains('Esqueceu a senha?')
    .scrollIntoView({ block: 'center' })
    .should('be.visible')
    .then(($el) => assertElementFullyInsideViewport($el, 'link esqueceu a senha'));

  assertNoHorizontalScroll();
}

describe('Login — responsividade mobile', () => {
  const mobilePortraitSizes = [
    { name: 'Extra pequeno (280x653)', width: 280, height: 653 }, // ex.: fold/mini
    { name: 'Pequeno (320x568)', width: 320, height: 568 }, // iPhone SE clássico
    { name: 'Android comum (360x640)', width: 360, height: 640 },
    { name: 'iPhone 8 (375x667)', width: 375, height: 667 },
    { name: 'iPhone 12/13 (390x844)', width: 390, height: 844 },
    { name: 'Grande (414x896)', width: 414, height: 896 },
    { name: 'Android grande (412x915)', width: 412, height: 915 },
  ];

  const mobileLandscapeSizes = mobilePortraitSizes
    // evita casos em que a altura ficaria pequena demais e mascararia problemas com teclado/endereço
    .map((v) => ({ name: `${v.name} (landscape)`, width: v.height, height: Math.max(360, v.width) }));

  [...mobilePortraitSizes, ...mobileLandscapeSizes].forEach((vp) => {
    it(`Layout não quebra em ${vp.name}`, () => {
      cy.viewport(vp.width, vp.height);
      cy.visitLogin();
      assertLoginResponsiveLayout();
    });
  });
});

