import { Http } from "../http";

export class MeApi extends Http {

  // 关注列表
  async followList() {
    const res: Api.Me.followParams = await this.get('/v1/attention/list');
    return res;
  }

  // 粉丝列表
  async fansList() {
    const res: Api.Me.fansParams = await this.get('/v1/attention/fans_list');
    return res;
  }

  // 点赞列表
  async praiseList() {
    const res: Api.Me.praiseParams = await this.get('/v1/like/list');
    return res;
  }

  // 收藏列表
  async collectList() {
    const res: Api.Me.collectParams = await this.get('/v1/fav/list');
    return res;
  }
}