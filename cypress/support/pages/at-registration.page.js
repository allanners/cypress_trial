class ATRegistrationPage {
    
    signupNameInput = '[data-qa="signup-name"]';
    signupEmailInput = '[data-qa="signup-email"]';
    signupBtn = '[data-qa="signup-button"]';

    mrRadioBtn = '#id_gender1';
    mrsRadioBtn = '#id_gender2';
    nameInput = 'input[data-qa="name"]';
    emailInput = 'input[data-qa="email"]';
    passwordInput = 'input[data-qa="password"]';
    dateOfBirth = {
        day: 'select[data-qa="days"]',
        month: 'select[data-qa="months"]',
        year: 'select[data-qa="years"]'
    }
    firstNameInput = '[data-qa="first_name"]';
    lastNameInput = '[data-qa="last_name"]';
    companyInput = '[data-qa="company"]';
    addressInput = '[data-qa="address"]';
    address2Input = '[data-qa="address2"]';
    countryInput = '[data-qa="country"]';
    stateInput = '[data-qa="state"]';
    cityInput = '[data-qa="city"]';
    zipcodeInput = '[data-qa="zipcode"]';
    mobileNumberInput = '[data-qa="mobile_number"]';
    createAccountBtn = '[data-qa="create-account"]';

    loginForm = '.login-form';
    
    // Fill up first sign up form
    fillInitialSignUpForm(userData) {
        cy.get(this.signupNameInput).should('have.value', '').type(userData.name);
        cy.get(this.signupEmailInput).should('have.value', '').type(userData.email);
        cy.get(this.signupBtn).should('not.be.disabled').and('be.visible').click();
    }

    // Fill up second sign up form
    fillSignUpForm(userData, testCase) {
        // Select and assert Mr. and Mrs. radio buttons
        cy.get(this.mrRadioBtn).should('not.be.checked');
        cy.get(this.mrsRadioBtn).should('not.be.checked');
        cy.get(userData.title === "Mr." ? this.mrRadioBtn : this.mrsRadioBtn).check();
        cy.get(userData.title === "Mr." ? this.mrRadioBtn : this.mrsRadioBtn) // Get title
            .should('be.checked')   // Correct title should be checked
            .get(!(userData.title === "Mr.") ? '#id_gender1' : '#id_gender2') // Get opposite title
            .should('not.be.checked'); // Opposite title should not be checked
        
        // Fill input fields
        cy.get(this.nameInput).should('have.value', userData.name);
        cy.get(this.emailInput).should('have.value', userData.email);
        cy.get(this.passwordInput).should('have.value', '').type(userData.password);

        // Select date of birth
        cy.get(`${this.dateOfBirth.day} option:selected`).should('have.text', 'Day');
        cy.get(this.dateOfBirth.day).select(userData.dateOfBirth.day)
            .should('have.value', userData.dateOfBirth.day);

        cy.get(`${this.dateOfBirth.month} option:selected`).should('have.text', 'Month');
        cy.get(this.dateOfBirth.month).select(userData.dateOfBirth.month)
            .should('have.value', userData.dateOfBirth.month);

        cy.get(`${this.dateOfBirth.year} option:selected`).should('have.text', 'Year');
        cy.get(this.dateOfBirth.year).select(userData.dateOfBirth.year)
            .should('have.value', userData.dateOfBirth.year);

        // Fill rest of input fields
        cy.get(this.firstNameInput).should('have.value', '').type(userData.firstName);
        cy.get(this.lastNameInput).should('have.value', '').type(userData.lastName);
        cy.get(this.companyInput).should('have.value', '').type(userData.company);
        cy.get(this.addressInput).should('have.value', '').type(userData.address);
        cy.get(this.address2Input).should('have.value', '').type(userData.address2);
        cy.get(this.countryInput).select(userData.country);
        cy.get(this.stateInput).should('have.value', '').type(userData.state);
        cy.get(this.cityInput).should('have.value', '').type(userData.city);
        cy.get(this.zipcodeInput).should('have.value', '').type(userData.zipcode);
        cy.get(this.mobileNumberInput).should('have.value', '').type(userData.mobileNumber);

        // Screenshot login form
        cy.get(this.loginForm)
            .scrollIntoView()
            .should('be.visible')
            .screenshot(`test-case-${testCase}-signup-form`);
        
        cy.get(this.createAccountBtn).should('not.be.disabled').and('be.visible').click();
        cy.wait(1000);
    }
}

export default new ATRegistrationPage();