import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it("Should do checkout with the correct flow", () => {
    cy.get('[data-test="inventory-item"]')
      .first()
      .should("be.visible")
      .click();

    cy.get(".inventory_item_desc").should("be.visible");

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should("be.visible")
      .and("be.enabled")
      .click();

    cy.get('[data-test="shopping-cart-link"]')
      .should("be.visible")
      .click();

    cy.get('[data-test="title"]').should("be.visible");
    cy.get('[data-test="cart-quantity-label"]').should("be.visible");
    cy.get('[data-test="cart-desc-label"]').should("be.visible");
  
    cy.get('[data-test="inventory-item"]').should("be.visible");
  
    cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible");
    cy.get('[data-test="item-quantity"]').should("be.visible");
    cy.get('[data-test="inventory-item-name"]').should("be.visible");
    cy.get('[data-test="inventory-item-desc"]').should("be.visible");
    cy.get('[data-test="inventory-item-price"]').should("be.visible");
  
  
    cy.url().should("eq", "https://www.saucedemo.com/cart.html");

    cy.get('[data-test="checkout"]')
      .should("be.visible")
      .and("be.enabled")
      .click();

    cy.url("eq", "https://www.saucedemo.com/checkout-step-one.html");


// Fill in user information

    cy.get('[data-test="firstName"]')
      .type("Standard")
      .should("have.value", "Standard");

    cy.get('[data-test="lastName"]')
      .type("User")
      .should("have.value", "User");

    cy.get('[data-test="postalCode"]').type("12345")
      .should("have.value", "12345");

    cy.get('[data-test="cancel"]')
      .should("be.visible");

    cy.get('[data-test="continue"]')
      .should("be.visible")
      .and("be.enabled")
      .click();

// Verify checkout summary information

    cy.get('[data-test="payment-info-label"]').should("be.visible");
    cy.get('[data-test="payment-info-value"]').should("be.visible");
    cy.get('[data-test="shipping-info-label"]').should("be.visible");
    cy.get('[data-test="shipping-info-value"]').should("be.visible");
    cy.get('[data-test="total-info-label"]').should("be.visible");
    cy.get('[data-test="subtotal-label"]').should("be.visible");
    cy.get('[data-test="tax-label"]').should("be.visible");
    cy.get('[data-test="total-label"]').should("be.visible");

    cy.get('[data-test="finish"]')      
      .should("be.visible")
      .and("be.enabled")
      .click();

 // Verify order completion - Success

    cy.get('[data-test="pony-express"]').should("be.visible");
    cy.get('[data-test="complete-text"]').should("be.visible");
    cy.get('[data-test="back-to-products"]').should("be.visible");

  });

  it(
    "Should select some products, go to cart, and go back to continue shopping", () => {
      cy.get('[data-test="inventory-item"]')
        .first()
        .should("be.visible")
        .click();

      cy.get(".inventory_item_desc").should("be.visible");

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
        .should("be.visible")
        .and("be.enabled")
        .click();

      cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible");

      cy.get('[data-test="shopping-cart-link"]')
        .should("be.visible")
        .click();

      cy.get('[data-test="inventory-item"]').should("be.visible");

      cy.get('[data-test="continue-shopping"]')
        .should("be.visible")
        .and("be.enabled")
        .click();

      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

      cy.contains("Products");

      cy.get('[data-test="inventory-item"]')
        .last()
        .click();

      cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
        .should("be.visible")
        .and("be.enabled")
        .click();

      cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').should("be.visible");
      
      cy.get('[data-test="shopping-cart-link"]')
        .should("be.visible")
        .click();

  // Verify cart items

      cy.get(".cart_item").should("have.length", 2).each(($item) => {
        cy.wrap($item).within(() => {
          cy.get(".inventory_item_name").should("be.visible");
          cy.get(".inventory_item_desc").should("be.visible");
          cy.get(".inventory_item_price").should("be.visible");
          cy.get(".cart_quantity")
            .should("be.visible")
            .and("have.text", "1");
        });
      });

    });

    it("Should not continue checkout with empty delivery information", () => {
      cy.get('[data-test="inventory-item"]')
        .first()
        .should("be.visible")
        .click();

      cy.get(".inventory_item_desc").should("be.visible");

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
        .should("be.visible")
        .and("be.enabled")
        .click();

      cy.get('[data-test="shopping-cart-link"]')
        .should("be.visible")
        .click();

      cy.get('[data-test="checkout"]')
        .should("be.visible")
        .and("be.enabled")
        .click();

      cy.get('[data-test="continue"]')
        .should("be.visible")
        .click();

  // Verify error messages when required fields are empty

      cy.get('[data-test="error"]').should("be.visible");
      cy.get('.error-message-container').should("be.visible");
      cy.get('[data-test="error-button"]').should("be.visible");

  // Verify input fields with error state

      cy.get('[data-test="firstName"]').should('have.class', 'error');
      cy.get('[data-test="firstName"]').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');

      cy.get('[data-test="lastName"]').should('have.class', 'error');
      cy.get('[data-test="lastName"]').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');

      cy.get('[data-test="postalCode"]').should('have.class', 'error');
      cy.get('[data-test="postalCode"]').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');
    });
});
