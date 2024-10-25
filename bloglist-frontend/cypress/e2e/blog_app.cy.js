describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("log into application");
    cy.get("#Username").should("exist");
    cy.get("#Password").should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#Username").type("Tester1");
      cy.get("#Password").type("password");
      cy.get("#login-button").click();
      cy.contains("blogs");
    });

    it("fails with wrong credentials", function () {
      cy.get("#Username").type("fail");
      cy.get("#Password").type("fail");
      cy.get("#login-button").click();
      cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#Username").type("Tester1");
      cy.get("#Password").type("password");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("button", "new blog").click();
      cy.get("#title-input").type("auto-test-1");
      cy.get("#author-input").type("auto-test-1");
      cy.get("#url-input").type("auto-test-1");
      cy.get("#create-blog-submit-button").click();
      cy.get(".notification").contains("auto-test-1 by auto-test-1 added!");
    });
  });
});
