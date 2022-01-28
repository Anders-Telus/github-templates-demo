const billCycleResolver = {
    Query: {
        billCycle: (parent, { id } ,{ dataSources: { BillCycle } }) => BillCycle.loadBillCycle(id)
    }
}

export default billCycleResolver;