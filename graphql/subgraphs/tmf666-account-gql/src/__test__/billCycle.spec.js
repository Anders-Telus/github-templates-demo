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

describe("billcycle resolvers", () => {
  test("allBillCycle", async () => {
    const response = await axios.post("http://localhost:4005/graphql", {
      query: `
        query {
          allBillcycles {
            billingDateShift: Int
            billingPeriod: String
            chargeDateOffset: Int
            creditDateOffset: Int
            description: String
            frequency: String
            href: String
            id: String
            mailingDateOffset: Int
            name: String
            paymentDueDateOffset: Int
            validFor: ValidFor
          }
        }
      `,
    });
    const { data } = response;
    expect(data).toMatchObject({
      data: {
        allBillCycles: [
          {
            id: "1",
            billingDateShift: 12,
            billingPeriod: "NET 1",
            paymentDueDateOffset: 20,
            mailingDateOffset: 2,
            name: "Bond",
            chargeDateOffset: 15,
            creditDateOffset: 10,
            description: "testing",
            frequency: "N/A",
            href: "www.test.com",
            validFor: {
              endDateTime: "2020-12-31",
              startDateTime: "2020-12-31",
            },
          },
          {
            id: "2",
            billingDateShift: 12,
            billingPeriod: "NET 2",
            paymentDueDateOffset: 20,
            mailingDateOffset: 2,
            name: "Bond",
            chargeDateOffset: 15,
            creditDateOffset: 10,
            description: "testing",
            frequency: "N/A",
            href: "www.test.com",
            validFor: {
              endDateTime: 0,
              startDateTime: 0,
            },
          },
          {
            id: "3",
            billingDateShift: 12,
            billingPeriod: "NET 3",
            paymentDueDateOffset: 20,
            mailingDateOffset: 2,
            name: "Bond",
            chargeDateOffset: 15,
            creditDateOffset: 10,
            description: "testing",
            frequency: "N/A",
            href: "www.test.com",
            validFor: {
              endDateTime: "2022-12-17T22:00:36.136+08:00",
              startDateTime: "2022-12-17T22:00:36.136+08:00",
            },
          },
        ],
      },
    });
  });

  test("billCycle", async () => {
    const response = await axios.post("http://localhost:4001/graphql", {
      query: `
        query($id: ID!) {
          billCycle(id: $id) {
            id
            name
            
          }
        }
      `,
      variables: {
        id: "61f93a6069fc57b161d33f7c",
      },
    });
    const { data } = response;
    expect(data).toMatchObject({
      data: {
        customer: {
          id: "1",
          name: "John",
          status: "Active",
        },
      },
    });
  });
});
