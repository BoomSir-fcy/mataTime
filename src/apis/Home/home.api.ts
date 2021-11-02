import { Http } from "../http";

export class HomeApi extends Http {
  // 文章列表
  async getArticleList(params:Api.Home.queryListParams) {
    const res = await this.get('/v1/post/list', params);
    return res;
  }
  // 文章列表
  async createArticle(params:Api.Home.createArticle) {
    const res = await this.post('/v1/post/create', params);
    return res;
  }
}
