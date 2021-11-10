import { Http } from "../http";

export class MeApi extends Http {

  // 关注列表
  async followList() {
    const res: Api.Me.followParams = await this.get('/v1/attention/list');
    return res;
  }

  // 关注用户
  async followUser(params: Api.Me.followUserParams) {
    const res = await this.get('/v1/attention/focus', params);
    return res;
  }

  // 取消关注
  async unFollowUser(params: Api.Me.followUserParams) {
    const res = await this.get('v1/attention/cancel', params);
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
  // 点赞
  async praiseUser(post_id: number) {
    const res = await this.get('/v1/like/agree', { post_id });
    return res;
  }
  // 取消点赞
  async unPraiseUser(post_id: number) {
    const res = await this.get('/v1/like/cancel', post_id);
    return res;
  }

  // 收藏列表
  async collectList() {
    const res: Api.Me.collectParams = await this.get('/v1/fav/list');
    return res;
  }
  // 取消收藏
  async cancelCollect(post_id: number) {
    const res = await this.get('/v1/fav/cancel', { post_id });
    return res;
  }
  // 收藏文章
  async addCollect(post_id: number) {
    const res = await this.get('/v1/fav/agree', { post_id });
    return res;
  }

  // 屏蔽
  async shieldUser(pid: number) {
    const res = await this.post('/v1/post/add_shield', pid);
    return res;
  }
  // 取消屏蔽
  async unShieldUser(pid: number) {
    const res = await this.post('/v1/post/cancel_shield', pid);
    return res;
  }

  // 帖子详情
  async getContentDetail(id: number) {
    const res = await this.get('/v1/post/info', id);
    return res;
  }

  // 添加评论
  async addContentDetail(params: Api.Me.addContentDetail) {
    const res = await this.post('v1/comment/create', params);
    return res;
  }

  // 删除评论
  async removeContentDetail(id: number) {
    const res = await this.post('/v1/comment/del', id);
    return res;
  }
}