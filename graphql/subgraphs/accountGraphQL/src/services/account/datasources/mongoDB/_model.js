import { MongoDataSource } from "apollo-datasource-mongo";

export default class Account extends MongoDataSource {
  initialize(config) {
    super.initialize({
      ...config,
      debug: true,
    });
  }

  loadAccount(accountId) {
    try {
      return this.Account.loadOneById(accountId);
    } catch (error) {
      console.log(`---------> Account Load error -------------->  :: ${error}`);
      return error;
    }
  }

  saveAccount(data) {
    try {
      const account = new this.Account(data);
      return account.save();
    } catch (error) {
      console.log(
        `---------> Account save error -------------->  :: ${error}`
      );
      return error;
    }
  }

  async allAccounts() {
    try {
     const accountModel = this.Account.find({}).clone().catch(function(err){ console.log(err)});
     return accountModel;
    } catch (error) {
      console.log(`Account error :: ${error}`);
      return error;
    }
  }
}
