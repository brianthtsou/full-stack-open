describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("log into application");
    cy.get("#Username").should("exist");
    cy.get("#Password").should("exist");
  });
});
