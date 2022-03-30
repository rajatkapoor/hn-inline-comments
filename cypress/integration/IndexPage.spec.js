/// <reference types="cypress"/>
context("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  after(() => {
    cy.clearFirebase();
  });

  it("should render the home page with the create post button", () => {
    cy.get("[data-cy=create-new-post-button]");
  });

  it("happy flow", () => {
    cy.get("[data-cy=create-new-post-button]").click();
    // checking redirect
    cy.location("pathname").should("contain", "/drafts");

    // checking that the post was successfully created
    cy.visit("/");
    cy.get("[data-cy=post-card]").should("have.length", 1);

    // delete
    cy.get("[data-cy=post-card]").get("[data-cy=delete-post-button]").click();
    cy.get("[data-cy=post-card]").should("have.length", 0);
  });
});
