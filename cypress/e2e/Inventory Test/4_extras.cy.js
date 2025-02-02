import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Extras - Login", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("Should not login without username", () => {
    cy.get('[data-test="password"]').type(users.standard_user.password);

    cy.get('[data-test="login-button"]')
      .should("be.visible")
      .click();

    cy.get('[data-test="error"]').should("be.visible");
    cy.get('.error-message-container').should("be.visible");
    cy.get('[data-test="error-button"]').should("be.visible");

    cy.get('[data-test="username"]').should('have.class', 'error');
    cy.get('[data-test="username"]').should(
      'have.css', 'border-bottom-color', 'rgb(226, 35, 26)'
    );

    cy.get('[data-test="password"]').should('have.class', 'error');
    cy.get('[data-test="password"]').should(
      'have.css', 'border-bottom-color', 'rgb(226, 35, 26)'
    );
  });

  it("Should not login without password", () => {
    cy.get('[data-test="username"]').type(users.standard_user.username);

    cy.get('[data-test="login-button"]')
      .should("be.visible")
      .click();

    cy.contains("div", "Epic sadface: Password is required").should(
      "be.visible"
    );

  });
});

describe("Extras - Products", () => {

  beforeEach(() => {
    cy.visit(url);
    doSignIn(users.standard_user);

  });

  it("Should remove a product from the cart", () => {
    cy.get('[data-test="inventory-item"]')
      .first()
      .click();

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should("be.visible")
      .click();

      cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible");
    
    cy.get('[data-test="shopping-cart-link"]')
      .should("be.visible")
      .click();

    cy.url().should("include", "/cart.html");
    cy.get(".cart_item")
      .should("exist")
      .and("be.visible");

    cy.get('[data-test="remove-sauce-labs-backpack"]')
      .should("be.visible")
      .click();

    cy.get(".cart_item").should("not.exist");
    cy.get(".shopping_cart_badge").should("not.exist");
  });

  it("Should sort products alphabetically from A to Z", () => {
// Select sorting option "Name (A to Z)"
    cy.get('[data-test="product-sort-container"]').select("Name (A to Z)");
  
// Get all product names and verify sorting
    cy.get(".inventory_item_name").then(($items) => {
      const productNames = [...$items].map((item) => item.innerText);
      console.log("Extracted product names:", productNames);
  
// Sort names in ascending order (A to Z)
      const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
      console.log("Sorted product names:", sortedNames);
  
// Validate the sorting
      expect(productNames).to.deep.equal(sortedNames);
    });
  });

  it("Should sort products alphabetically from Z to A", () => {

// Select sorting option "Name (Z to A)"
    
    cy.get('[data-test="product-sort-container"]').select("Name (Z to A)");

// Get all product names and verify sorting

    cy.get(".inventory_item_name").then(($items) => {
      const productNames = [...$items].map((item) => item.innerText);
      console.log(productNames);
      const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
      console.log(sortedNames);

// Validate the sorting

      expect(productNames).to.deep.equal(sortedNames);

    });
  });

});

describe("Extras - Cart", () => {

  beforeEach(() => {

    cy.visit(url);
    doSignIn(users.standard_user);

  });

  it("Should add multiple products to the cart and verify the shopping cart badge number", () => {
    const itemsToAdd = 3;
  
// Select and add the first N products to the cart

    cy.get(".inventory_item").each(($el, index) => {
      if (index < itemsToAdd) {
        cy.wrap($el)
          .find('[data-test^="add-to-cart"]')
          .click();
      }
    });
  
// Verify the shopping cart badge count matches the number of added items

    cy.get(".shopping_cart_badge")
      .should("exist")
      .and("be.visible")
      .and("have.text", itemsToAdd.toString());
  });
  

  it("Should verify if the number of items in the cart matches the added products", () => {
    const itemsToAdd = 3;
  
// Select and add the first N products to the cart

    cy.get(".inventory_item").each(($el, index) => {
      if (index < itemsToAdd) {
        cy.wrap($el).find('[data-test^="add-to-cart"]').click();
      }
    });
  
    cy.get('[data-test="shopping-cart-link"]').click();
  
// Verify the correct number of items in the cart

    cy.get(".cart_item").should("have.length", itemsToAdd);
  
// Verify each item's details in the cart

    cy.get(".cart_item").each(($item) => {
      cy.wrap($item).within(() => {
        cy.get(".cart_quantity")
          .should("be.visible")
          .and("have.text", "1");
        cy.get(".inventory_item_name").should("be.visible");
        cy.get(".inventory_item_desc").should("be.visible");
        cy.get(".inventory_item_price").should("be.visible");
      });
    });
  });

  it("Should retain products in cart after page reload", () => {
  
    cy.get(".inventory_item")
      .first()
      .find('[data-test^="add-to-cart"]')
      .click();
  
    cy.get("[data-test='shopping-cart-link']").click();
  
    cy.get(".cart_item").should("exist");
  
// Verify item details before reload
    cy.get(".cart_item").within(() => {
      cy.get(".cart_quantity")
        .should("be.visible")
        .and("have.text", "1");
      cy.get(".inventory_item_name").should("be.visible");
      cy.get(".inventory_item_desc").should("be.visible");
      cy.get(".inventory_item_price").should("be.visible");
    });
  
    cy.reload();
  
// Verify the cart still contains the product after reload
    cy.get("[data-test='shopping-cart-link']").click();
    cy.get(".cart_item").should("exist");
  
// Verify item details again after reload
    cy.get(".cart_item").within(() => {
      cy.get(".cart_quantity")
        .should("be.visible")
        .and("have.text", "1");
      cy.get(".inventory_item_name").should("be.visible");
      cy.get(".inventory_item_desc").should("be.visible");
      cy.get(".inventory_item_price").should("be.visible");
    });
  });
  

  it("Should add an item to the cart, log out, log in again, and verify item persists", () => {
   
    cy.get(".inventory_item")
      .first()
      .find('[data-test^="add-to-cart"]')
      .click();

// Verify cart badge shows 1 item
    cy.get(".shopping_cart_badge")
      .should("exist")
      .and("be.visible")
      .and("have.text", "1");

// Logout

    cy.get("#react-burger-menu-btn")
      .should("be.visible")
      .click();
    cy.get('[data-test="logout-sidebar-link"]')
      .should("be.visible")
      .click();

    doSignIn(users.standard_user);

    cy.get('[data-test="shopping-cart-link"]').click();

// Verify the item is still in the cart
    cy.get(".cart_item").should("have.length", 1).within(() => {
      cy.get(".cart_quantity").should("be.visible").and("have.text", "1");
      cy.get(".inventory_item_name").should("be.visible");
      cy.get(".inventory_item_desc").should("be.visible");
      cy.get(".inventory_item_price").should("be.visible");
    });
  });


  it("Should redirect to inventory when clicking 'Back Home' after checkout", () => {
   
    cy.get(".inventory_item")
      .first()
      .find('[data-test^="add-to-cart"]')
      .click();

    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="checkout"]')
      .should("be.visible")
      .click();

    // Fill out the checkout form
    cy.get('[data-test="firstName"]')
      .type("Standard")
      .should("have.value", "Standard");
    cy.get('[data-test="lastName"]')
      .type("User")
      .should("have.value", "User");
    cy.get('[data-test="postalCode"]')
      .type("12345")
      .should("have.value", "12345");

    cy.get('[data-test="continue"]')
      .should("be.visible")
      .click();

    cy.get('[data-test="finish"]')
      .should("be.visible")
      .click();

    // Verify success message
    cy.get('[data-test="complete-header"]')
      .should("be.visible")
      .and("have.text", "Thank you for your order!");

    cy.get('[data-test="back-to-products"]')
      .should("be.visible")
      .click();

    cy.url().should("include", "/inventory.html");
  });

});

describe("error_user test", () => {

  beforeEach(() => {
    cy.visit(url);
    doSignIn(users.error_user);
  });

  it("Should not allow error_user to remove a product from the cart on the inventory page", () => {
// Enable uncaught exceptions to prevent test failures due to error_user permissions

    Cypress.on("uncaught:exception", (err, runnable) => {
        return false; 
    });
  
    cy.get(".inventory_item")
      .first()
      .find('[data-test^="add-to-cart"]')
      .click();
  
    cy.get(".inventory_item")
      .first()
      .find('[data-test^="remove"]')
      .click();
  
    cy.get(".inventory_item")
      .first()
      .find('[data-test^="remove"]')
      .should("be.visible");
  
    cy.get('[data-test="shopping-cart-link"]').click();
  
// Verify that the product is still in the cart
    cy.get(".cart_item")
      .should("have.length", 1)
      .within(() => {
      cy.get(".cart_quantity")
        .should("be.visible")
        .and("have.text", "1");
      cy.get(".inventory_item_name").should("be.visible");
      cy.get(".inventory_item_desc").should("be.visible");
      cy.get(".inventory_item_price").should("be.visible");
    });
  });

  it("Should not allow error_user to change product sorting", () => {

  let initialProductOrder = [];
  cy.get(".inventory_item_name").then(($items) => {
    initialProductOrder = [...$items].map((item) => item.innerText);
  });

  cy.get('[data-test="product-sort-container"]').select("Price (low to high)");

// Verify that the product order has not changed

  cy.get(".inventory_item_name").then(($items) => {
    const currentOrder = [...$items].map((item) => item.innerText);
    expect(initialProductOrder).to.deep.equal(currentOrder);  
  })

  cy.get('[data-test="product-sort-container"]').should("have.value", "az");

  })

  it.only("Should detect incorrect product description for error_user", () => {

    cy.get(".inventory_item")
      .first()
      .find(".inventory_item_desc")
      .should("be.visible")
      .invoke("text")
      .then((initialDescription) => {
        cy.get(".inventory_item")
          .first()
          .find(".inventory_item_name")
          .should("be.visible")
          .click();

        cy.get(".inventory_details_desc")
          .should("be.visible")
          .invoke("text")
          .then((detailDescription) => {
            expect(detailDescription).to.not.equal(initialDescription);
          })
      })

    cy.get(".inventory_details_desc").should("be.visible");
  })
});
