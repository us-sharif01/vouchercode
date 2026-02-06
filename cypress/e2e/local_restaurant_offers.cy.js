describe("Local restaurant offer search", () => {
  it("searches for local restaurant offers in London", () => {
    cy.visit("/");

    // Accept cookies if the banner appears.
    cy.contains("Accept", { matchCase: false }).click({ force: true });

    // Search for local restaurants.
    cy.get('input[type="search"]').type("local restaurants{enter}");

    // Enter London as the location.
    cy.get('input[placeholder*="location" i], input[name*="location" i]')
      .first()
      .type("London{enter}");

    // Enter party size (number of people).
    cy.get('input[placeholder*="people" i], input[name*="people" i], input[placeholder*="guests" i]')
      .first()
      .type("4");

    // Check that the page shows restaurant results and London.
    cy.contains("restaurant", { matchCase: false }).should("be.visible");
    cy.contains("London").should("be.visible");
  });

  it("fails on purpose to collect debug artifacts", () => {
    cy.visit("/");

    cy.screenshot("intentional-failure");

    // This selector does not exist, so the test will fail.
    cy.get("[data-test-id='does-not-exist']").should("exist");
  });
});
