describe('check auth with fixtures', () => {
    const email = 'seriozz2@yandex.ru';
    const password = '1122';
  
    beforeEach(() => {
      cy.intercept('POST', 'login', { fixture: 'user.json' }).as('postLogin');
      cy.visit('/login');
    });
  
    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    });
  
    it('check if Login is successful', () => {
      cy.get('[data-testid=email_input]').type(`${email}{enter}`);
      cy.get('[data-testid=password_input]').type(`${password}{enter}`);
  
      cy.wait('@postLogin')
        .its('request.body')
        .should('deep.equal', { email, password });
      cy.get('[data-testid=mainpage_title]').contains('Соберите').should('exist');
    });
  });

  export {}; 
  