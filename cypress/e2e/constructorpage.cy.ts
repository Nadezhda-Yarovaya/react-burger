describe('check auth with fixtures', () => {
  const ingredients = { ingredients: ['0', '0'] };

  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('token', 'test-accessToken');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should open modal after click on 1st ingredient-bun', () => {
    cy.wait(2000);
    cy.get('[data-testid=listbuns-0]').first().click();
    cy.get('[id=modal]').should('exist');
  });

  it('should check drag behaviour', () => {
    cy.wait(3000);
    cy.get('[data-testid=listbuns-0]')
      .trigger('dragstart')
      .trigger('dragleave');
  });

  it('should check drop behaviour', () => {
    cy.wait(4000);
    cy.get('[data-testid=drop_cont-buns]')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('dragend');
  });

  it('check if new order modal window Gives number', () => {
    cy.intercept('POST', 'orders', { fixture: 'order.json' }).as('postOrder');
    cy.wait(2000);
    cy.get('[data-testid=button_placeorder]').click();
    cy.wait('@postOrder').its('request.body').should('deep.equal', ingredients);
    cy.wait(3000);
    cy.get('[data-testid=order_number_modal]')
      .contains('12345')
      .should('exist');
  });
});

export {}; 
