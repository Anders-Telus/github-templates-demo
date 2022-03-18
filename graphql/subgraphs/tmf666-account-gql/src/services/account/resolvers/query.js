const query = {
    account: (_, { id } , {dataSources: { Account} } ) => Account.loadAccount(id),
    allAccounts:  (_, __, { dataSources: { Account } }) => Account.allAccounts(),
};

export default query;