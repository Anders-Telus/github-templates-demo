import EasyGraphQLTester from 'easygraphql-tester';

import customerTypeDefs from './../services/customer/typeDefs/schema';

const tester = new EasyGraphQLTester(customerTypeDefs);

describe('Schema', () => {
  test("Should pass with allCustomer query", () => {
    const query = `
      {
        allCustomers {
            id
            _id
            name
        }
      }
    `;

    tester.test(true, query);
  });

  test("Should mock the errors if provided with wrong field", () => {
    const query = `
      {
        allCustomers {
            id
            _id
            name
            notExistField
        }
      }
    `;

    const { data, errors } = tester.mock({
      query,
      mockErrors: true
    });
    expect(errors[0].message).toEqual(
      'Cannot query field "notExistField" on type "Customer".'
    );
  });

  test("should pass with getCustomer query", () => {
    const query = `
      query getCustomer($customerId: ID!) {
        customer(id: $customerId) {
          _id
          id
          name
        }
      }
    `;

    tester.test(true, query, {
      customerId: "1"
    });
  });

  it('Should pass if the mutation is valid', () => {
    const mutation = `
      mutation AddCustomer($customer: CustomerInput!) {
        addCustomer(customer: $customer) {
          id
          name
          status
        }
      }
    `;
    tester.test(true, mutation, {
      customer: {
        id: "1",
        name: 'test',
        href: 'http://www.google.com',
        status: 'active'
      }
    })
  })

  it('Should not pass if one value on the mutation input is invalid', () => {
    const mutation = `
      mutation AddCustomer($customer: CustomerInput!) {
        addCustomer(customer: $customer) {
          id
          name
          status
        }
      }
    `;
    // First arg: false, there is no invalidField on the schema.
    tester.test(false, mutation, {
      customer: {
        id: "1",
        name: 'test',
        href: 'http://www.google.com',
        invalidField: true
      },
    })
  })
});
