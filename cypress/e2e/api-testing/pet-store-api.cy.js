import { faker } from '@faker-js/faker';

describe('Pet Store Inventory and Order API Tests', () => {
  
    let orderId; // Variable to store created order ID

    const orderData = {
        id: faker.number.int({ min: 1, max: 100000 }), // Generates a random order ID
        petId: faker.number.int({ min: 1, max: 1000 }), // Random pet ID within a range
        quantity: faker.number.int({ min: 1, max: 10 }), // Random quantity
        shipDate: faker.date.future().toISOString().replace('Z', '+0000'), // Matches API date format
        status: faker.helpers.arrayElement(['placed', 'approved', 'delivered']), // Random order status
        complete: faker.datatype.boolean() // Randomly true or false
    };

    const invalidOrder = {
        id: 'myGloriousHenson',
        petId: 'godwynne123',
        quantity: 'lebron',
        shipDate: 'tomorrow',
        status: 12341,
        complete: 'pumpkin spice latte',
        me: 'im speed',
        ims: 'no i didnt',
        nt: 'wait what no ew',
        gurt: 'yo'
    };
      
  
    // GET store inventory
    it('Should retrieve store inventory', () => {
        cy.api('GET', '/store/inventory')
        .then((response) => {
            // Basic status check
            expect(response.status).to.eq(200);

            // Ensure response is an object
            expect(response.body).to.be.an('object');

            // Assert some expected keys exist
            const expectedKeys = ['sold', 'string', 'pending', 'available', 'Not available'];
            
            expectedKeys.forEach(key => {
                expect(response.body).to.have.property(key);
            });

        });
    });
  
    // POST create new order
    it('Should create a new order - 200 OK', () => {
        cy.api({
            method: 'POST',
            url: '/store/order',
            body: orderData
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(orderData.id);
            expect(response.body.petId).to.eq(orderData.petId);
            expect(response.body.quantity).to.eq(orderData.quantity);
            expect(response.body.shipDate).to.eq(orderData.shipDate);
            expect(response.body.status).to.eq(orderData.status);
            expect(response.body.complete).to.eq(orderData.complete);
            orderId = response.body.id; // Store order ID for next tests
        });
    });

    // POST create new order 400 - Add % to url
    it('Should create a new order - 400 Invalid Order', () => {
        cy.api({
            method: 'POST',
            url: '/store/order/%',
            failOnStatusCode: false,
            body: orderData
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    // POST create new order 405 - Add emoji to url
    it('Should create a new order - 405 Method Not Allowed', () => {
        cy.api({
            method: 'POST',
            url: '/store/order/😀',
            failOnStatusCode: false,
            body: orderData
        }).then((response) => {
            expect(response.status).to.eq(405);
        });
    });

    // POST create new order 415 - Remove body
    it('Should create a new order - 415 Unsupported Media Type', () => {
        cy.api({
            method: 'POST',
            url: '/store/order/',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(415);
        });
    });

    // POST create new order 500 - Input valid types on properties
    it('Should create a new order - 500 Internal Server Error', () => {
        cy.api({
            method: 'POST',
            url: '/store/order/',
            failOnStatusCode: false,
            body: invalidOrder
        }).then((response) => {
            expect(response.status).to.eq(500);
        });
    });
  
    // GET order details by orderId
    it('Should retrieve order details - 200 OK', () => {
      cy.api(`GET`, `/store/order/${orderId}`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(orderId);
            expect(response.body.id).to.eq(orderData.id);
            expect(response.body.petId).to.eq(orderData.petId);
            expect(response.body.quantity).to.eq(orderData.quantity);
            expect(response.body.shipDate).to.eq(orderData.shipDate);
            expect(response.body.status).to.eq(orderData.status);
            expect(response.body.complete).to.eq(orderData.complete);
        });
    });

    it('Should retrieve order details - 404 Not Found', () => {
        cy.api({
            method: 'GET', 
            url: `/store/order/${9223372036854739000}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
      });

  
    // DELETE order by orderId
    it('Should delete an order', () => {
      cy.api({
        method: 'DELETE',
        url: `/store/order/${orderId}`
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
});

describe.skip('Pet Store Users API Tests', () => {

    let username; // Variable to store generated username

    const userId = 5000; // Random user ID

    const userData = {
        id: userId,
        username: 'hensonOiledup123',
        firstName: 'Ben',
        lastName: 'Dover',
        email: 'bendover@mail.com',
        password: 'passw0rd',
        phone: '+639561543429', // Random phone number
        userStatus: 1 // Random status (0 or 1)
    };

    const updatedUserData = {
        id: userId,
        username: 'gloriousGodwynne581',
        firstName: 'Mike',
        lastName: 'Cox',
        email: 'bendover@mail.com',
        password: 'passw0rd',
        phone: '+639561543429', // Random phone number
        userStatus: 1 // Random status (0 or 1)
    };

    // POST create users with list
    it('POST: Should create list of users with given input array', () => {
        cy.api({
            method: 'POST',
            url: '/user/createWithList',
            body: [userData]
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // GET user details by username
    it('GET: Should user by user name', () => {
        cy.api(`GET`, `/user/${userData.username}`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.username).to.eq(userData.username);
            expect(response.body.email).to.eq(userData.email);
        });
    });

    // PUT update user details
    it('PUT: Should update user', () => {
        cy.api({
            method: 'PUT',
            url: `/user/${username}`,
            body: updatedUserData
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // GET logs user into the system
    it('GET: Should log in user', () => {
        cy.api({
            method: 'GET',
            url: '/user/login',
            qs: {
                username: updatedUserData.username,
                password: updatedUserData.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // DELETE user by username
    it('DELETE: Should delete a user', () => {
        cy.api({
            method: 'DELETE',
            url: `/user/${updatedUserData.username}`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });


    // POST create users with array
    it('POST: Should create users with an array', () => {
        cy.api({
            method: 'POST',
            url: '/user/createWithArray',
            body: [userData]
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // POST create user
    it('POST: Should create user', () => {
        cy.api({
            method: 'POST',
            url: '/user',
            body: updatedUserData
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // GET logs out current logged in user session
    it('GET: Should log out current logged in user session', () => {
        // Log in user
        cy.api({
            method: 'GET',
            url: '/user/login',
            qs: {
                username: updatedUserData.username,
                password: updatedUserData.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });

        // Log out user
        cy.api({
            method: 'GET',
            url: '/user/logout',
        }).then((response) => {
            expect(response.status).to.eq(200);
        });

    });

});