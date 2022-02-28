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
  async tribePostList(params: Api.Tribe.tribePostListParams) {
    const res = await this.get('/v1/tribe/post/list', params);
    return res;
  }
  // 部落帖子详情
  async getTribePostInfo(params: Api.Tribe.tribePostInfoParams) {
    const res = await this.get('/v1/tribe/post/info', params);
    return res;
  }

  // 我的部落列表
  async MyTribeList(params?: Api.Tribe.MyTribeListParams) {
    const res = await this.get('/v1/tribe/create/info', params);
    return res;
  }
  // 我加入的部落列表
  async MyJoinedTribeList(params?: Api.Tribe.MyJoinedTribeListParams) {
    const res = await this.get('/v1/tribe/user/nft', params);
    return res;
  }

  // 部落创建帖子
  async tribePostCreate(params: Api.Tribe.PostCreatepParams) {
    return this.post('/v1/tribe/post/create', params);
  }

  // 根据部落名搜索部落
  async tribeSearchByName(params: Api.Tribe.TopicSearchByNameParams) {
    return this.get('/v1/tribe/search', params);
  }

  // 部落添加话题
  async tribeTopicCreate(params: Api.Tribe.TopicCreateParams) {
    return this.post('/v1/tribe/topic/create', params);
  }

  // 部落删除话题
  async tribeTopicDel(params: Api.Tribe.TopicDelParams) {
    return this.post('/v1/tribe/topic/del', params);
  }

  // 部落获取话题
  async getTribeTopicList(params: Api.Tribe.TopicParamsForId): Promise<Api.Response<Api.Tribe.TopicInfo[]>> {
    return this.get('/v1/tribe/topic/list', params);
  }

  // 部落帖子保存草稿
  async tribePostCreateDraft(params: Api.Tribe.PostCreatepParams) {
    return this.post('/v1/tribe/post/create_draft', params);
  }

  async getTribePostDraft(params: Api.Tribe.TopicParamsForId): Promise<Api.Response<Api.Tribe.PostDraftInfo>> {
    return this.post('v1/tribe/post/get_draft', params);
  }

}
