import { UserInputError } from "apollo-server"
 const mutation = {
  addBillFormat: (_, args, { dataSources: { BillFormat } }) => {
    const { id, name, description, href } = args.billFormat;
    if (args.id < 1) {
      throw new UserInputError('We need an ID');
    }
    if (!name.length) throw new Error('Name not found');
    if (!description.length) throw new Error('Description not found');
    if (!href.length) throw new Error('Href not found');
    return BillFormat.saveBillFormat({
      id,
      name,
      description,
      href,
    });
  },
  deleteBillFormatbyId: (_, id, { dataSources: { BillFormat } }) => {
    return BillFormat.deleteBillFormatbyId({id})
  },
};

export default mutation;
