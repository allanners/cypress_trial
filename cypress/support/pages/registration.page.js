class RegistrationPage {
  // Define locators
  firstNameInput = 'input[id="customer.firstName"]';
  lastNameInput = 'input[id="customer.lastName"]';
  addressInput = 'input[id="customer.address.street"]';
  cityInput = 'input[id="customer.address.city"]';
  stateInput = 'input[id="customer.address.state"]';
  zipCodeInput = 'input[id="customer.address.zipCode"]';
  phoneNumberInput = 'input[id="customer.phoneNumber"]';
  ssnInput = 'input[id="customer.ssn"]';
  usernameInput = 'input[id="customer.username"]';
  passwordInput = 'input[id="customer.password"]';
  confirmPasswordInput = 'input[id="repeatedPassword"]';
  registerButton = 'input[value="Register"]';
  welcomeMessage = 'h1.title';

  labels = [
    "First Name", "Last Name", "Address", "City", "State",
    "Zip Code", "Phone #", "SSN", "Username",
    "Password", "Confirm"
  ];

  // Method to fill the signup form
  fillSignUpForm({
    firstName,
    lastName,
    addressStreet,
    addressCity,
    addressState,
    addressZipCode,
    phoneNumber,
    ssn,
    username,
    password,
  }) {
    cy.get(this.firstNameInput).should('have.value', '').type(firstName);
    cy.get(this.lastNameInput).should('have.value', '').type(lastName);
    cy.get(this.addressInput).should('have.value', '').type(addressStreet);
    cy.get(this.cityInput).should('have.value', '').type(addressCity);
    cy.get(this.stateInput).should('have.value', '').type(addressState);
    cy.get(this.zipCodeInput).should('have.value', '').type(addressZipCode);
    cy.get(this.phoneNumberInput).should('have.value', '').type(phoneNumber);
    cy.get(this.ssnInput).should('have.value', '').type(ssn);
    cy.get(this.usernameInput).should('have.value', '').type(username);
    cy.get(this.passwordInput).should('have.value', '').type(password);
    cy.get(this.confirmPasswordInput).should('have.value', '').type(password);
  }

  verifyRegistrationLabels() {
    this.labels.forEach(label => {
      cy.contains('.form2', label).should('be.visible');
    });
  }

  // Method to submit the signup form
  submitSignUpForm() {
    cy.get(this.registerButton).should('be.visible').and('not.be.disabled').click();
  }

  // Method to verify successful signup
  verifySignUpSuccess(username) {
    cy.get(this.welcomeMessage).should('contain.text', `Welcome ${username}`);
  }
}

export default new RegistrationPage();