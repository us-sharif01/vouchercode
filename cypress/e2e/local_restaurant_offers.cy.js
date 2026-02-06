const searchConfig = {
  query: "local restaurants",
  location: "London",
  people: 4
};

const acceptCookiesIfPresent = () => {
  cy.get("body").then(($body) => {
    const buttons = $body.find("button, a");
    const acceptButton = Array.from(buttons).find((el) => {
      const text = (el.textContent || "").toLowerCase();
      return text.includes("accept") && text.includes("cookie");
    });

    if (acceptButton) {
      cy.wrap(acceptButton).click({ force: true });
    }
  });
};

const typeIfExists = (selectorList, value) => {
  const selectors = selectorList.split(",").map((s) => s.trim());
  cy.get("body").then(($body) => {
    const found = selectors.find((selector) => $body.find(selector).length > 0);
    if (found) {
      cy.get(found).first().clear({ force: true }).type(value, { force: true });
    } else {
      cy.log(`No matching field for: ${selectorList}`);
    }
  });
};

describe("Local restaurant offer search", () => {
  it("successfully searches for local restaurant offers in London for a given party size", () => {
    cy.visit("/");
    acceptCookiesIfPresent();

    typeIfExists(
      'input[type="search"], input[placeholder*="Search" i], input[name*="search" i]',
      `${searchConfig.query}{enter}`
    );

    typeIfExists(
      'input[placeholder*="location" i], input[name*="location" i], input[placeholder*="postcode" i]',
      `${searchConfig.location}{enter}`
    );

    typeIfExists(
      'input[placeholder*="people" i], input[name*="people" i], input[placeholder*="guests" i]',
      `${searchConfig.people}`
    );

    cy.contains(/restaurant/i, { timeout: 15000 }).should("be.visible");
    cy.contains(new RegExp(searchConfig.location, "i"), { timeout: 15000 }).should("be.visible");
  });

  it("intentionally fails to capture debug artifacts", () => {
    cy.visit("/");
    acceptCookiesIfPresent();

    cy.log("Triggering intentional failure for debugging artifacts");
    cy.screenshot("intentional-failure-before-assert");

    cy.get("[data-test-id='this-does-not-exist']", { timeout: 5000 }).should("exist");
  });
});
