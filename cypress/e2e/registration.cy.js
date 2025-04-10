/// <reference types ="cypress" />
describe("Parabank Registration", () => {
    beforeEach(() => {

        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    });

    it("Should Successfully Register a Customer", () => {
        cy.url().should('include', 'register.htm');

        cy.get(':nth-child(1) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.firstName"]').should('have.value', '').type('Glorious King');

        cy.get(':nth-child(2) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.lastName"]').type('Lebron');

        cy.get(':nth-child(3) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.address.street"]').type('1234 Golden St.');

        cy.get(':nth-child(4) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.address.city"]').type('State City');

        cy.get(':nth-child(5) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.address.state"]').type('Golden State');

        cy.get(':nth-child(6) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.address.zipCode"]').type('N1G 3EP');

        cy.get(':nth-child(7) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.phoneNumber"]').type('09561543429');

        cy.get(':nth-child(8) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.ssn"]').type('01-2345-67');

        let username = 'ILoveGodwynne#123';

        cy.get(':nth-child(10) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.username"]').type(username);

        cy.get(':nth-child(11) > [align="right"] > b').should('be.visible');
        cy.get('input[id="customer.password"]').type('LebronLover_123');

        cy.get(':nth-child(12) > [align="right"] > b').should('be.visible');
        cy.get('input[id="repeatedPassword"]').type('LebronLover_123');

        
        cy.get('input[type="submit"][value="Register"]').should('be.visible').should('not.be.disabled').click();
        cy.contains(`Welcome ${username}`).should("be.visible");
    });

});