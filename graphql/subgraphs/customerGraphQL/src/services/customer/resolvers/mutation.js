const mutation = {
    addCustomer: (_, args, { dataSources: { Customer } }) => {
        const { id, name, status, href } = args.customer;
        return Customer.saveCustomer({ id, name, status, href });
    },
    deleteCustomerById: (_, id, { dataSources: { BillFormat } }) => {
        return BillFormat.deleteCustomerById({id})
      }
}

export default mutation;