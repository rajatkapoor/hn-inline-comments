/// <reference types="cypress"/>
context.only("/drafts/[id]", () => {
  beforeEach(() => {});

  after(() => {
    cy.clearFirebase();
  });

  it("happy flow path", () => {
    const text =
      "# This is some new test content \n\n\n\n hi this is some some text";
    cy.visit("/");
    cy.get("[data-cy=create-new-post-button]");
    cy.get("[data-cy=create-new-post-button]").click();

    // add new content and save
    cy.get("[data-cy=editor]").clear().type(text);
    cy.get("[data-cy=save-button]").click();
    cy.contains("Post updated");

    // check preview
    cy.get("[data-cy=preview]").click();
    cy.get("h1").contains("This is some new test content");
    cy.get("p").contains("hi this is some some text");

    // make a comment
    cy.get("h1").setSelection("some new test");
    cy.get("[data-cy=add-comment-button]").click();
    cy.get("[data-cy=comment-input]").type("this is a comment");
    cy.get("[data-cy=save-comment-button]").click();

    // make a suggestion too
    cy.get("[data-cy=comment-input]").type("this is a suggestion");
    cy.get("[data-cy=is-suggestion-checkbox]").click();
    cy.get("[data-cy=save-comment-button]").click();
    cy.get("[data-cy=comment-card]").should("have.length", 2);
    cy.wait(5000);

    // check preview
    cy.get("[data-cy=comment-drawer-close-button]").click();
    cy.get("h1 > span").contains("some new test");
    cy.get("p").contains("hi this is some some text");

    // preview comments
    cy.get("h1 > span").click();
    cy.get("[data-cy=comment-card]").should("have.length", 2);

    // accept suggestion
    cy.get("[data-cy=accept-suggestion-button]").click();
    cy.get("[data-cy=comment-drawer-close-button]").click();
    cy.get("h1 > span").contains("this is a suggestion");
  });
});
