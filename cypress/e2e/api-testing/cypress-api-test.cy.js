import { base } from "@faker-js/faker";

describe('API Functionality Test Suite', () => {

    const baseUrl = 'http://localhost:3000/api/users';

    const userData = {
        name: "John Godwynne Roblox",
        email: "johnhensonvertere@gmail.com",
        password: "ilovejk"
    };

    const updatedUserData = {
        name: "John Henson Roblox",
        email: "johngodwynnevertere@gmail.com",
        password: "ilovejk123"
    };

    let userId; // for verifying user id in other methods
    let bearer_token; // for holding bearer_token

    // POST Create a user - 201 Created
    it('Should successfully register a user via POST - 201 Created', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/register`,
            body: userData
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(201);

            // Assert response message
            expect(response.body.message).to.eq('User registered');

            // Assert response body
            expect(response.body.user.name).to.eq(userData.name);
            expect(response.body.user.email).to.eq(userData.email);

            // Store user id into variable
            userId = response.body.user.id;
        });
    });

    // POST Create a user - 400 Enter incomplete fields
    it('Should successfully register a user via POST - 400 All fields required', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/register`,
            failOnStatusCode: false,
            body: {
                name: userData.name,
                // don't enter email
                password: userData.password
            }
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(400);

            // Assert response message
            expect(response.body.message).to.eq('All fields required');
        });
    });

    // POST Create a user - 400 Create user with existing email
    it('Should successfully register a user via POST - 400 Email already exists', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/register`,
            failOnStatusCode: false,
            body: userData
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(400);

            // Assert response message
            expect(response.body.message).to.eq('Email already exists');
        });
    });

    // POST Login a user - 200 OK
    it('Should login a user via POST - 200 OK', () => {
            cy.api({
            method: 'POST',
            url: `${baseUrl}/login`,
            body: {
                email: userData.email,
                password: userData.password
            }
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(200);

            // Assert body = check if there's a token key
            expect(response.body).to.have.key('token');

            // Save token to variable
            bearer_token = response.body.token;
        });
    });

    // POST Login a user - 400 Enter a nonregistered email
    it('Should login a user via POST - 400 User not found', () => {
        cy.api({
        method: 'POST',
        url: `${baseUrl}/login`,
        failOnStatusCode: false,
        body: {
            email: 'nonexistingmail@gmail.com',
            password: userData.password
        }
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(400);

            // Assert response message
            expect(response.body.message).to.eq('User not found');
        });
    });

    // POST Login a user - 400 Enter incorrect password
    it('Should login a user via POST - 401 Invalid password', () => {
        cy.api({
        method: 'POST',
        url: `${baseUrl}/login`,
        failOnStatusCode: false,
        body: {
            email: userData.email,
            password: 'wrong password henson jk godwynne'
        }
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(401);

            // Assert response message
            expect(response.body.message).to.eq('Invalid password');
        });
    });

    // GET Gets all users - 200 OK
    it('Should get all users via GET - 200 OK', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}/`,
            headers: {
                Authorization: `Bearer ${bearer_token}`,

            }
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(200);
        });
    });

    // GETS Gets user by ID - 200 OK
    it('Should get user based on ID via GET - 200 OK', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}/${userId}`,
            headers: {
                Authorization: `Bearer ${bearer_token}`
            }
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(200);

            // Assert response body
            expect(response.body.name).to.eq(userData.name);
            expect(response.body.email).to.eq(userData.email);
            expect(response.body.id).to.eq(userId);
        });
    });

    // GET Gets user by ID - 404 Get nonexisting user
    it('Should get user based on ID via GET - 404 User not found', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}/2`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${bearer_token}`
            }
        }).then((response) => {
            // Assert status message
            expect(response.status).to.eq(404);

            // Assert response message
            expect(response.body.message).to.eq('User not found');
        });
    });

    // PUT Update user by ID - 200 OK
    it('Should update user based on ID via PUT - 200 OK', () => {
        cy.api({
            method: 'PUT',
            url: `${baseUrl}/1`,
            headers: {
                Authorization: `Bearer ${bearer_token}`
            },
            body: updatedUserData
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(200);

            // Assert response body
            expect(response.body.user.id).to.eq(userId);
            expect(response.body.user.name).to.eq(updatedUserData.name);
            expect(response.body.user.email).to.eq(updatedUserData.email);

            // Assert response message
            expect(response.body.message).to.eq('User updated');
        });
    });

    // PUT Update user by ID - 400 Enter an empty field
    it('Should update user based on ID via PUT - 400 Bad Request', () => {
        cy.api({
            method: 'PUT',
            url: `${baseUrl}/${userId}`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${bearer_token}`
            },
            body: {
                name: updatedUserData.name,
                // don't enter email
                password: updatedUserData.password
            }
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(400);

            // Assert response message
            expect(response.body.message).to.eq('All fields required');
        });
    });

    // PUT Update user by ID - 404 Enter a nonexisting user
    it('Should update user based on ID via PUT - 400 Bad Request', () => {
        cy.api({
            method: 'PUT',
            url: `${baseUrl}/2`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${bearer_token}`
            },
            body: updatedUserData
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(404);

            // Assert response message
            expect(response.body.message).to.eq('User not found');
        });
    });

    // PATCH Partially update user by ID - 200 OK
    it('Should partially update user based on ID via PATCH - 200 OK', () => {
       
        cy.api({
            method: 'PATCH',
            url: `${baseUrl}/${userId}`,
            headers: {
                Authorization: `Bearer ${bearer_token}`
            },
            body: {
                name: userData.name
            }
        }).then((response) => {
            // Assert response status
            expect(response.status).to.eq(200);

            // Assert response message
            expect(response.body.message).to.eq('Successfully updated the name');

            // Assert response body
            expect(response.body.user.id).to.eq(userId);
            expect(response.body.user.name).to.eq(userData.name);
            expect(response.body.user.email).to.eq(updatedUserData.email);
        });
    });

    // DELETE Delete a user - 200 OK
    it('Should successfully delete a user via DELETE - 200 OK', () => {
        cy.api({
            method: 'DELETE',
            url: `${baseUrl}/${userId}`,
            headers: {
                Authorization: `Bearer ${bearer_token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('User deleted');
        });
    });

    // DELETE Delete a user - 404 Delete a nonexisting user
    it('Should successfully delete a user via DELETE - 404 User not found', () => {
        cy.api({
            method: 'DELETE',
            url: `${baseUrl}/${userId}`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${bearer_token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq('User not found');
        });
    });
});