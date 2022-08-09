const query = {
  account: (_, { id }, { dataSources }) => {
    return dataSources.Account.loadAccount(id)
  },
  allAccounts: async (_, __, { dataSources }) => {
    const accounts = await dataSources.Account.allAccounts()
    const billCycles = await dataSources.BillCycle.allBillCycles()

    const billFormats = await dataSources.BillFormat.allBillFormats()
    let accAndBill = []
    const accountAndBillCycle = accounts.filter((account) => {
      billCycles.filter((billCycle, index) => {
        if (account.id === billCycle.id) {
          accAndBill.push((account.billCycle = billCycle))
        }

        billFormats.filter((billFormat, index) => {
          if (account.id === billFormat.id) {
            accAndBill.push((account.billFormat = billFormat))
          }
          console.log(billFormat)
        })
      })
      return accAndBill
    })

    return accountAndBillCycle
  }
}

export default query
