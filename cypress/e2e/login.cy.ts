describe("template spec", () => {
  it("redirect unauthenticated to signin", () => {
    cy.visit("/profile");
    cy.url().should("contain", `${Cypress.env("BASE_URL")}/api/auth/signin`);
  });

  it("does not redirect after login", () => {
    cy.loginByGoogleApi();
    cy.visit("/profile");
    cy.url().should("be.equal", `${Cypress.env("BASE_URL")}/profile`);
  });
});

export {};
