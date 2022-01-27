
const billFormatResolver = {
    Query: {
        billFormat: (parent, { id } ,{ dataSources: { BillFormat } }) => BillFormat.loadBillFormat(id)
    }
}

export default billFormatResolver;