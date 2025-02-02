import { users, url } from "./Mock";

describe("Inventory - Login", () => {
  it("Should login with valid credentials", () => {
    cy.visit(url);

    cy.get('[data-test="username"]').type(users.standard_user.username);
    cy.get('[data-test="password"]').type(users.standard_user.password);
    cy.get('[data-test="login-button"]').click();

    cy.contains("Products");
  });

  it.skip("Should login with valid credentials and do logout");

  it.skip("Should not login with invalid credentials");

  it.skip('Should not allow "locked_out_user" do sign in');

  it.skip(
    'Should login with "performance_glitch_user" and wait the products page loads'
  );

  beforeEach(() => {

    cy.visit(url);

    cy.url().should("eq", "https://www.saucedemo.com/");

  });

  it("Should login with valid credentials and do logout", () => {
    cy.get('[data-test="username"]')
      .type(users.standard_user.username)
      .should("have.value", users.standard_user.username);

    cy.get('[data-test="password"]')
      .type(users.standard_user.password)
      .should("have.value", users.standard_user.password);

    cy.get('[data-test="login-button"]')
      .should("be.visible")
      .click();

    cy.contains("Products");

    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

    cy.get('[data-test="inventory-container"]').should("be.visible")


    cy.get('#react-burger-menu-btn')
      .should("be.visible")
      .click();

    cy.get('[data-test="logout-sidebar-link"]')
      .should("be.visible")
      .click();


    cy.url().should("eq", "https://www.saucedemo.com/");

    cy.get('[data-test="login-button"]').should("be.visible")
  });

  it("Should not login with invalid credentials", () => {
    cy.get('[data-test="username"]')
      .type("invalid_user")
      .should("have.value", "invalid_user");

    cy.get('[data-test="password"]')
      .type("invalid_password")
      .should("have.value", "invalid_password");
    

    cy.get('[data-test="login-button"]')
      .should("be.visible")
      .click();

// Checking the error message components

    cy.get('.error-message-container').should("be.visible")
    cy.get('[data-test="error"]').should("be.visible");
    cy.get('[data-test="error-button"]').should("be.visible")

// Checking error icons

    cy.get('.error_icon').each(($el) => {
      cy.wrap($el)
        .should('be.visible');
    });
    
// Checking input fields after the error

    cy.get('#user-name').should('have.class', 'error');
    cy.get('#user-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');

    cy.get('#password').should('have.class', 'error');
    cy.get('#password').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');

    cy.url().should("eq", "https://www.saucedemo.com/");
  });

  it('Should not allow "locked_out_user" do sign in', () => {
    cy.get('[data-test="username"]').type(users.locked_out_user.username);
    cy.get('[data-test="password"]').type(users.locked_out_user.password);

    cy.get('[data-test="login-button"]')
      .should('be.visible')
      .click();

//  Checking the error message components

    cy.get('.error-message-container').should("be.visible")
    cy.get('[data-test="error"]').should("be.visible");
    cy.get('[data-test="error-button"]').should("be.visible")

// Checking error icons

    cy.get('.error_icon').each(($el) => {
      cy.wrap($el)
        .should('be.visible');
    });
    
// Checking input fields after the error

    cy.get('#user-name').should('have.class', 'error');
    cy.get('#user-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');

    cy.get('#password').should('have.class', 'error');
    cy.get('#password').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');

    cy.url().should("eq", "https://www.saucedemo.com/");
  });

  it('Should login with "performance_glitch_user" and wait the products page loads', () => {
    cy.get('[data-test="username"]').type(
      users.performance_glitch_user.username
    );
    cy.get('[data-test="password"]').type(
      users.performance_glitch_user.password
    );

    cy.contains("input", "Login")
      .should("be.visible")
      .click();

    cy.url({ timeout: 5000 }).should(
      "eq",
      "https://www.saucedemo.com/inventory.html"
    );

    cy.contains("Products", { timeout: 5000 }).should("be.visible");

// Checking if the product components loaded correctly

    cy.get(".inventory_item").each(($el) => {

      cy.wrap($el).find(".inventory_item_name").should("be.visible");
      cy.wrap($el).find(".inventory_item_img").should("be.visible");
      cy.wrap($el).find(".inventory_item_desc").should("be.visible");
      cy.wrap($el).find(".inventory_item_price").should("be.visible");

    cy.wrap($el)
      .find('[data-test^="add-to-cart"], [data-test^="remove"]')
      .should("be.visible")
    })
  });
});
