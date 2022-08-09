import { UserInputError } from "apollo-server"

const mutation = {
    addAccount: (_, args, { dataSources: { Account } }) => {
        const { id,name,accountType,description,href } = args.account;
        if (args.id < 1) {
          throw new UserInputError('We need an ID');
        }
        if (!name.length) throw new Error('Name not found');
        if (!accountType.length) throw new Error('Account not found');
        if (!description.length) throw new Error('Description not found');
        if (!href.length) throw new Error('Href not found');

        return Account.saveAccount({ id,name,accountType,description,href});
    },
    deleteAccountById: (_, id, { dataSources: { Account } }) => {
      return Account.deleteAccountById({id})
    },
  };
  
  export default mutation;