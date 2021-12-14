import { Http } from '../http';

export class MeApi extends Http {
  // 关注列表
  async followList(page?: number, perpage?: number) {
    const res = await this.get('/v1/attention/list', { page, perpage });
    return res;
  }
  // 关注用户
  async followUser(focus_uid: number) {
    const res = await this.get('/v1/attention/focus', { focus_uid });
    return res;
  }
  // 取消关注
  async unFollowUser(focus_uid: number | string) {
    const res = await this.get('/v1/attention/cancel', { focus_uid });
    return res;
  }

  // 粉丝列表
  async fansList(page?: number, perpage?: number) {
    const res = await this.get('/v1/attention/fans_list', { page, perpage });
    return res;
  }

  // 点赞列表
  async praiseList(page: number) {
    const res = await this.get('/v1/like/list', { page });
    return res;
  }
  // 点赞
  async praiseUser(post_id: number) {
    const res = await this.get('/v1/like/agree', { post_id });
    return res;
  }
  // 取消点赞
  async unPraiseUser(post_id: number) {
    const res = await this.get('/v1/like/cancel', { post_id });
    return res;
  }

  // 收藏列表
  async collectList(page: number) {
    const res = await this.get('/v1/fav/list', { page });
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
    const res = await this.post('/v1/comment/del', { id: id });
    return res;
  }

  // 举报评论
  async reportComment(comment_id: number, content: string) {
    const res = await this.post('/v1/comment/add_complain', {
      comment_id,
      content
    });
    return res;
  }

  // 个人(他人)主页
  async getProfile(uid?: number) {
    const res = await this.get('/v1/user/home_header', { uid });
    return res;
  }

  // 个人(他人)主页
  async getProfileMsg({ page, perpage, uid }: {
    page: number, perpage: number, uid?: number
  }) {
    const res = await this.get('/v1/user/home_msg', { page, perpage, uid });
    return res;
  }

  async reportUser(uid: number, reason: string) {
    const res = await this.post('/v1/user/report_user', {
      to_uid: uid,
      reason
    });
    return res;
  }
}
