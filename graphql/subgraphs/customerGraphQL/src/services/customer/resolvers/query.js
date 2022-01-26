const customerResolver = {
  Query: {
    customer: (_, { id }, { dataSources: { Customer } }) => Customer.getCustomer(id),
    allCustomers: (_, __, { dataSources: { Customer } }) => Customer.allCustomers(),
  }
}

export default customerResolver; 