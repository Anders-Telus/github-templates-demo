import axios from "axios";
import { setUp, dropDatabase, dropCollections } from "../__testSetup__/mongoDb";

beforeAll(async () => {
  await setUp();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});

describe('customer resolvers', () => {
  test('allCustomers', async () => {
    const response = await axios.post('http://localhost:4001/graphql', {
      query: `
        query {
          allCustomers {
            id
            name
            status
          }
        }
      `
    });
    const { data } = response;
    expect(data).toMatchObject({
      "data": {
        "allCustomers": [
          {
            "id": "1",
            "name": "John",
            "status": "Active"
          },
          {
            "id": "2",
            "name": "Bob",
            "status": "Inactive"
          }
        ]
      }
    });
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
        "customerId": "61f93a6069fc57b161d33f7c"
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
