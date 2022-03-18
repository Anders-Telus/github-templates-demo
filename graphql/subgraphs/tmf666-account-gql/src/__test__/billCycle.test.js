import EasyGraphQLTester from "easygraphql-tester";

import billCycleTypeDefs from "../services/billCycle/typeDefs/schema";

const tester = new EasyGraphQLTester(billCycleTypeDefs);

describe("Schema", () => {
  test("Should pass with allBillCycles query", () => {
    const query = `
      {
        allBillCycles {
          billingDateShift,
          billingPeriod,
          chargeDateOffset,
          creditDateOffset,
          description,
          frequency,
          href,
          id,
          mailingDateOffset,
          name,
          paymentDueDateOffset
          
        }
      }
    `;

    tester.test(true, query);
  });

  test("Should mock the errors if provided with wrong field", () => {
    const query = `
      {
        allBillCycles {
            id
            _id
            name
            notExistField
        }
      }
    `;

    const { data, errors } = tester.mock({
      query,
      mockErrors: true,
    });
    expect(errors[0].message).toEqual(
      'Cannot query field "notExistField" on type "BillCycle".'
    );
  });

  // test("should pass with getAccount query", () => {
  //   const query = `
  //     query billCycle($id: ID!) {
  //       billCycle(id: $id) {
  //         _id
  //         id
  //         name
  //       }
  //     }
  //   `;

  //   tester.test(true, query, {
  //     billCycle: "1",
  //   });
  // });

  it("Should pass if the mutation is valid", () => {
    const mutation = `
      mutation AddBillCycle($billCycle: BillCycleInput!) {
        addBillCycle(billCycle: $billCycle) {
        id
        billingDateShift
        billingPeriod
        paymentDueDateOffset
        mailingDateOffset
        name
        }
      }
    `;
    tester.test(true, mutation, {
      billCycle: {
        id: "1",
        billingDateShift: 12,
        billingPeriod: "NET 1",
        paymentDueDateOffset: 20,
        mailingDateOffset: 2,
        name: "Bond",
      },
    });
  });

  it("Should not pass if one value on the mutation input is invalid", () => {
    const mutation = `
      mutation AddBillCycle($billCycle: BillCycleInput!) {
        billCycle(billCycle: $billCycle) {
          id
          name
          status
        }
      }
    `;
    // First arg: false, there is no invalidField on the schema.
    tester.test(false, mutation, {
      billCycle: {
        id: "1",
        name: "test",
        href: "http://www.google.com",
        invalidField: true,
      },
    });
  });
});
