import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it.skip("Should see the product details and add to cart");

  it.skip("Should sort products by price properly (high to low)");

  it.skip("Should sort products by price properly (low to high)");

  it("Should see the product details and add to cart", () => {
    cy.get('[data-test="inventory-item-name"]')
      .first()
      .should("be.visible")
      .click();

    cy.get('[data-test="inventory-item-desc"]').should("be.visible");

    cy.get('[data-test="add-to-cart"]')
      .should("be.visible")
      .click();

    cy.get('[data-test="remove"]').should("be.visible");

    cy.get(".shopping_cart_badge")
      .should("exist")
      .and("be.visible")
      .and("have.text", "1");

    cy.get('[data-test="shopping-cart-link"]').should("be.visible").click();

    cy.get('[data-test="title"]').should("be.visible");
    cy.get('[data-test="cart-quantity-label"]');
    cy.get('[data-test="cart-desc-label"]')

    cy.get('[data-test="inventory-item"]').should("be.visible");

    cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible");
    cy.get('[data-test="item-quantity"]').should("be.visible");
    cy.get('[data-test="inventory-item-name"]').should("be.visible");
    cy.get('[data-test="inventory-item-desc"]').should("be.visible");
    cy.get('[data-test="inventory-item-price"]').should("be.visible");


    cy.url().should("eq", "https://www.saucedemo.com/cart.html");
  });

  it("Should sort products by price properly (high to low)", () => {
    cy.get('[data-test="product-sort-container"]').select(
      "Price (high to low)"
    );

    cy.get(".inventory_item_price").then(($prices) => {
      // Convert prices to float
      const prices = [...$prices].map((price) =>
        parseFloat(price.innerText.replace("$", ""))
      );

      console.log("Float Price: ", prices);

      const sortedPrices = [...prices].sort((a, b) => b - a);

      console.log("Sorted prices: ", sortedPrices);

      // Compare extracted prices with expected order
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it("Should sort products by price properly (low to high)", () => {
    cy.get('[data-test="product-sort-container"]').select(
      "Price (low to high)"
    );

    cy.get(".inventory_item_price").then(($prices) => {
      // Convert prices to float
      const prices = [...$prices].map((price) =>
        parseFloat(price.innerText.replace("$", ""))
      );

      const sortedPrices = [...prices].sort((a, b) => a - b);

      // Compare extracted prices with expected order
      expect(prices).to.deep.equal(sortedPrices);
    });
  });
});
