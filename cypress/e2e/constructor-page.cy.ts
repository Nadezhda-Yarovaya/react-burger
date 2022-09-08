/* 
. Протестировать нужно 
-функциональность перетаскивания ингредиента, 
-создания заказа 
-и работу модальных окон 
на странице «Конструктор». 

Другими словами, нужно протестировать путь пользователя от сбора бургера перетаскиванием ингредиентов 
до получения информации о созданном заказе.

Дополнительно вы можете реализовать и другие тесты на странице «Конструктор» или на других страницах.
*/

describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
  
    // Устанавливаем токены:
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should open Constructor page by default', function() {
    cy.contains('Соберите бургер');
  });
/*
  it('should open delivery page after continue button click', function() {
    cy.get('button').contains('Продолжить оформление').click();
    cy.contains('Доставка');
  });*/

  it('should open Feed page after click', function() {
    cy.contains('Лента заказов').click();
    cy.contains('Лента заказов');
  });

  // Проверяем, что на странице в модальном окне отображается нужный номер заказа
// Номер заказа моковый из файла fixtures/order.json
// Селектор по атрибуту data-testid

it('should Show OrderNumber', function() {
cy.get('[data-testid=number]').contains('123').should('exist');
});

});