import BillCycle from "../datasources/mongoDB/_model"

const query = {
  billCycle: (parent, { id }, { dataSources: { BillCycle } }) => BillCycle.loadBillCycle(id),
  allBillCycles: (_, __, { dataSources: { BillCycle } }) => BillCycle.allBillCycles(),
  __resolveReference: (reference) => {
    return BillCycle.find((u) => u.id == reference.id)
  }
}

export default query
