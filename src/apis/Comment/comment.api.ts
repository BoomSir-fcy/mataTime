import { Http } from "../http";

export class CommentApi extends Http {
  // 评论列表
  async getCommentList(params:Api.Comment.queryList) {
    const res = await this.get('/v1/post/list', params);
    return res;
  }
  // 文章点赞
  async clickLike(params:Api.Comment.likeParams) {
    const res = await this.get('/v1/like/agree', params);
    return res;
  }
  // 文章取消点赞
  async cancelLike(params:Api.Comment.likeParams) {
    const res = await this.get('/v1/like/cancel', params);
    return res;
  }
}
