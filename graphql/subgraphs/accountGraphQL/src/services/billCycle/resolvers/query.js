const query = {
        billCycle: (parent, { id } ,{ dataSources: { BillCycle } }) => BillCycle.loadBillCycle(id),
        allBillCycles: (_, __, { dataSources: { BillCycle } }) => BillCycle.allBillCycles(),
    };


export default query;