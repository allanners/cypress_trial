class ATCheckoutPage {
    // Form getters
    name(type) { return cy.get(`#address_${type} li`).eq(1); }
    company(type) { return cy.get(`#address_${type} li`).eq(2); }
    address(type) { return cy.get(`#address_${type} li`).eq(3); }
    address2(type) { return cy.get(`#address_${type} li`).eq(4); }
    city(type) { return cy.get(`#address_${type} li.address_city`); }
    state(type) { return cy.get(`#address_${type} li.address_state_name`); }
    zipcode(type) { return cy.get(`#address_${type} li.address_postcode`); }
    country(type) { return cy.get(`#address_${type} li`).eq(6); }
    mobileNumber(type) { return cy.get(`#address_${type} li`).eq(7); }

    // Delivery details
    checkoutInfo() { return cy.get('[data-qa="checkout-info"]'); }

    // Description form
    descriptionForm() { return cy.get('.form-control'); }
    placeOrderBtn() { return cy.get('.check_out'); }

    verifyAddress(type, userData) {
        this.name(type)
            .should('contain', `${userData.title} ${userData.firstName} ${userData.lastName}`);
        this.company(type).should('contain', userData.company);
        this.address(type).should('contain', userData.address);
        this.address2(type).should('contain', userData.address2);
        this.city(type).should('contain', `${userData.city}`);
        this.state(type).should('contain', `${userData.state}`);
        this.zipcode(type).should('contain', `${userData.zipcode}`);
        this.country(type).should('contain', userData.country);
        this.mobileNumber(type).should('contain', userData.mobileNumber);
    }

    captureAddressDetails(testCase) {
        this.checkoutInfo()
            .should('be.visible')
            .scrollIntoView()
            .screenshot(`test-case-${testCase}-address-details`);
    }

    enterDescription() {
        this.descriptionForm().should('be.visible').type('Test comments 123#_.!');
        this.placeOrderBtn().should('be.visible').and('not.be.disabled').click();
        cy.wait(1000);
    }
}

export default new ATCheckoutPage();