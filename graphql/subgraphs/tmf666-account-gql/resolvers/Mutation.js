

const Mutation = {
    createAccount(parent, args, { db }, info) {

      const inputType = args.account.type

      if (!(inputType === "partner" || inputType === "small-business")){
        return {
          __typename: "AccountRegisterInvalidInputError",
          typeErrorMessage: `Invalid account type  ${args.account.type} .`,
          message: 'Invalid Account Type'
        };
      }

      const account = {
        //id: uuid(),
        ...args.account,
      };
  
      db.accounts.push(account);

      return {
        __typename : "AccountRegisterResultSuccess",
        account : account
      };
    }
  }
  
  export { Mutation as default };