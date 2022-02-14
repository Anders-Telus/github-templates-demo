 const mutation = {
  addBillFormat: (_, args, { dataSources: { BillFormat } }) => {
    const { id, name, description, href } = args.billFormat;
    return BillFormat.saveBillFormat({
      id,
      name,
      description,
      href,
    });
  },
};

export default mutation;
