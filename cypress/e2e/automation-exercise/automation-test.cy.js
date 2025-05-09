import { generateUserData } from "../../support/fakerUtil";

describe("Place Order Test Suite", () => {
    before(() => {
        cy.generateUserData(); // Generate User Data
    });

    it("Place Order: Register While Checkout", () => {
        const testCase = 14;

        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('');
        cy.url().should('include', 'automationexercise.com');

        // 3. Verify that home page is visible successfully
        cy.get('header').should('be.visible'); // Checking if the header is visible
        cy.get('.logo img').should('exist'); // Selects element with class=logo; then selects img tag
        cy.get('.col-sm-6').contains('Full-Fledged practice website for Automation Engineers').should('be.visible'); // Checking for a main section
        cy.get('section[id="slider"]')
            .scrollIntoView()
            .should('be.visible')
            .screenshot(`test-case-${testCase}-homepage-visibility`);

        // 4. Add products to cart
        cy.addProductToCart(4);
        cy.addProductToCart(5);
        cy.addProductToCart(6);

        // 5. Click 'Cart' button
        cy.contains('a', 'Cart').should('be.visible').click();
        cy.wait(1000);

        // 6. Verify that cart page is displayed
        cy.get('li.active').should('be.visible').and('contain', 'Shopping Cart');
        cy.get('#cart_items')
            .scrollIntoView()
            .should('be.visible')
            .screenshot(`test-case-${testCase}-cart-page-visibility`);

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
        cy.fillRegistrationForms(testCase);

        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        cy.get('[data-qa="account-created"]').should('be.visible').and('contain', 'Account Created!');
        cy.get('[data-qa="continue-button"]').should('not.be.disabled').and('be.visible').click();
        cy.wait(1000);


        // 11. Verify ' Logged in as username' at top
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.contains('a', ` Logged in as ${userData.name}`);
            // cy.get('.nav > :nth-child(10) > a').should('be.visible')
            //     .and('contain', ` Logged in as ${userData.name}`);
            cy.get('.navbar-nav')
                .scrollIntoView()
                .screenshot(`test-case-${testCase}-logged-in-as-username`);
        });

        // 12.Click 'Cart' button
        cy.contains('a', 'Cart').should('be.visible').click();
        cy.wait(1000);

        // 13. Click 'Proceed To Checkout' button
        cy.get('a.btn.btn-default.check_out')
            .should('contain', 'Proceed To Checkout')
            .and('be.visible')
            .click();
        cy.wait(1000);

        // 14. Verify Address Details and Review Your Order & 15. Enter description in comment text area and click 'Place Order'
        cy.verifyCheckout(testCase);

        // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.enterCardDetails(userData);
            cy.get('#cart_items > .container')
                .should('be.visible')
                .scrollIntoView()
                .screenshot(`test-case-${testCase}-card-details`);
        });
        
        // 17. Click 'Pay and Confirm Order' button
        cy.get('[data-qa="pay-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);

        // 18. Verify success message 'Your order has been placed successfully!'
        cy.get('[data-qa="order-placed"] > b').should('be.visible').and('contain', 'Order Placed!');
        cy.url().should('contain', 'payment_done');
        
        // 19. Click 'Delete Account' button
        cy.get('a[href="/delete_account"]').should('be.visible').and('contain', 'Delete Account').click();
        cy.wait(1000);

        // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.get('[data-qa="account-deleted"]')
            .should('be.visible')
            .and('contain', 'Account Deleted!')
        cy.get('.col-sm-9')
            .scrollIntoView()
            .screenshot(`test-case-${testCase}-account-deleted`);
        cy.get('[data-qa="continue-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);
    });

    it("Place Order: Register Before Checkout", () => {
        const testCase = 15;

        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('');
        cy.url().should('include', 'automationexercise.com');

        // 3. Verify that home page is visible successfully
        cy.get('header').should('be.visible'); // Checking if the header is visible
        cy.get('.logo img').should('exist'); // Selects element with class=logo; then selects img tag
        cy.get('.col-sm-6').contains('Full-Fledged practice website for Automation Engineers').should('be.visible'); // Checking for a main section
        cy.get('section[id="slider"]')
            .scrollIntoView()
            .should('be.visible')
            .screenshot(`test-case-${testCase}-homepage-visibility`);

        // 4. Click 'Signup / Login' button
        cy.contains('a', 'Signup / Login').should('be.visible').click();
        cy.wait(1000);

        // 5. Fill all details in Signup and create account
        cy.fillRegistrationForms(testCase);

        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        cy.get('[data-qa="account-created"]').should('be.visible').and('contain', 'Account Created!');
        cy.get('[data-qa="continue-button"]').should('not.be.disabled').and('be.visible').click();
        cy.wait(1000);

        // 7. Verify ' Logged in as username' at top
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.contains('a', ` Logged in as ${userData.name}`);
            // cy.get('.nav > :nth-child(10) > a').should('be.visible')
            //     .and('contain', ` Logged in as ${userData.name}`);
            cy.get('.navbar-nav')
                .scrollIntoView()
                .screenshot(`test-case-${testCase}-logged-in-as-username`);
        });

        // 8. Add products to cart
        cy.addProductToCart(4);
        cy.addProductToCart(5);
        cy.addProductToCart(6);

        // 9. Click 'Cart' button
        cy.contains('a', 'Cart').should('be.visible').click();
        cy.wait(1000);
        
        // 10. Verify that cart page is displayed
        cy.get('li.active').should('be.visible').and('contain', 'Shopping Cart');
        cy.get('#cart_items')
            .scrollIntoView()
            .should('be.visible')
            .screenshot(`test-case-${testCase}-cart-page-visibility`);

        // 11. Click Proceed To Checkout
        cy.get('a.btn.btn-default.check_out')
            .should('contain', 'Proceed To Checkout')
            .and('be.visible')
            .click();
        cy.wait(1000);
        
        // 12. Verify Address Details and Review Your Order & 13. Enter description in comment text area and click 'Place Order'
        cy.verifyCheckout(testCase);

        // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.enterCardDetails(userData);
            cy.get('#cart_items > .container')
                .should('be.visible')
                .scrollIntoView()
                .screenshot(`test-case-${testCase}-card-details`);
        });

        // 15. Click 'Pay and Confirm Order' button
        cy.get('[data-qa="pay-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);

        // 16. Verify success message 'Your order has been placed successfully!'
        cy.get('[data-qa="order-placed"] > b').should('be.visible').and('contain', 'Order Placed!');
        cy.url().should('contain', 'payment_done');

        // 17. Click 'Delete Account' button
        cy.get('a[href="/delete_account"]').should('be.visible').and('contain', 'Delete Account').click();
        cy.wait(1000);

        // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain', 'Account Deleted!');
        cy.get('.col-sm-9')
            .scrollIntoView()
            .screenshot(`test-case-${testCase}-account-deleted`);
        cy.get('[data-qa="continue-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);
    });

    it("Place Order: Login Before Checkout", () => {
        const testCase = 16;

        // Prerequesite - Create an account
        cy.visit('');
        cy.get('a[href="/login"]').should('contain', 'Signup / Login').click();
        cy.wait(1000);
        // Create account
        cy.fillRegistrationForms(testCase);
        cy.get('[data-qa="continue-button"]').should('contain', 'Continue').click();
        cy.wait(1000);
        cy.contains('a', 'Logout').should('be.visible').click();
        // cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain', 'Logout').click();

        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('');
        cy.url().should('include', 'automationexercise.com');

        // 3. Verify that home page is visible successfully
        cy.get('header').should('be.visible'); // Checking if the header is visible
        cy.get('.logo img').should('exist'); // Selects element with class=logo; then selects img tag
        cy.get('.col-sm-6').contains('Full-Fledged practice website for Automation Engineers').should('be.visible'); // Checking for a main section
        cy.get('section[id="slider"]')
            .scrollIntoView()
            .should('be.visible')
            .screenshot(`test-case-${testCase}-homepage-visibility`);

        // 4. Click 'Signup / Login' button
        cy.contains('a', 'Signup / Login').should('be.visible').click();
        cy.wait(1000);

        // 5. Fill email, password and click 'Login' button
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.get('[data-qa="login-email"]').should('contain', '').type(userData.email);
            cy.get('[data-qa="login-password"]').should('contain', '').type(userData.password);
            cy.get('[data-qa="login-button"]').should('not.be.disabled').and('be.visible').click();
            cy.wait(1000);
        
            // 6. Verify 'Logged in as username' at top
            cy.get('.nav > :nth-child(10) > a').should('be.visible')
                .and('contain', ` Logged in as ${userData.name}`);
        });
        
        // 7. Add products to cart
        cy.addProductToCart(4);
        cy.addProductToCart(5);
        cy.addProductToCart(6);

        // 8. Click 'Cart' button
        cy.contains('a', 'Cart').should('be.visible').click();
        cy.wait(1000);

        // 9. Verify that cart page is displayed
        cy.get('li.active').should('be.visible').and('contain', 'Shopping Cart');
        cy.get('#cart_items')
            .scrollIntoView()
            .should('be.visible')
            .screenshot(`test-case-${testCase}-cart-page-visibility`);

        // 10. Click Proceed To Checkout
        cy.get('a.btn.btn-default.check_out')
            .should('contain', 'Proceed To Checkout')
            .and('be.visible')
            .click();
        cy.wait(1000);

        // 11. Verify Address Details and Review Your Order & 12. Enter description in comment text area and click 'Place Order'
        cy.verifyCheckout(testCase);
        
        // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.readFile('cypress/fixtures/exerciseTestData.json').then((userData) => {
            cy.enterCardDetails(userData);
            cy.get('#cart_items > .container')
                .should('be.visible')
                .scrollIntoView()
                .screenshot(`test-case-${testCase}-card-details`);
        });

        // 14. Click 'Pay and Confirm Order' button
        cy.get('[data-qa="pay-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);

        // 15. Verify success message 'Your order has been placed successfully!'
        cy.get('[data-qa="order-placed"] > b').should('be.visible').and('contain', 'Order Placed!');
        cy.url().should('contain', 'payment_done');

        // 16. Click 'Delete Account' button
        cy.get('a[href="/delete_account"]').should('be.visible').and('contain', 'Delete Account').click();
        cy.wait(1000);

        // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        cy.get('[data-qa="account-deleted"]')
            .should('be.visible')
            .and('contain', 'Account Deleted!');
        cy.get('.col-sm-9')
            .scrollIntoView()
            .screenshot(`test-case-${testCase}-account-deleted`);
        cy.get('[data-qa="continue-button"]').should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);
    });
});