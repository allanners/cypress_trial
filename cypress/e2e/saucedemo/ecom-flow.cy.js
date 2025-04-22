describe('E-commerce Workflow Suite.', () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/",  {timeout: 240000});
    cy.authSauceDemo('standard_user', 'secret_sauce');
  });

  it("Should Successfully Login", () => {
    // Assert successful login by checking URL
    cy.url().should("include", "/inventory.html");

    // Assert the presence of a logged-in indicator (like the shopping cart)
    cy.get(".shopping_cart_link").should("be.visible");
  
    // Screenshot
    cy.takeScreen("login");
  });

  it("Should Successfully Add to Cart", () => {
    // Add item to cart
    cy.addToCart("Sauce Labs Backpack");

    // Screenshot
    cy.takeScreen("add-to-cart");

  });

  it("Should Successfully Checkout", () => {
    // Add item to cart
    cy.addToCart("Sauce Labs Backpack");

    // Go to cart
    cy.get('.shopping_cart_link').click();
    cy.url().should("include", "/cart.html"); // Check if in cart.html site

    // Checkout
    cy.checkout();
   
    // Assert success message
    cy.get('[data-test="checkout-complete-container"]') // Get test checkout container
    .contains("Thank you for your order!") // Contains thank you message
    .should("be.visible"); // Should be visible
    
    // Screenshot
    cy.takeScreen("checkout");
  });
});