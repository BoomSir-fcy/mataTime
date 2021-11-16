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
  // 文章详情
  async articleFindById(params:Api.Home.articleFindById) {
    const res = await this.get('/v1/post/info', params);
    return res;
  }
  // 热门话题
  async queryHotTopic (params:Api.Home.queryHotTopic) {
    const res = await this.get('/v1/post/hot', params);
    return res;
  }
  // 话题列表支持搜索
  async queryHotTopicList (params:Api.Home.queryHotTopicList) {
    const res = await this.get('/v1/topic/list', params);
    return res;
  }
  // 话题大类列表
  async findByHotTopicIdList (params:Api.Home.findByHotTopicIdList) {
    const res = await this.get('/v1/topic/square', params);
    return res;
  }
}
