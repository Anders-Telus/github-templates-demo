/// we import a function that we wrote to create a new instance of Apollo Server
import { createApolloServer, serverInfo } from "./router"

// we will use supertest to test our server
import request from "supertest"

// this is the query we use for our test
const queryAllAccounts = {
  query: `query AllAccounts {
    allAccounts {
      name
    }
  }`
}

const queryAllBillCycles = {
  query: `query AllBillCycles {
  allBillCycles {
    name
  }
}`
}

const queryAllBillFormats = {
  query: `query AllBillFormats {
  allBillFormats {
    name
  }
}`
}

describe("e2e for router", () => {
  let server, url

  // before the tests we will spin up a new Apollo Server
  beforeAll(async () => {
    // Note we must wrap our object destructuring in parentheses because we already declared these variables
    // We pass in the port as 0 to let the server pick its own ephemeral port for testing

    ;({ server, url } = await createApolloServer({ port: 0 }))
  })

  // after the tests we will stop our server
  afterAll(async () => {
    await server?.close()
  })

  it("All accounts", async () => {
    // send our request to the url of the test server
    const allAccounts = [{ name: "WirelessBillAccount" }, { name: "InternetBillAccount" }]
    const response = await request("http://localhost:4000/").post("/").send(queryAllAccounts)
    expect(response.errors).toBeUndefined()
    expect(response.body.data.allAccounts).toStrictEqual(allAccounts)
  })

  it("All BillCycles", async () => {
    // send our request to the url of the test server
    const allBillCycles = [
      {
        name: "Bond"
      },
      {
        name: "Anders"
      },
      {
        name: "Bond"
      }
    ]
    const response = await request("http://localhost:4000/").post("/").send(queryAllBillCycles)
    expect(response.errors).toBeUndefined()
    console.log(response)
    expect(response.body.data?.allBillCycles).toStrictEqual(allBillCycles)
  })

  it("All BillFormats", async () => {
    // send our request to the url of the test server
    const allBillFormats = [
      {
        name: "IT"
      },
      {
        name: "Digital"
      },
      {
        name: "Wireless"
      },
      {
        name: "Health"
      }
    ]
    const response = await request("http://localhost:4000/").post("/").send(queryAllBillFormats)
    expect(response.errors).toBeUndefined()
    console.log(response)
    expect(response.body.data?.allBillCycles).toStrictEqual(allBillFormats)
  })
})
