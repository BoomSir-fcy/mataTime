import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';
import { Http } from '../http';

interface SearchPostParams {
  limit?: number;
  start?: number;
  key: string;
}
export class SearchApi extends Http {
  // 搜索所有
  async getSearchTotal(key: string) {
    const res = await this.get('/v1/search/total', { key });
    return res;
  }

  // 搜索文章
  async getSearchPost({ limit, start, key }: SearchPostParams) {
    const res = await this.get('/v1/search/post', { key, limit, start });
    return res;
  }

  async getSearchV2Post({ limit, start, key }: SearchPostParams) {
    const res = await this.get('/v2/search/post', { key, limit, start });
    return res;
  }
}
