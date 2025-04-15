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
    // cy.takeScreen("login");
    const date = new Date();
    const formattedDate = 
        `${String(date.getMonth()+1). // Gets month today +1 since month starts with a 0
        padStart(2, '0')}-${String(date.getDate()). // Pad month with 0s; get date
        padStart(2, '0')}-${String(date.getFullYear()). // Pad date with 0s, get year
        slice(-2)}`; // Retain only the last 2 digits of the year
    const fileName = `${prefix}-${formattedDate}`; // Combine all of them
    cy.screenshot(fileName);
  });

  it("Should Successfully Add to Cart", () => {
    // Add item to cart
    cy.addToCart("Sauce Labs Backpack");

    // Screenshot
    // cy.takeScreen("add-to-cart");

    const date = new Date();
    const formattedDate = 
        `${String(date.getMonth()+1). // Gets month today +1 since month starts with a 0
        padStart(2, '0')}-${String(date.getDate()). // Pad month with 0s; get date
        padStart(2, '0')}-${String(date.getFullYear()). // Pad date with 0s, get year
        slice(-2)}`; // Retain only the last 2 digits of the year
    const fileName = `${prefix}-${formattedDate}`; // Combine all of them
    cy.screenshot(fileName);
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
    // cy.takeScreen("checkout");
    const date = new Date();
    const formattedDate = 
        `${String(date.getMonth()+1). // Gets month today +1 since month starts with a 0
        padStart(2, '0')}-${String(date.getDate()). // Pad month with 0s; get date
        padStart(2, '0')}-${String(date.getFullYear()). // Pad date with 0s, get year
        slice(-2)}`; // Retain only the last 2 digits of the year
    const fileName = `${prefix}-${formattedDate}`; // Combine all of them
    cy.screenshot(fileName);
  });
});