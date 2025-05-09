describe('Login Test Suite.', () => {
  beforeEach(() => {
    cy.visit('') 
  })

  it('Verify if user successfully logins with valid existing credentials', () => {
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.contains("Swag Labs").should("be.visible")
    cy.url().should("include", "inventory")
  })

  it('Verify if user fails to login with non-existing credentials', () => {
    cy.get('[data-test="username"]').type("non-existing_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should("be.visible").and("contain", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("equals", "https://www.saucedemo.com/");

  })
})

