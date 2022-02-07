import qs from 'qs';
import { Http } from '../http';

export class HomeApi extends Http {
  // 文章列表
  async getArticleList(params: Api.Home.queryListParams) {
    const paramsStr = qs.stringify(
      {
        user_tags1: params.user_tags1,
        user_tags2: params.user_tags2,
      },
      { arrayFormat: 'repeat' },
    );
    const res: Api.Home.postData = await this.get(`/v1/post/list`, params);
    return res;
  }

  // 获取用户的tag分类列表
  async getUserTag() {
    const res = await this.get('/v1/user/tag/cat-list');
    return res;
  }

  // 获取指定用户对指定帖子的打赏统计
  async getPostRewardAuthor(post_type: string, post_id: number) {
    const res = await this.get('/v1/reward/reward-author/user-post-stat', {
      post_type,
      post_id,
    });
    return res;
  }

  // 文章列表
  async createArticle(params: Api.Home.createArticle) {
    const res = await this.post('/v1/post/create', params);
    return res;
  }

  // 文章列表
  async createV2Article(params: Api.Home.createArticle) {
    const res = await this.post('/v2/post/create', params);
    return res;
  }

  // 获取验证码
  async getVerifyCode() {
    const res = await this.get('/v1/post/get_captcha');
    return res;
  }

  // 文章详情
  async articleFindById(params: Api.Home.articleFindById) {
    const res = await this.get('/v1/post/info', params);
    return res;
  }

  // 翻译文章
  async getPostTranslateById(params: Api.Home.PostTranslateParams) {
    const paramsStr = qs.stringify(
      {
        ...params,
      },
      { arrayFormat: 'repeat' },
    );
    const res = await this.get(`/v1/post/translation?${paramsStr}`);
    return res;
  }

  // 翻译评论
  async getCommentTranslateById(params: Api.Home.PostTranslateParams) {
    const paramsStr = qs.stringify(
      {
        ...params,
      },
      { arrayFormat: 'repeat' },
    );
    const res = await this.get(`/v1/comment/translation?${paramsStr}`);
    return res;
  }

  // 热门话题
  async queryHotTopic(params: Api.Home.queryHotTopic) {
    const res = await this.get('/v1/post/hot', params);
    return res;
  }

  // 话题列表支持搜索
  async queryHotTopicList(params: Api.Home.queryHotTopicList) {
    const res = await this.get('/v1/topic/list', params);
    return res;
  }

  // 话题大类列表
  async findByHotTopicIdList(params: Api.Home.findByHotTopicIdList) {
    const res = await this.get('/v1/topic/square', params);
    return res;
  }
}
