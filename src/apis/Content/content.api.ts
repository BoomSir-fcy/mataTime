import { Http } from '../http';

export class ContentApi extends Http {
  // 收藏文章
  async onFavAgree(post_id: number, tribe_id?: number) {
    const res = await this.get('/v1/fav/agree', { post_id, tribe_id });
    return res;
  }

  // 取消收藏
  async onFavCancel(post_id: number, tribe_id?: number) {
    const res = await this.get('/v1/fav/cancel', { post_id, tribe_id });
    return res;
  }

  // 收藏列表
  async getFavList() {
    const res = await this.get('/v1/fav/list');
    return res;
  }
}
