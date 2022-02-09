const query = {
  billFormat: (parent, { id }, { dataSources: { BillFormat } }) =>
    BillFormat.loadBillFormat(id),
  allBillFormats: (_, __, { dataSources: { BillFormat } }) =>
    BillFormat.allBillFormats(),
};

export default query;
