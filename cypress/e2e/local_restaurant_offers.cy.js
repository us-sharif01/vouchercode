describe("Local restaurant offer search", () => {
  it("searches for local restaurant offers in London for a given party size", () => {
    const people = 4;

    cy.visit("/");

    // If a cookie banner appears, accept it.
    cy.contains(/accept.*cookie/i).click({ force: true });

    // Search for local restaurant offers.
    cy.get('input[type="search"]').type("local restaurants{enter}");

    // Enter London as the location (if a location box exists on the page).
    cy.get('input[placeholder*="location" i], input[name*="location" i]').first().type("London{enter}");

    // Enter the number of people (if a party size box exists on the page).
    cy.get('input[placeholder*="people" i], input[name*="people" i], input[placeholder*="guests" i]')
      .first()
      .type(String(people));

    // Basic checks to confirm results mention restaurants and London.
    cy.contains(/restaurant/i).should("be.visible");
    cy.contains(/london/i).should("be.visible");
  });

  it("fails on purpose to collect debug artifacts", () => {
    cy.visit("/");

    cy.screenshot("intentional-failure");

    // This selector does not exist, so the test will fail.
    cy.get("[data-test-id='does-not-exist']").should("exist");
  });
});
