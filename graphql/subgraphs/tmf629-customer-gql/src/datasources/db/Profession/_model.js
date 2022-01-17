
const MongoDataSource = require('apollo-datasource-mongo').MongoDataSource;


module.exports = class extends MongoDataSource {
  initialize(config) {
    super.initialize({
      ...config,
      debug: true
      // allowFlushingCollectionCache: true
    });
  }
  async loadProfession(professionId, ttl) {
    return this.Profession.loadOneById(professionId, { ttl });
  }

  async loadProfessions(professionsIds) {
    // await this.Profession.deleteFromCacheById({ branchSourceId: 4 });
    // await this.Profession.flushCollectionCache();
    return this.Profession.loadManyByIds(professionsIds, { ttl: 30 });
  }
  async loadProfessionsByQuery(query, ttl) {
    // await this.Profession.deleteFromCacheById({ branchSourceId: 4 });
    // await this.Profession.flushCollectionCache();
    return this.Profession.loadManyByQuery(query, { ttl });
  }
}