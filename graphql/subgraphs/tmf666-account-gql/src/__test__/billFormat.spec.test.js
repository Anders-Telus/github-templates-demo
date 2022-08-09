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

describe("billformat resolvers", () => {
  test("allBillformats", async () => {
    const response = await axios.post("http://localhost:4000/graphql", {
      query: `
      query AllBillFormats {
        allBillFormats {
          id
          name
          description
          href
        }
        }
      `
    })
    const { data } = response
    expect(data).toMatchObject({
      data: {
        allBillFormats: [
          {
            id: "1",
            name: "IT",
            description: "IT Billing Format",
            href: ""
          },
          {
            id: "2",
            name: "Digital",
            description: "Digital Billing Format",
            href: ""
          },
          {
            id: "3",
            name: "Wireless",
            description: "Wireless Billing Format",
            href: ""
          },
          {
            id: "3",
            name: "Health",
            description: "Health Billing Format",
            href: ""
          }
        ]
      }
    })
  })
  ;``
})
