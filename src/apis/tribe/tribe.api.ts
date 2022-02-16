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

  // 部落创建帖子
  async tribePostCreate(params: Api.Tribe.PostCreatepParams) {
    return this.post('/v1/tribe/post/create', params);
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
  async getTribeTopicList(params: Api.Response<{
    data: Api.Tribe.TopicInfo[]
  }>) {
    return this.get('/v1/tribe/topic/list', params);
  }
}
