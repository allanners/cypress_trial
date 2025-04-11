/// <reference types ="cypress" />
import { generateCustomerData } from '../support/fakerUtil';

describe("Parabank Registration with Fixtures", () => {

    beforeEach(() => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    });

    it("Should Successfully Register a Customer", () => {
        // Reset Database
        cy.clearDatabase();
        
        // Click on Register Link
        cy.get('#loginPanel > :nth-child(3) > a').should('be.visible').click();
        cy.wait(1500);
        
        // Assert link
        cy.url().should('include', 'register.htm');

        // Verify visibility of labels
        cy.verifyRegistrationLabels();

        cy.fixture('credentials.json').then((credentials) => {
            // Input fields
            cy.inputRegistrationFields(credentials);
            
            cy.get('input[type="submit"][value="Register"]').click();
            cy.wait(1500);
            cy.contains(`Welcome ${credentials.username}`).should("be.visible");
        });
        
    });

    it("Should Successfully Login as Customer", () => {
        cy.url().should('include', 'index.htm');
        
        cy.get(':nth-child(1) > b').should('be.visible');
        cy.get(':nth-child(3) > b').should('be.visible');
        cy.get('input[type="submit"][value="Log In"]').should('be.visible').should('not.be.disabled');

        cy.fixture('credentials.json').then((credentials) => {
            cy.get(':nth-child(2) > .input').should('have.value', '').type(credentials.username);
            cy.get(':nth-child(4) > .input').should('have.value', '').type(credentials.password);
            cy.get('input[type="submit"][value="Log In"]').click();
            cy.wait(1500);
            cy.get('.smallText').contains(`Welcome ${credentials.firstName} ${credentials.lastName}`).should("be.visible");
        });   

    });

});

describe("Parabank Registration with Faker", () => {
    beforeEach(() => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    });

    const customer = generateCustomerData(); // Generate random user

    it("Should Register a Customer with Fake Data", () => {
        // Reset Database
        cy.clearDatabase();

        // Click on Register Link
        cy.get('#loginPanel > :nth-child(3) > a').should('be.visible').click();
        cy.wait(1500);
        
        // Assert link
        cy.url().should('include', 'register.htm');

        // Verify Registration Labels
        cy.verifyRegistrationLabels();

        // Input fields
        cy.inputRegistrationFields(customer);
    
        cy.get('input[type="submit"][value="Register"]').should('not.be.disabled').click();
        cy.wait(1500);
        cy.contains(`Welcome ${customer.username}`).should("be.visible");
    });

    it("Should Successfully Login as Customer", function () {
        cy.url().should('include', 'index.htm');
    
        cy.get(':nth-child(1) > b').should('be.visible');
        cy.get(':nth-child(3) > b').should('be.visible');
        cy.get('input[type="submit"][value="Log In"]').should('be.visible').should('not.be.disabled');
    
        
        cy.get(':nth-child(2) > .input').should('have.value', '').type(customer.username);
        cy.get(':nth-child(4) > .input').should('have.value', '').type(customer.password);
        cy.get('input[type="submit"][value="Log In"]').click();
        cy.wait(1500);

        cy.get('.smallText').contains(`Welcome ${customer.firstName} ${customer.lastName}`).should("be.visible");
    
    });
});

describe("Parabank Registration with Fixtures and Faker", () => {
    beforeEach(() => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    });

    const customer = generateCustomerData(); // Generate random user

    it("Should Register a Customer with Fake Data", () => {
        // Reset Database
        cy.clearDatabase();

        // Click on Register Link
        cy.get('#loginPanel > :nth-child(3) > a').should('be.visible').click();
        cy.wait(1500);
        
        // Assert link
        cy.url().should('include', 'register.htm');

        // Verify Registration Labels
        cy.verifyRegistrationLabels();

        // Create Fixtures
        cy.writeFile('cypress/fixtures/fakerData.json', customer);

        cy.fixture('fakerData.json').then((credentials) => {
            // Input fields
            cy.inputRegistrationFields(credentials);
            
            cy.get('input[type="submit"][value="Register"]').click();
            cy.wait(1500);
            cy.contains(`Welcome ${credentials.username}`).should("be.visible");
        });
    
    });

    it("Should Successfully Login as Customer", function () {
        cy.url().should('include', 'index.htm');
    
        cy.get(':nth-child(1) > b').should('be.visible');
        cy.get(':nth-child(3) > b').should('be.visible');
        cy.get('input[type="submit"][value="Log In"]').should('be.visible').should('not.be.disabled');

        cy.fixture('fakerData.json').then((credentials) => {
            cy.get(':nth-child(2) > .input').should('have.value', '').type(credentials.username);
            cy.get(':nth-child(4) > .input').should('have.value', '').type(credentials.password);
            cy.get('input[type="submit"][value="Log In"]').click();
            cy.wait(1500);
            cy.get('.smallText').contains(`Welcome ${credentials.firstName} ${credentials.lastName}`).should("be.visible");
        });   
    });
});