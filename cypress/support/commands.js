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
import { generateUserData } from "./fakerUtil";
import  RegistrationPage  from './pages/registration.page';
import ATRegistrationPage from './pages/at-registration.page';
import ATCheckoutPage from "./pages/at-checkout.page";

Cypress.Commands.add("expandRows", () => {
    // Expand all rows before verifying data
    cy.get('table#example tbody tr').each(($row) => {
        cy.wrap($row).find('td.dtr-control').then(($control) => {
            if ($control.is(':visible')) {
                cy.wrap($control).click(); // Click to expand the row if needed
            }
        });
    });
});

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
    const formattedDate = 
        `${String(date.getMonth()+1). // Gets month today +1 since month starts with a 0
        padStart(2, '0')}-${String(date.getDate()). // Pad month with 0s; get date
        padStart(2, '0')}-${String(date.getFullYear()). // Pad date with 0s, get year
        slice(-2)}`; // Retain only the last 2 digits of the year
    const fileName = `${prefix}-${formattedDate}`; // Combine all of them
    cy.screenshot(fileName);
});
  
// Auth function
Cypress.Commands.add("authSauceDemo", (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});

// Parabank commands
Cypress.Commands.add('fillRegistrationForm', (customerData) => {
    RegistrationPage.verifyRegistrationLabels();
    RegistrationPage.fillSignUpForm(customerData);
    RegistrationPage.submitSignUpForm();
    cy.wait(1000);
    RegistrationPage.verifySignUpSuccess(customerData.username);
  });

Cypress.Commands.add("writeDataToFile", (user) => {
    cy.writeFile('cypress/fixtures/fakerData.json', user);
});

Cypress.Commands.add("clearDatabase", () => {
    cy.get('.leftmenu > :nth-child(6) > a').should('be.visible').click();
    cy.wait(2000);
    cy.url().should('include', 'admin.htm');
    cy.get('tr > :nth-child(2) > .button').should('be.visible').click();
    cy.wait(2000);
    cy.get(':nth-child(1) > .button').should('be.visible').click();
    cy.wait(2000);
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    cy.wait(2000);
});

Cypress.Commands.add('saveCart', () => {
    cy.window().then((win) => {
      const cart = win.localStorage.getItem('cart-contents') || '[]';
      Cypress.env('savedCart', cart);
    });
});

Cypress.Commands.add('restoreCart', () => {
    const cart = Cypress.env('savedCart') || '[]';
    cy.window().then((win) => {
        win.localStorage.setItem('cart-contents', cart);
    });
});

Cypress.Commands.add('addProductToCart', (productId) => {
    cy.get(`:nth-child(${productId}) > .product-image-wrapper > .single-products > .productinfo > .btn`)
        .should('be.visible')
        .click();
    cy.wait(1000);
    cy.get('.modal-footer > .btn').should('be.visible').click();
    cy.wait(1000);
});

Cypress.Commands.add('generateUserData', () => {
    // Create data using faker
    const userData = generateUserData();
    // Write generated user data to file
    cy.writeFile('cypress/fixtures/exerciseTestData.json', userData);
    
});

// Automation exercise commands
Cypress.Commands.add('fillRegistrationForms', (testCase) => {
    cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
        ATRegistrationPage.fillInitialSignUpForm(userData);
        cy.wait(1000);
        ATRegistrationPage.fillSignUpForm(userData, testCase);
    });
});

Cypress.Commands.add('verifyCheckout', (testCase) => {
    cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
        ATCheckoutPage.verifyAddress('invoice', userData);
        ATCheckoutPage.verifyAddress('delivery', userData);
    });
    ATCheckoutPage.captureAddressDetails(testCase);
    ATCheckoutPage.enterDescription();
})

Cypress.Commands.add('enterCardDetails', (userData) => {
    cy.get('[data-qa="name-on-card"]').should('have.value', '').type(userData.name);
    cy.get('[data-qa="card-number"]').should('have.value', '').type(userData.cardNumber);
    cy.get('[data-qa="cvc"]').should('have.value', '').type(userData.cvc);
    cy.get('[data-qa="expiry-month"]').should('have.value', '').type(userData.cardExpiry.month);
    cy.get('[data-qa="expiry-year"]').should('have.value', '').type(userData.cardExpiry.year);
});
