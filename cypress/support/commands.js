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

Cypress.Commands.add("verifyRegistrationLabels", () => {
    cy.get(':nth-child(1) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(2) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(3) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(4) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(5) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(6) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(7) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(8) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(10) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(11) > [align="right"] > b').should('be.visible');
    cy.get(':nth-child(12) > [align="right"] > b').should('be.visible');
    cy.get('input[type="submit"][value="Register"]').should('be.visible').should('not.be.disabled');
});

Cypress.Commands.add("inputRegistrationFields", (user) => {
    cy.get('input[id="customer.firstName"]').should('have.value', '').type(user.firstName);
    cy.get('input[id="customer.lastName"]').should('have.value', '').type(user.lastName);
    cy.get('input[id="customer.address.street"]').should('have.value', '').type(user.addressStreet);
    cy.get('input[id="customer.address.city"]').should('have.value', '').type(user.addressCity);
    cy.get('input[id="customer.address.state"]').should('have.value', '').type(user.addressState);
    cy.get('input[id="customer.address.zipCode"]').should('have.value', '').type(user.addressZipCode);
    cy.get('input[id="customer.phoneNumber"]').should('have.value', '').type(user.phoneNumber);
    cy.get('input[id="customer.ssn"]').should('have.value', '').type(user.ssn);
    cy.get('input[id="customer.username"]').should('have.value', '').type(user.username);
    cy.get('input[id="customer.password"]').should('have.value', '').type(user.password);
    cy.get('input[id="repeatedPassword"]').should('have.value', '').type(user.password);
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

Cypress.Commands.add('fillInitialSignUpForm', () => {
    // Read and parse the JSON file correctly
    cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
        cy.get('[data-qa="signup-name"]').should('have.value', '').type(userData.name);
        cy.get('[data-qa="signup-email"]').should('have.value', '').type(userData.email);
    });
    cy.get('[data-qa="signup-button"]').should('not.be.disabled').and('be.visible').click();
});

Cypress.Commands.add('fillSignUpForm', () => {
    // Read and parse the JSON file correctly
    cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
        cy.get(userData.title === "Mr." ? '#id_gender1' : '#id_gender2').check();
        cy.get('[data-qa="password"]').should('have.value', '').type(userData.password);
        
        // Select Date of Birth
        cy.get('[data-qa="days"]').select(userData.dateOfBirth.day);
        cy.get('[data-qa="months"]').select(userData.dateOfBirth.month);
        cy.get('[data-qa="years"]').select(userData.dateOfBirth.year);

        cy.get('[data-qa="first_name"]').should('have.value', '').type(userData.firstName);
        cy.get('[data-qa="last_name"]').should('have.value', '').type(userData.lastName);
        cy.get('[data-qa="company"]').should('have.value', '').type(userData.company);
        cy.get('[data-qa="address"]').should('have.value', '').type(userData.address);
        cy.get('[data-qa="address2"]').should('have.value', '').type(userData.address2);
        cy.get('[data-qa="country"]').select(userData.country);
        cy.get('[data-qa="state"]').should('have.value', '').type(userData.state);
        cy.get('[data-qa="city"]').should('have.value', '').type(userData.city);
        cy.get('[data-qa="zipcode"]').should('have.value', '').type(userData.zipcode);
        cy.get('[data-qa="mobile_number"]').should('have.value', '').type(userData.mobileNumber);
    });
    cy.get('[data-qa="create-account"]').should('not.be.disabled').and('be.visible').click();
});

Cypress.Commands.add('verifyAddress', (type, userData) => {
    cy.get(`#address_${type} > .address_firstname`)
        .should('contain', `${userData.title} ${userData.firstName} ${userData.lastName}`);
    cy.get(`#address_${type} > :nth-child(3)`).should('contain', userData.company);
    cy.get(`#address_${type} > :nth-child(4)`).should('contain', userData.address);
    cy.get(`#address_${type} > :nth-child(5)`).should('contain', userData.address2);

    cy.get(`#address_${type} > .address_city`).should('contain', userData.city);
    cy.get(`#address_${type} > .address_state_name`).should('contain', userData.state);
    cy.get(`#address_${type} > .address_postcode`).should('contain', userData.zipcode);

    cy.get(`#address_${type} > .address_country_name`).should('contain', userData.country);
    cy.get(`#address_${type} > .address_phone`).should('contain', userData.mobileNumber);
});

Cypress.Commands.add('enterCardDetails', (userData) => {
    cy.get('[data-qa="name-on-card"]').should('have.value', '').type(userData.name);
    cy.get('[data-qa="card-number"]').should('have.value', '').type(userData.cardNumber);
    cy.get('[data-qa="cvc"]').should('have.value', '').type(userData.cvc);
    cy.get('[data-qa="expiry-month"]').should('have.value', '').type(userData.cardExpiry.month);
    cy.get('[data-qa="expiry-year"]').should('have.value', '').type(userData.cardExpiry.year);
});
