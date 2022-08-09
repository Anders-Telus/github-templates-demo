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

describe("account resolvers", () => {
  test("allAccounts", async () => {
    const response = await axios.post("http://localhost:4000/graphql", {
      query: `
        query {
          allAccounts {
            id
            name
            accountType
            description
            href
          }
        }
      `,
    });
    const { data } = response;
    expect(data).toMatchObject({
      data: {
        "allAccounts": [
          {
            "id": "1",
            "name": "WirelessBillAccount",
            "accountType": "Wireless",
            "description": "WirelessTesting",
            "href": ""
          },
          {
            "id": "2",
            "name": "InternetBillAccount",
            "accountType": "Internet",
            "description": "InternetTesting",
            "href": ""
          }
        ]
      },
    });
  });

});
