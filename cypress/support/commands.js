// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Add to Cart Command
Cypress.Commands.add("addToCart", (itemName) => {
    cy.get('[data-test="inventory-item-name"]') // Selects product names
    .contains(itemName) // Finds the correct item by name
    .parents(".inventory_item") // Moves up to the item's container
    .find("button") // Locates the "Add to Cart" button
    .click();
});

Cypress.Commands.add("checkout", () => {
    cy.get('[data-test="checkout"]').click();

     // Enter checkout info
     cy.get('[data-test="firstName"]').type("John Mark Arman Carl Johna Stephen Nolan Eren");
     cy.get('[data-test="lastName"]').type("Dimagiba Dela Cruz");
     cy.get('[data-test="postalCode"]').type("123321");
     cy.get('[data-test="continue"]').click();
 
     // Finish order
     cy.get('[data-test="finish"]').click();

});

// Checkout Screenshot Command
Cypress.Commands.add("takeScreen", (prefix) => {
    const date = new Date();
    const formattedDate = `${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getFullYear()).slice(-2)}`;
    const fileName = `${prefix}-${formattedDate}`;
    cy.screenshot(fileName);
});
  
// Auth function
Cypress.Commands.add("auth", (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});
