import EasyGraphQLTester from "easygraphql-tester";

import billFormatTypeDefs from "../services/billFormat/typeDefs/schema";

const tester = new EasyGraphQLTester(billFormatTypeDefs);

describe("Schema", () => {
  test("Should pass with allBillFormat query", () => {
    const query = `
      {
        allBillFormat {
            id: String!
            name: String!
            description: String
            href: String
        }
      }
    `;

    tester.test(true, query);
  });
});
