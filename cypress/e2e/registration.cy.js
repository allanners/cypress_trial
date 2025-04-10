/// <reference types ="cypress" />
describe("Parabank Registration", () => {
    const USER_INDEX = 0;

    beforeEach(() => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    });

    it("Should Successfully Register a Customer", () => {
        // Click on Register Link
        cy.get('#loginPanel > :nth-child(3) > a').should('be.visible').click();
        
        // Assert link
        cy.url().should('include', 'register.htm');

        // Verify visibility of labels
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

        cy.fixture('credentials.json').then((credentials) => {
            const user = credentials[USER_INDEX];
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
            cy.get('input[type="submit"][value="Register"]').click();
            cy.contains(`Welcome ${user.username}`).should("be.visible");
        });
        
    });

    it("Should Successfully Login as Customer", () => {
        cy.url().should('include', 'index.htm');
        
        cy.get(':nth-child(1) > b').should('be.visible');
        cy.get(':nth-child(3) > b').should('be.visible');
        cy.get('input[type="submit"][value="Log In"]').should('be.visible').should('not.be.disabled');

        cy.fixture('credentials.json').then((credentials) => {
            const user = credentials[USER_INDEX];
            cy.get(':nth-child(2) > .input').should('have.value', '').type(user.username);
            cy.get(':nth-child(4) > .input').should('have.value', '').type(user.password);
            cy.get('input[type="submit"][value="Log In"]').click();
            cy.get('.smallText').contains(`Welcome ${user.firstName} ${user.lastName}`).should("be.visible");
        });   

    });

});