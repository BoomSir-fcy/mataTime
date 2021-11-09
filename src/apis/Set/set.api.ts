import { Http } from "../http";

export class SetApi extends Http {

  // 关注列表
  async followList() {
    const res: Api.Set.followParams = await this.get('/v1/attention/list');
    return res;
  }
  // 关注用户
  async followUser(params: Api.Set.followUserParams) {
    const res = await this.get('/v1/attention/focus', params);
    return res;
  }
  // 删除评论
  async removeContentDetail(id: number) {
    const res = await this.post('/v1/comment/del', id);
    return res;
  }
}