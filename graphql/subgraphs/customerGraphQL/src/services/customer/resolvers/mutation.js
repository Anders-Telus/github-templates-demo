const mutation = {
    addCustomer: (_, args, { dataSources: { Customer } }) => {
        const { id, name, status, href } = args.customer;
        return Customer.saveCustomer({ id, name, status, href });
    }
}

export default mutation;