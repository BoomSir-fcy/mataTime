import { Http } from "../http";

export class HomeApi extends Http {
  // 文章列表
  async getArticleList() {
    const res = await this.get('/v1/token');
    return res;
  }
  // 文章列表
  async createArticle(params:Api.Home.createArticle) {
    const res = await this.post('/v1/post/create', params);
    return res;
  }
}
