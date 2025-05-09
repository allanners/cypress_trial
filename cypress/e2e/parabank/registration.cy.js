/// <reference types ="cypress" />
import { generateCustomerData } from '../../support/fakerUtil';

describe("Parabank Registration with Fixtures", () => {

    beforeEach(() => {
        cy.visit('index.htm');
    });

    it("Should Successfully Register a Customer", () => {
        // Reset Database
        cy.clearDatabase();
        
        // Click on Register Link
        cy.get('#loginPanel > :nth-child(3) > a').should('be.visible').click();
        cy.wait(1500);
        
        // Assert link
        cy.url().should('include', 'register.htm');


        cy.fixture('credentials.json').then((credentials) => {
            // Input fields
            cy.fillRegistrationForm(credentials);
        });
        
    });

    it("Should Successfully Login as Customer", () => {
        cy.url().should('include', 'index.htm');
        
        cy.get('form[name="login"]').contains('b', 'Username').should('be.visible');
        cy.get('form[name="login"]').contains('b', 'Password').should('be.visible');
        cy.get('input[type="submit"][value="Log In"]').should('be.visible').should('not.be.disabled');

        cy.fixture('credentials.json').then((credentials) => {
            cy.get('input[name="username"]').should('have.value', '').type(credentials.username);
            cy.get('input[name="password"]').should('have.value', '').type(credentials.password);
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

        // Input fields
        cy.fillRegistrationForm(customer);
    });

    it("Should Successfully Login as Customer", function () {
        cy.url().should('include', 'index.htm');
    
        cy.get('form[name="login"]').contains('b', 'Username').should('be.visible');
        cy.get('form[name="login"]').contains('b', 'Password').should('be.visible');
        cy.get('input[type="submit"][value="Log In"]').should('be.visible').should('not.be.disabled');
    
        
        cy.get('input[name="username"]').should('have.value', '').type(customer.username);
        cy.get('input[name="password"]').should('have.value', '').type(customer.password);
        cy.get('input[type="submit"][value="Log In"]').click();
        cy.wait(1500);

        cy.get('.smallText').contains(`Welcome ${customer.firstName} ${customer.lastName}`).should("be.visible");
    
    });
});

describe("Parabank Registration with Fixtures and Faker", () => {
    beforeEach(() => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    });

    it("Should Register a Customer with Fake Data", () => {
        // Reset Database
        cy.clearDatabase();

        // Click on Register Link
        cy.get('#loginPanel > :nth-child(3) > a').should('be.visible').click();
        cy.wait(1500);
        
        // Assert link
        cy.url().should('include', 'register.htm');

        const customer = generateCustomerData(); // Generate random user

        // Create Fixtures
        cy.writeFile('cypress/fixtures/fakerData.json', customer);

        cy.fixture('fakerData.json').then((credentials) => {
            // Input fields
            cy.fillRegistrationForm(credentials);
        });
    
    });

    it("Should Successfully Login as Customer", function () {
        cy.url().should('include', 'index.htm');
    
        cy.get('form[name="login"]').contains('b', 'Username').should('be.visible');
        cy.get('form[name="login"]').contains('b', 'Password').should('be.visible');
        cy.get('input[type="submit"][value="Log In"]').should('be.visible').should('not.be.disabled');

        cy.fixture('fakerData.json').then((credentials) => {
            cy.get('input[name="username"]').should('have.value', '').type(credentials.username);
            cy.get('input[name="password"]').should('have.value', '').type(credentials.password);
            cy.get('input[type="submit"][value="Log In"]').click();
            cy.wait(1500);
            cy.get('.smallText').contains(`Welcome ${credentials.firstName} ${credentials.lastName}`).should("be.visible");
        });   
    });
});