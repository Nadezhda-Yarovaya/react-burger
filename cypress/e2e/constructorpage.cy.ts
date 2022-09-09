describe("check auth with fixtures", () => {
  const checkDndBuns = () => {
    cy.wait(1000);
    cy.get("[data-testid=listbuns-1]").trigger("dragstart");
    cy.get("[data-testid=drop_cont-buns]").trigger("drop");
  };

  const checkDndStuffings = () => {
    cy.wait(1000);
    cy.get("[data-testid=listsauce-0]").trigger("dragstart");
    cy.get("[data-testid=drop_cont-stuffings]").trigger("drop");
  };

  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie("token", "test-accessToken");
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("should open modal after click on 1st ingredient-bun", () => {
    cy.wait(2000);
    cy.get("[data-testid=listbuns-0]").first().click();
    cy.get("[id=modal]").should("exist");
  });

  it("should  drag and drop buns", () => {
    checkDndBuns();
  });

  it("should drag and drop stuffings", () => {
    checkDndStuffings();
  });

  it("check if new order modal window Gives number", () => {
    cy.intercept("POST", "orders", { fixture: "order.json" }).as("postOrder");
    checkDndBuns();
    checkDndStuffings();
    cy.wait(1000);
    cy.get("[data-testid=button_placeorder]").click();
    cy.wait("@postOrder");
    cy.wait(3000);
    cy.get("[data-testid=order_number_modal]")
      .contains("12345")
      .should("exist");
  });
});

export {};
