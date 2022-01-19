const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')
const schemaCode = fs.readFileSync(
  path.join("../supergraph.graphql"),
  "utf8"
);

const tester = new EasyGraphQLTester(schemaCode)
describe("Test Schema, Queries and Mutation", () => {
  let tester;
  beforeEach(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });
it("Should pass with a valid query for jobs", () => {    
      const query = `
      {
       jobs {
            profession {
              name
            }
          }
          allCustomers {
            name
          }
          allAccounts {
            id
            name
            status
            type
          }
   
        
      }
        
      `;
      // First arg: true because the query is valid
      // Second arg: query to test
      tester.test(true, query);
    });
});