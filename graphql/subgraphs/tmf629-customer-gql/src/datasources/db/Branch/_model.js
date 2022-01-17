const MongoDataSource = require('apollo-datasource-mongo').MongoDataSource;

module.exports = class extends MongoDataSource {
  initialize(config) {
    super.initialize({
      ...config,
      debug: true,
    });
  }
  loadBranch(branchId) {
    try {
      return this.Branch.loadOneById(branchId);
    } catch (error) {
        
        console.log(`---------> error -------------->  :: ${error}`);
        return error;
    }
  }

  loadBranches(branchesIds) {
    return this.Branch.loadManyByIds(branchesIds);
  }
  getAll() {
    try {
      return this.Branch.find({});
    } catch (error) {
        console.log(`error :: ${error}`);
        return error;
    }
  }
}