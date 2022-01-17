import { RESTDataSource } from 'apollo-datasource-rest';

export default class PostsAPI extends RESTDataSource {
  constructor(baseURL) {
    super();
    this.baseURL = baseURL;
  }

  async getPost(id) {
    return this.get(`posts/${encodeURIComponent(id)}`);
  }
}