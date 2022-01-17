import { RESTDataSource } from 'apollo-datasource-rest';

export default class UsersAPI extends RESTDataSource {
  constructor(baseURL) {
    super();
    this.baseURL = baseURL;
  }

  async getUser(id) {
    return this.get(`users/${encodeURIComponent(id)}`);
  }
}