


const Query = {
    allAccounts(parent, args, { db }, info) {
        return db.accounts;
    },
    account(parent, args, { db }, info) {
      const accountRecord = db.accounts.find(c => c.id == args.id);
      if (accountRecord) {
        return {
          __typename: "Account",
          ...accountRecord,
        };
      }
      return {
        __typename: "AccountNotFoundError",
        detailMessage: `The Account with the id ${args.id} does not exist.`,
        message: 'Account Not Found'
      };
    },
    restUser(parent, args, { dataSources }) {
      return dataSources.usersAPI.getUser(args.id);
    },
  };
  
  export { Query as default };