import { faker } from '@faker-js/faker';

export function generateCustomerData() {

  const randomNumber = faker.string.numeric(2);
  const usernameBase = faker.internet.username();
  const username = `${usernameBase}${randomNumber}`;
  
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    addressStreet: faker.location.streetAddress(),
    addressCity: faker.location.city(),
    addressState: faker.location.state(),
    addressZipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    ssn: faker.string.numeric(9),
    username: username,
    password: 'passw0rd',
  };
}

export function generateUserData() {
  const dob = faker.date.birthdate({ min: 18, max: 80, mode: 'age' });
  const varFirstName = faker.person.firstName();
  const varMiddleName = faker.person.middleName();
  const varLastName = faker.person.lastName();

  return {
    title: faker.helpers.arrayElement(['Mr.', 'Mrs.']), // Randomly assigns either "Mr." or "Mrs."
    name: `${varFirstName} ${varMiddleName} ${varLastName}`,
    email: `${varFirstName}.${varLastName}${faker.number.int({ min: 0, max: 100})}@mail.com`,
    password: 'passw0rd',
    dateOfBirth: {
      day: dob.getDate().toString(),
      month: dob.toLocaleString('default', { month: 'numeric' }),
      year: dob.getFullYear().toString()
    },
    address: faker.location.streetAddress(),
    address2: `${faker.location.city()}, ${faker.location.country()}`,
    newsLetter: faker.datatype.boolean().toString(),
    specialOffers: faker.datatype.boolean().toString(),
    firstName: varFirstName,
    lastName: varLastName,
    company: faker.company.name(),
    country: faker.helpers.arrayElement([
      'India',
      'United States',
      'Canada',
      'Australia',
      'Israel',
      'New Zealand',
      'Singapore'
    ]),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(9),
    cardNumber: faker.finance.creditCardNumber(),
    cvc: faker.finance.creditCardCVV(),
    cardExpiry: {
      month: faker.number.int({ min: 1, max: 12}),
      year: faker.number.int({ min: 2030, max: 2050})
    }
  };
}