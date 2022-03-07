import { Http } from '../http';

export class TribeApi extends Http {
  // 部落搜索帖子列表
  async tribeSearchPostList(params: Api.Tribe.tribeSearchParams) {
    const res = await this.get('/v1/tribe/search/post', params);
    return res;
  }
  // 部落搜索用户帖子列表
  async tribeSearchUserList(params: Api.Tribe.tribeSearchParams) {
    const res = await this.get('/v1/tribe/search/user', params);
    return res;
  }
  // 部落文件列表
  async tribeFileList(params: Api.Tribe.tribeFileListParams) {
    const res = await this.get('/v1/tribe/file/list', params);
    return res;
  }
  // 部落文件删除
  async tribeFileDelete(params: Api.Tribe.tribeFileDeleteParams) {
    return this.post('/v1/tribe/file/del', params);
  }
  // 部落成员列表
  async tribeMemberList(params: Api.Tribe.tribeMemberListParams) {
    const res = await this.get('/v1/tribe/member/list', params);
    return res;
  }
  // 部落帖子置顶
  async tribePostSetTop(params: Api.Tribe.PostSetTopParams) {
    return this.post('/v1/tribe/post/set_top', params);
  }
  // 部落帖子取消置顶
  async tribePostSetNotTop(params: Api.Tribe.PostSetTopParams) {
    return this.post('/v1/tribe/post/set_not_top', params);
  }
  // 部落帖子删除
  async tribePostDelete(params: Api.Tribe.PostSetTopParams) {
    return this.post('/v1/tribe/post/del', params);
  }
  // 部落帖子精选
  async tribePostSetSelected(params: Api.Tribe.PostSetTopParams) {
    return this.post('/v1/tribe/post/set_selected', params);
  }
  // 部落帖子取消精选
  async tribePostSetNotSelected(params: Api.Tribe.PostSetTopParams) {
    return this.post('/v1/tribe/post/set_not_selected', params);
  }
  // 部落帖子禁言
  async tribePostMute(params: Api.Tribe.PostMuteParams) {
    const res = await this.get('/v1/tribe/member/mute', params);
    return res;
  }
  // 部落帖子取消禁言
  async tribePostNotMute(params: Api.Tribe.PostMuteParams) {
    const res = await this.get('/v1/tribe/member/not_mute', params);
    return res;
  }
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

  // 获取成员NFT详情信息
  async tribeMemberNftDetail(params: Api.Tribe.tribeInfoParams) {
    const res = await this.get('/v1/tribe/nft/member', params);
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

  // 部落搜索用户(根据部落id和用户名)
  async tribeUserSearchByName(params: Api.Tribe.TopicSearchUserParams) {
    return this.get('/v1/tribe/user/search_by_name', params);
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
  async getTribeTopicList(
    params: Api.Tribe.TopicParamsForId,
  ): Promise<Api.Response<Api.Tribe.TopicInfo[]>> {
    return this.get('/v1/tribe/topic/list', params);
  }

  // 部落帖子保存草稿
  async tribePostCreateDraft(params: Api.Tribe.PostCreatepParams) {
    return this.post('/v1/tribe/post/create_draft', params);
  }

  async getTribePostDraft(
    params: Api.Tribe.TopicParamsForId,
  ): Promise<Api.Response<Api.Tribe.PostDraftInfo>> {
    return this.post('v1/tribe/post/get_draft', params);
  }

  // 获取文件列表
  async triebFileCreate(params: Api.Tribe.TribeFileCreateParams) {
    return this.post('/v1/tribe/file/create', params, {
      timeout: 2 * 60 * 1000,
    });
  }

  // 获取文件列表
  async getTribeFile(
    params: Api.Tribe.FileListParams,
  ): Promise<Api.Response<Api.Tribe.FileInfo[]>> {
    return this.get('/v1/tribe/file/list', params);
  }
}
