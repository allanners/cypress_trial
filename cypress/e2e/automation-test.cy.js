import { generateUserData } from "../support/fakerUtil";

describe("Place Order Test Suite", () => {
    before(() => {
        cy.generateUserData(); // Generate User Data
    });

    it("Place Order: Register While Checkout", () => {
        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('http://automationexercise.com');
        cy.url().should('include', 'automationexercise.com');

        // 3. Verify that home page is visible successfully
        cy.get('header').should('be.visible'); // Checking if the header is visible
        cy.get('.logo img').should('exist'); // Selects element with class=logo; then selects img tag
        cy.get('.col-sm-6').contains('Full-Fledged practice website for Automation Engineers').should('be.visible'); // Checking for a main section
        cy.takeScreen('test-case-14-homepage-visibility');

        // 4. Add products to cart
        cy.addProductToCart(4);
        cy.addProductToCart(5);
        cy.addProductToCart(6);

        // 5. Click 'Cart' button
        cy.get('.shop-menu > .nav > :nth-child(3)').should('be.visible').click();
        cy.wait(1000);

        // 6. Verify that cart page is displayed
        cy.get('li.active').should('be.visible').and('contain', 'Shopping Cart');
        cy.takeScreen('test-case-14-cart-page-visibility');

        // 7. Click Proceed To Checkout
        cy.get('a.btn.btn-default.check_out')
            .should('contain', 'Proceed To Checkout')
            .and('be.visible')
            .click();
        cy.wait(1000);
        
        // 8. Click 'Register / Login' button
        cy.get('.modal-body > :nth-child(2) > a > u')
            .should('contain', 'Register / Login')
            .and('be.visible')
            .click();
        cy.wait(1000);

        // 9. Fill all details in Signup and create account
        cy.fillInitialSignUpForm();
        cy.fillSignUpForm();

        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        cy.get('[data-qa="account-created"]').should('be.visible').and('contain', 'Account Created!');
        cy.takeScreen('test-case-14-account-created');
        cy.get('[data-qa="continue-button"]').should('not.be.disabled').and('be.visible').click();
        cy.wait(1000);


        // 11. Verify ' Logged in as username' at top
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.get('.nav > :nth-child(10) > a').should('be.visible')
                .and('contain', ` Logged in as ${userData.name}`);
        });
        cy.takeScreen('test-case-14-logged-in-as-username');

        // 12.Click 'Cart' button
        cy.get('.shop-menu > .nav > :nth-child(3) > a')
            .should('be.visible')
            .and('contain', 'Cart')
            .click();
        
        // 13. Click 'Proceed To Checkout' button
        cy.get('a.btn.btn-default.check_out')
            .should('contain', 'Proceed To Checkout')
            .and('be.visible')
            .click();
        cy.wait(1000);

        // 14. Verify Address Details and Review Your Order
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.verifyAddress('invoice', userData);
            cy.verifyAddress('delivery', userData);
        });
        cy.takeScreen('test-case-14-verify-address-details');

        // 15. Enter description in comment text area and click 'Place Order'
        cy.get('.form-control').should('be.visible').type('Test comment 123#_.!');
        cy.get(':nth-child(7) > .btn').should('be.visible').and('not.be.disabled').click();

        // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.enterCardDetails(userData);
        });
        
        // 17. Click 'Pay and Confirm Order' button
        cy.get('[data-qa="pay-button"]').should('be.visible').and('not.be.disabled').click();

        // 18. Verify success message 'Your order has been placed successfully!'
        cy.get('[data-qa="order-placed"] > b').should('be.visible').and('contain', 'Order Placed!');
        cy.url().should('contain', 'payment_done');
        cy.takeScreen('test-case-14-order-placed-successfully');
        
        // 19. Click 'Delete Account' button
        cy.get('a[href="/delete_account"]').should('be.visible').and('contain', 'Delete Account').click();
        cy.wait(1000);

        // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain', 'Account Deleted!');
        cy.takeScreen('test-case-14-account-deleted');
        cy.get('[data-qa="continue-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);
    });

    it("Place Order: Register Before Checkout", () => {
        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('http://automationexercise.com');
        cy.url().should('include', 'automationexercise.com');

        // 3. Verify that home page is visible successfully
        cy.get('header').should('be.visible'); // Checking if the header is visible
        cy.get('.logo img').should('exist'); // Selects element with class=logo; then selects img tag
        cy.get('.col-sm-6').contains('Full-Fledged practice website for Automation Engineers').should('be.visible'); // Checking for a main section
        cy.takeScreen('test-case-15-homepage-visibility');

        // 4. Click 'Signup / Login' button
        cy.get('a[href="/login"]').should('contain', 'Signup / Login').click();

        // 5. Fill all details in Signup and create account
        cy.fillInitialSignUpForm();
        cy.fillSignUpForm();

        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        cy.get('[data-qa="account-created"]').should('be.visible').and('contain', 'Account Created!');
        cy.takeScreen('test-case-15-account-created');
        cy.get('[data-qa="continue-button"]').should('not.be.disabled').and('be.visible').click();
        cy.wait(1000);

        // 7. Verify ' Logged in as username' at top
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            console.log(userData.name);
            cy.get('.nav > :nth-child(10) > a').should('be.visible')
                .and('contain', ` Logged in as ${userData.name}`);
        });
        cy.takeScreen('test-case-15-logged-in-as-username');

        // 8. Add products to cart
        cy.addProductToCart(4);
        cy.addProductToCart(5);
        cy.addProductToCart(6);

        // 9. Click 'Cart' button
        cy.get('.shop-menu > .nav > :nth-child(3)').should('be.visible').click();
        cy.wait(1000);
        
        // 10. Verify that cart page is displayed
        cy.get('li.active').should('be.visible').and('contain', 'Shopping Cart');
        cy.takeScreen('test-case-15-cart-page-visibility');

        // 11. Click Proceed To Checkout
        cy.get('a.btn.btn-default.check_out')
            .should('contain', 'Proceed To Checkout')
            .and('be.visible')
            .click();
        cy.wait(1000);
        
        // 12. Verify Address Details and Review Your Order
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.verifyAddress('invoice', userData);
            cy.verifyAddress('delivery', userData);
        });
        cy.takeScreen('test-case-15-verify-address-details');

        // 13. Enter description in comment text area and click 'Place Order'
        cy.get('.form-control').should('be.visible').type('Test comment 123#_.!');
        cy.get(':nth-child(7) > .btn').should('be.visible').and('not.be.disabled').click();

        // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.enterCardDetails(userData);
        });

        // 15. Click 'Pay and Confirm Order' button
        cy.get('[data-qa="pay-button"]').should('be.visible').and('not.be.disabled').click();

        // 16. Verify success message 'Your order has been placed successfully!'
        cy.get('[data-qa="order-placed"] > b').should('be.visible').and('contain', 'Order Placed!');
        cy.url().should('contain', 'payment_done');
        cy.takeScreen('test-case-15-order-placed-successfully');

        // 17. Click 'Delete Account' button
        cy.get('a[href="/delete_account"]').should('be.visible').and('contain', 'Delete Account').click();
        cy.wait(1000);

        // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain', 'Account Deleted!');
        cy.takeScreen('test-case-15-account-deleted');
        cy.get('[data-qa="continue-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);
    });

    it("Place Order: Login Before Checkout", () => {
        // Prerequesite
        cy.visit('http://automationexercise.com');
        cy.get('a[href="/login"]').should('contain', 'Signup / Login').click();
        cy.fillInitialSignUpForm();
        cy.fillSignUpForm();
        cy.get('[data-qa="continue-button"]').should('not.be.disabled').and('be.visible').click();
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain', 'Logout').click();

        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('http://automationexercise.com');
        cy.url().should('include', 'automationexercise.com');

        // 3. Verify that home page is visible successfully
        cy.get('header').should('be.visible'); // Checking if the header is visible
        cy.get('.logo img').should('exist'); // Selects element with class=logo; then selects img tag
        cy.get('.col-sm-6').contains('Full-Fledged practice website for Automation Engineers').should('be.visible'); // Checking for a main section
        cy.takeScreen('test-case-16-homepage-visibility');

        // 4. Click 'Signup / Login' button
        cy.get('a[href="/login"]').should('contain', 'Signup / Login').click();

        // 5. Fill email, password and click 'Login' button
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.get('[data-qa="login-email"]').should('contain', '').type(userData.email);
            cy.get('[data-qa="login-password"]').should('contain', '').type(userData.password);
            cy.get('[data-qa="login-button"]').should('not.be.disabled').and('be.visible').click();
        
            // 6. Verify 'Logged in as username' at top
            cy.get('.nav > :nth-child(10) > a').should('be.visible')
                .and('contain', ` Logged in as ${userData.name}`);
        });
        
        // 7. Add products to cart
        cy.addProductToCart(4);
        cy.addProductToCart(5);
        cy.addProductToCart(6);

        // 8. Click 'Cart' button
        cy.get('.shop-menu > .nav > :nth-child(3)').should('be.visible').click();
        cy.wait(1000);

        // 9. Verify that cart page is displayed
        cy.get('li.active').should('be.visible').and('contain', 'Shopping Cart');
        cy.takeScreen('test-case-16-cart-page-visibility');

        // 10. Click Proceed To Checkout
        cy.get('a.btn.btn-default.check_out')
            .should('contain', 'Proceed To Checkout')
            .and('be.visible')
            .click();
        cy.wait(1000);

        // 11. Verify Address Details and Review Your Order
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
        cy.verifyAddress('invoice', userData);
        cy.verifyAddress('delivery', userData);

        // 12. Enter description in comment text area and click 'Place Order'
        cy.get('.form-control').should('be.visible').type('Test comment 123#_.!');
        cy.get(':nth-child(7) > .btn').should('be.visible').and('not.be.disabled').click();
        
        // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.enterCardDetails(userData);
        });

        // 14. Click 'Pay and Confirm Order' button
        cy.get('[data-qa="pay-button"]').should('be.visible').and('not.be.disabled').click();

        // 15. Verify success message 'Your order has been placed successfully!'
        cy.get('[data-qa="order-placed"] > b').should('be.visible').and('contain', 'Order Placed!');
        cy.url().should('contain', 'payment_done');
        cy.takeScreen('test-case-16-order-placed-successfully');

        // 16. Click 'Delete Account' button
        cy.get('a[href="/delete_account"]').should('be.visible').and('contain', 'Delete Account').click();
        cy.wait(1000);

        // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain', 'Account Deleted!');
        cy.takeScreen('test-case-14-account-deleted');
        cy.get('[data-qa="continue-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);

        });
    });
});