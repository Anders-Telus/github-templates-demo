import { RESTDataSource } from 'apollo-datasource-rest';

export default class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getUser(id) {
    return this.get(`users/${encodeURIComponent(id)}`);
  }
}