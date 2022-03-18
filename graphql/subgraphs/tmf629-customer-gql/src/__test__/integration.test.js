import axios from "axios";

describe('customer resolvers', () => {

  test('add customer', async () => {
    const response = await axios.post('http://localhost:4001/graphql', {
      query: `
        mutation AddCustomer($customer: CustomerInput!) {
          addCustomer(customer: $customer) {
            id
            name
            status
            href
          }
        }
      `,
      variables: {
        "customer": {
          "href": "http://www.google.com",
          "id": "7",
          "name": "test",
          "status": "active",
        }
      }
    });
    const { data } = response;
    expect(data).toMatchObject({
      "data": {
        "addCustomer": {
          "id": "7",
          "name": "test",
          "status": "active",
          "href": "http://www.google.com"
        }
      }
    });
  })

  let customers;
  test('allCustomers', async () => {
    const response = await axios.post('http://localhost:4001/graphql', {
      query: `
        query {
          allCustomers {
            _id
            id
            name
            status
          }
        }
      `
    });
    const { data } = response;
    customers = data.data.allCustomers;
    expect(customers.length).toEqual(3);
  });

  test('customer', async () => {
    const response = await axios.post('http://localhost:4001/graphql', {
      query: `
        query($customerId: ID!) {
          customer(id: $customerId) {
            id
            name
            status
          }
        }
      `,
      variables: {
        "customerId": customers[0]._id
      }
    });
    const { data } = response;
    expect(data).toMatchObject({
      "data": {
        "customer": {
          "id": "1",
          "name": "John",
          "status": "Active"
        }
      }
    });
  });
});
