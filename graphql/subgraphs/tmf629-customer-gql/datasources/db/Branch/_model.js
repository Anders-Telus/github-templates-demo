const MongoDataSource = require('apollo-datasource-mongo').MongoDataSource;

module.exports = class extends MongoDataSource {
  initialize(config) {
    super.initialize({
      ...config,
      debug: true,
    });
  }
  loadBranch(branchId) {
    return this.Branch.loadOneById(branchId);
  }

  loadBranches(branchesIds) {
    return this.Branch.loadManyByIds(branchesIds);
  }
  getAll() {
    return this.Branch.find({});
  }
}