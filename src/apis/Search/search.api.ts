import { Http } from "../http";

export class SearchApi extends Http {
  // 搜索所有
  async getSearchTotal(key: string) {
    const res = await this.get('/v1/search/total', { key });
    return res;
  }

  // 搜索文章
  async getSearchPost(key: string) {
    const res = await this.get('/v1/search/post', { key });
    return res;
  }

}
