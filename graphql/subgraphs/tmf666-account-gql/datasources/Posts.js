import { RESTDataSource } from 'apollo-datasource-rest';

export default class PostsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getPost(id) {
    return this.get(`posts/${encodeURIComponent(id)}`);
  }
}