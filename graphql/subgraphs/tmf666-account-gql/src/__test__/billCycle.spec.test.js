import axios from "axios"
import { setUp, dropDatabase, dropCollections } from "../__testSetup__/mongoDb"

beforeAll(async () => {
  await setUp()
})

afterEach(async () => {
  await dropCollections()
})

afterAll(async () => {
  await dropDatabase()
})

describe("billcycle resolvers", () => {
  test("allBillCycle", async () => {
    const response = await axios.post("http://localhost:4000/graphql", {
      query: `
      query AllBillCycles {
        allBillCycles {
          billingDateShift
          billingPeriod
          chargeDateOffset
          creditDateOffset
          description
          frequency
          href
          id
          name
          paymentDueDateOffset
          mailingDateOffset
        }
      }
      `
    })
    const { data } = response
    expect(data).toMatchObject({
      data: {
        allBillCycles: [
          {
            billingDateShift: 12,
            billingPeriod: "NET 1",
            chargeDateOffset: 15,
            creditDateOffset: 10,
            description: "testing",
            frequency: "N/A",
            href: "www.test.com",
            id: "1",
            name: "Bond",
            paymentDueDateOffset: 20,
            mailingDateOffset: 2
          },
          {
            billingDateShift: 12,
            billingPeriod: "NET 2",
            chargeDateOffset: 15,
            creditDateOffset: 10,
            description: "testing",
            frequency: "N/A",
            href: "www.test.com",
            id: "2",
            name: "Anders",
            paymentDueDateOffset: 20,
            mailingDateOffset: 2
          },
          {
            billingDateShift: 12,
            billingPeriod: "NET 3",
            chargeDateOffset: 15,
            creditDateOffset: 10,
            description: "testing",
            frequency: "N/A",
            href: "www.test.com",
            id: "3",
            name: "Bond",
            paymentDueDateOffset: 20,
            mailingDateOffset: 2
          }
        ]
      }
    })
  })

})
