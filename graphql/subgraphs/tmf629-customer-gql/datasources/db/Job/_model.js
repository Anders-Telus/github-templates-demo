
const MongoDataSource = require('apollo-datasource-mongo').MongoDataSource;

module.exports = class extends MongoDataSource {
  initialize(config) {
    super.initialize({
      ...config,
      debug: true,
    });
  }
  getAll(limit) {
    return limit ? this.Job.find({}).limit(limit) : this.Job.find({});
  }
}