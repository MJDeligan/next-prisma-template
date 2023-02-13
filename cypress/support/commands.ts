/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("loginByGoogleApi", () => {
  cy.log("Logging in to Google");
  cy.session("login", () =>
    cy
      .request({
        method: "POST",
        url: "https://www.googleapis.com/oauth2/v4/token",
        body: {
          grant_type: "refresh_token",
          client_id: Cypress.env("GOOGLE_CLIENT_ID"),
          client_secret: Cypress.env("GOOGLE_SECRET"),
          refresh_token: Cypress.env("GOOGLE_REFRESH_TOKEN"),
        },
      })
      .then(({ body }) => {
        const { access_token, id_token } = body;
        cy.request({
          method: "POST",
          url: "/api/auth/callback/google",
          body: {
            provider: "google",
            access_token,
            id_token,
          },
        }).then((response) => {
          window.localStorage.setItem("next-auth.jwt", response.body.jwt);
        });
      })
  );
});

export {};
