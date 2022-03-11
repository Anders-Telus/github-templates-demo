const mutation = {
    addAccount: (_, args, { dataSources: { Account } }) => {
        const { 
          id,
          name,
          accountType,
          description,
          href
        } = args.account;
        return Account.saveAccount({
          id,
          name,
          accountType,
          description,
          href
         });
    },
  };
  
  export default mutation;