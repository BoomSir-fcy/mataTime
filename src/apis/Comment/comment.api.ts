import { Http } from '../http';

export class CommentApi extends Http {
  // 评论列表
  async getCommentList(params: Api.Comment.queryList) {
    const res = await this.get('/v1/comment/list', params);
    return res;
  }

  // 新版本评论列表
  async getV2CommentList(params: Api.Comment.queryList) {
    const res = await this.get('/v2/comment/list', params);
    return res;
  }

  // 二级评论列表
  async getSubCommentList(params: Api.Comment.queryList) {
    const res = await this.get('/v1/subcomment/list', params);
    return res;
  }

  // 文章点赞
  async clickLike(params: Api.Comment.likeParams) {
    const res = await this.get('/v1/like/agree', params);
    return res;
  }
  // 文章取消点赞
  async cancelLike(params: Api.Comment.likeParams) {
    const res = await this.get('/v1/like/cancel', params);
    return res;
  }
  // 发表评论和回复评论
  async createComment(params: Api.Comment.createComment) {
    const res = await this.post('/v1/comment/create', params);
    return res;
  }
  // 对评论点赞
  async commentLike(params: Api.Comment.commentLike) {
    const res = await this.post('/v1/comment/like_plus_one', params);
    return res;
  }
  // 对评论取消点赞
  async commentCancelLike(params: Api.Comment.commentLike) {
    const res = await this.post('/v1/comment/like_sub_one', params);
    return res;
  }
}
