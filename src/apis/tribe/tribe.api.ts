import { Http } from '../http';

export class TribeApi extends Http {
  // 部落列表
  async tribeList(params: Api.Tribe.tribeListParams) {
    const res = await this.get('/v1/tribe/list', params);
    return res;
  }
  // 部落详情
  async tribeInfo(params: Api.Tribe.tribeInfoParams) {
    const res = await this.get('/v1/tribe/info', params);
    return res;
  }
  // 部落详情 包含nft, 费用
  async tribeDetail(params: Api.Tribe.tribeInfoParams) {
    const res = await this.get('/v1/tribe/detail', params);
    return res;
  }
  // 部落帖子列表
  async tribePostList(params: Api.Tribe.tribeInfoParams) {
    const res = await this.get('/v1/tribe/post/list', params);
    return res;
  }
  // 部落帖子详情
  async tribePostInfo(params: Api.Tribe.tribePostInfoParams) {
    const res = await this.get('/v1/tribe/post/info', params);
    return res;
  }
}
